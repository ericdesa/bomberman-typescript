import { Group, Game, Sprite } from 'phaser-ce';

import { Player } from './player';
import { AssetName } from './assets';

export class Level {

  protected platforms: Group;
  protected stars: Group;

  constructor(protected game: Game, protected player: Player, protected pointsHandler: Function) {
    this.setupSky();
    this.setupPlatforms();
    this.setupStars();
    this.player.sprite.bringToTop();
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

  public update() {
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.player.sprite, this.platforms);
    this.game.physics.arcade.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
  }

  protected collectStar(player: Sprite, star: Sprite) {
    star.kill();
    this.pointsHandler(+10);
  }
}
