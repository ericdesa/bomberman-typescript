import { ScoreService } from './../services/score.service';
import { Group, Game, Sprite } from 'phaser-ce';

import { Player } from './player';
import { AssetName } from './assets';
import { Bomb } from './bomb';

export class Level {

  protected platforms: Group;
  protected stars: Group;
  protected bombs: Group;
  protected explosions: Group;

  constructor(protected game: Game, public player: Player, protected scoreService: ScoreService) {
    this.setupSky();
    this.setupPlatforms();
    this.setupStars();
    this.setupBombs();
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

  protected setupStars() {
    this.stars = this.game.add.group();
    this.stars.enableBody = true;

    for (let i = 0; i < 12; i++) {
      let star = this.stars.create(i * 70, 0, AssetName.star);
      star.body.gravity.y = 600;
      star.body.bounce.y = 0.1 + Math.random() * 0.2;
    }
  }

  protected setupBombs() {
    this.bombs = this.game.add.group();
    this.bombs.enableBody = true;

    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
  }

  public dropBomb() {
    if (this.player.bombs > 0) {
      this.player.bombs--;
      setTimeout(() => this.player.bombs++, 5000);

      let _ = new Bomb(this.player.sprite.position, this.bombs, this.explosions);
    }
  }

  public update() {
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.player.sprite, this.platforms);
    this.game.physics.arcade.collide(this.player.sprite, this.bombs);
    this.game.physics.arcade.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
    this.game.physics.arcade.overlap(this.player.sprite, this.explosions, this.playerDie, null, this);
    this.player.sprite.bringToTop();
  }

  protected playerDie(player: Sprite, explosion: Sprite) {
    debugger
    this.player.die();
  }
  }

  protected collectStar(player: Sprite, star: Sprite) {
    star.kill();
    this.scoreService.eatStar();
  }
}
