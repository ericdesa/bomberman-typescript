import { Group, Game, Sprite, TilemapLayer } from 'phaser-ce';

import { ScoreService } from './../services/score.service';

import { Player } from './player';
import { AssetName } from './assets';
import { Bomb } from './bomb';
import { Obstacle } from './obstacle';

import { environment } from '../environments/environment';
import { SocketService } from '../services/socket.service';

enum TileLevel {
  BORDER_TOP_LEFT_1 = 0,
  BORDER_TOP_LEFT_2,
  BORDER_TOP_EVEN,
  BORDER_TOP_OVEN,
  BORDER_TOP_RIGHT_2,
  BORDER_TOP_RIGHT_1,
  BUILDING,
  BORDER_LEFT_EVEN_1,
  BORDER_LEFT_EVEN_2,
  EMPTY_1,
  EMPTY_2,
  BORDER_RIGHT_EVEN_2,
  BORDER_RIGHT_EVEN_1,
  FLOOR_TOP,
  BORDER_LEFT_OVEN_1,
  BORDER_LEFT_OVEN_2,
  EMPTY_3,
  EMPTY_4,
  BORDER_RIGHT_OVEN_2,
  BORDER_RIGHT_OVEN_1,
  FLOOR_MIDDLE,
  BORDER_BOTTOM_LEFT_1,
  BORDER_BOTTOM_LEFT_2,
  BORDER_BOTTOM_EVEN,
  BORDER_BOTTOM_OVEN,
  BORDER_BOTTOM_RIGHT_1,
  BORDER_BOTTOM_RIGHT_2,
}


export class Level {

  public NB_X_TILES = 25;
  public NB_Y_TILES = 19;
  public TILE_SIZE = 32;

  protected bombs: Group;
  protected obstacles: Group;
  protected explosions: Group;
  protected wallLayer: TilemapLayer;

  constructor(
    public game: Game,
    public player: Player,
    public scoreService: ScoreService,
    public party: any) {

    this.NB_X_TILES = party.size.w;
    this.NB_Y_TILES = party.size.h;

    this.setupSky();
    this.setupWall();
    this.setupBombs();
    this.setupObstacles(party.obstacles);
  }

  protected setupSky() {
    this.game.add.sprite(0, 0, AssetName.sky);
  }

