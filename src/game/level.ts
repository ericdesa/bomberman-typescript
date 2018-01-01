import { ScoreService } from './../services/score.service';
import { Group, Game, Sprite } from 'phaser-ce';

import { Player } from './player';
import { AssetName } from './assets';
import { Bomb } from './bomb';
import { Obstacle } from './obstacle';

export class Level {

  protected platforms: Group;
  protected bombs: Group;
  protected obstacles: Group;
  protected explosions: Group;

  constructor(protected game: Game, public player: Player, protected scoreService: ScoreService) {
    this.setupSky();
    this.setupPlatforms();
    this.setupBombs();
    this.setupObstacles();
  }

  protected setupSky() {
    this.game.add.sprite(0, 0, AssetName.sky);
  }

  protected setupPlatforms() {
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    let ground = this.platforms.create(0, this.game.world.height - 64, AssetName.ground);
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    let ledge1 = this.platforms.create(400, 400, AssetName.ground);
    ledge1.body.immovable = true;

    let ledge2 = this.platforms.create(-150, 250, AssetName.ground);
    ledge2.body.immovable = true;
  }

  protected setupBombs() {
    this.bombs = this.game.add.group();
    this.bombs.enableBody = true;

    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
  }

  protected setupObstacles() {
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    for (let i = 0; i < 12; i++) {
      let _ = new Obstacle(this.obstacles);
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
    this.game.physics.arcade.collide(this.player.sprite, this.platforms);
    this.game.physics.arcade.collide(this.player.sprite, this.bombs);
    this.game.physics.arcade.overlap(this.player.sprite, this.explosions, this.playerDie, null, this);
    this.game.physics.arcade.overlap(this.explosions, this.bombs, this.explodeBomb, null, this);
    this.game.physics.arcade.overlap(this.explosions, this.obstacles, this.destroyObstacle, null, this);
    this.player.sprite.bringToTop();
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
