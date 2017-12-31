import { Sprite, Game } from 'phaser-ce';

import { Level } from './level';
import { AssetName } from './assets';


enum ExplostionFrameLine {
  upEnd = 0,
  upMiddle = 1,
  center = 2,
  bottomMiddle = 3,
  bottomEnd = 4,
  leftEnd = 5,
  leftMiddle = 6,
  rightMiddle = 7,
  rightEnd = 8,
}

const GRID_SIZE = 32;

export class Bomb {

  protected sprite: Sprite;

  constructor(protected game: Game, protected level: Level, protected radius: number = 1) {
    this.setupSprite();
    this.explodeAfter(3000);
  }

  protected setupSprite() {
    let x = Math.round(this.level.player.sprite.centerX / GRID_SIZE) * GRID_SIZE;
    let y = Math.round(this.level.player.sprite.centerY / GRID_SIZE) * GRID_SIZE;

    this.sprite = this.game.add.sprite(x, y, AssetName.bomb);
    this.sprite.animations.add('timing', [0, 1, 2], 5, true);
    this.sprite.animations.play('timing');
  }

  protected explodeAfter(delay: number) {
    setTimeout(() => {

      // position
      let x = Math.round(this.sprite.position.x / GRID_SIZE) * GRID_SIZE;
      let y = Math.round(this.sprite.position.y / GRID_SIZE) * GRID_SIZE;

      // bomb
      this.sprite.kill();

      // center
      this.addExplositionSprite(x, y, ExplostionFrameLine.center);

      // latitude
      for (let xSprite = -this.radius; xSprite <= this.radius; xSprite++) {
        let frameLine: ExplostionFrameLine;

        if (xSprite === -this.radius) { frameLine = ExplostionFrameLine.leftEnd; }
        else if (xSprite < 0) { frameLine = ExplostionFrameLine.leftMiddle; }
        else if (xSprite === this.radius) { frameLine = ExplostionFrameLine.rightEnd; }
        else if (xSprite > 0) { frameLine = ExplostionFrameLine.rightMiddle; }

        if (frameLine !== undefined) { this.addExplositionSprite(x + xSprite * GRID_SIZE, y, frameLine); }
      }

      // longitude
      for (let ySprite = -this.radius; ySprite <= this.radius; ySprite++) {
        let frameLine: ExplostionFrameLine;

        if (ySprite === -this.radius) { frameLine = ExplostionFrameLine.upEnd; }
        else if (ySprite < 0) { frameLine = ExplostionFrameLine.upMiddle; }
        else if (ySprite === this.radius) { frameLine = ExplostionFrameLine.bottomEnd; }
        else if (ySprite > 0) { frameLine = ExplostionFrameLine.bottomMiddle; }

        if (frameLine !== undefined) { this.addExplositionSprite(x, y + ySprite * GRID_SIZE, frameLine); }
      }
    }, delay);

  }

  protected addExplositionSprite(x: number, y: number, frameLine: ExplostionFrameLine) {
    let explosion = this.game.add.sprite(x, y, AssetName.explosion);

    const NB_STEPS = 5;
    let frames = Array(NB_STEPS)
      .fill(frameLine)
      .map((val, pos) => val * NB_STEPS + pos);

    explosion.animations.add('explosion', frames);
    explosion.animations.play('explosion', 5, false, true);
  }
}