  protected setupWall() {
    let map = this.game.add.tilemap();
    map.addTilesetImage(AssetName.ground);
    let wallLayer = map.create('walls', this.NB_X_TILES, this.NB_Y_TILES, this.TILE_SIZE, this.TILE_SIZE);
    wallLayer.debug = environment.debug;

    // collisions
    map.setCollisionBetween(0, Object.keys(TileLevel).length, true, wallLayer);
    [
      TileLevel.EMPTY_1, TileLevel.EMPTY_2, TileLevel.FLOOR_TOP,
      TileLevel.EMPTY_3, TileLevel.EMPTY_4, TileLevel.FLOOR_MIDDLE
    ].forEach((tile) => {
      map.setCollision(tile, false, wallLayer);
    });

    wallLayer.resizeWorld();
    this.wallLayer = wallLayer;
    this.game.physics.arcade.enable(this.wallLayer);
    this.wallLayer.body.collideWorldBounds = true;

    // fill level
    for (let x = 0; x < this.NB_X_TILES; x++) {
      for (let y = 0; y < this.NB_Y_TILES; y++) {
        let tileNumber = TileLevel.FLOOR_MIDDLE;

        if (y === 0) { // first line
          if (x === 0) tileNumber = TileLevel.BORDER_TOP_LEFT_1;
          else if (x === 1) tileNumber = TileLevel.BORDER_TOP_LEFT_2;
          else if (x === this.NB_X_TILES - 1) tileNumber = TileLevel.BORDER_TOP_RIGHT_1;
          else if (x === this.NB_X_TILES - 2) tileNumber = TileLevel.BORDER_TOP_RIGHT_2;
          else if (x % 2 === 0) tileNumber = TileLevel.BORDER_TOP_EVEN;
          else tileNumber = TileLevel.BORDER_TOP_OVEN;
        }

        else if (y === this.NB_Y_TILES - 1) { // last line
          if (x === 0) tileNumber = TileLevel.BORDER_BOTTOM_LEFT_1;
          else if (x === 1) tileNumber = TileLevel.BORDER_BOTTOM_LEFT_2;
          else if (x === this.NB_X_TILES - 1) tileNumber = TileLevel.BORDER_BOTTOM_RIGHT_2;
          else if (x === this.NB_X_TILES - 2) tileNumber = TileLevel.BORDER_BOTTOM_RIGHT_1;
          else if (x % 2 === 0) tileNumber = TileLevel.BORDER_BOTTOM_EVEN;
          else tileNumber = TileLevel.BORDER_BOTTOM_OVEN;
        }

        else if (x === 0) { // first column
          if (y % 2 === 0) tileNumber = TileLevel.BORDER_LEFT_EVEN_1;
          else tileNumber = TileLevel.BORDER_LEFT_OVEN_1;
        }

        else if (x === 1) { // second column
          if (y % 2 === 0) tileNumber = TileLevel.BORDER_LEFT_EVEN_2;
          else tileNumber = TileLevel.BORDER_LEFT_OVEN_2;
        }


        else if (x === this.NB_X_TILES - 1) { // last column
          if (y % 2 === 0) tileNumber = TileLevel.BORDER_RIGHT_EVEN_1;
          else tileNumber = TileLevel.BORDER_RIGHT_OVEN_1;
        }

        else if (x === this.NB_X_TILES - 2) { // last before column
          if (y % 2 === 0) tileNumber = TileLevel.BORDER_RIGHT_EVEN_2;
          else tileNumber = TileLevel.BORDER_RIGHT_OVEN_2;
        }


        else if (y === 1) { // last before column
          tileNumber = TileLevel.FLOOR_TOP;
        }


        else if (x > 2 && x < this.NB_X_TILES - 2 && x % 2 !== 0 && y % 2 === 0) { // building
          tileNumber = TileLevel.BUILDING;
        }

        map.putTile(tileNumber, x, y, wallLayer);
      }
    }
  }

  protected setupBombs() {
    this.bombs = this.game.add.group();
    this.bombs.enableBody = true;

    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
  }

  protected setupObstacles(obstacles: any) {
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    for (let ob of obstacles) {
      let _ = new Obstacle(this.obstacles, ob.x * this.TILE_SIZE, ob.y * this.TILE_SIZE);
    }

  }

  public dropBomb() {
    if (this.player.bombs > 0) {
      this.player.bombs--;
      setTimeout(() => this.player.bombs++, 5000);

      let _ = new Bomb(this.player.sprite.position, this.bombs, this.explosions);
    }
  }

  public update() {
    this.game.physics.arcade.collide(this.player.sprite, this.obstacles);
    this.game.physics.arcade.collide(this.player.sprite, this.wallLayer, () => {
      let idle = this.player.idleDirectionFrame;
      if ((idle === 4 || idle === 7)) {
        this.player.sprite.y += 2;
      }

      else if ((idle === 10 || idle === 1)) {
        this.player.sprite.x += 2;
      }
    });

    this.game.physics.arcade.collide(this.player.sprite, this.bombs);
    this.game.physics.arcade.overlap(this.player.sprite, this.explosions, this.playerDie, null, this);
    this.game.physics.arcade.overlap(this.explosions, this.bombs, this.explodeBomb, null, this);
    this.game.physics.arcade.overlap(this.explosions, this.obstacles, this.destroyObstacle, null, this);
    this.player.sprite.bringToTop();

    if (environment.debug) {
      this.game.debug.spriteInfo(this.player.sprite, 32, 500);
    }

  }

  protected playerDie(player: Sprite, explosion: Sprite) {
    this.player.die();
  }

  protected explodeBomb(explostion: Sprite, bomb: Sprite) {
    bomb.data.explode();
  }

  protected destroyObstacle(player: Sprite, obstacle: Sprite) {
    obstacle.kill();
  }
}
