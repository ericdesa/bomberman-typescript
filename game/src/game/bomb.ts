import { Sprite, Game, Point, Group } from 'phaser-ce';

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

  public sprite: Sprite;
  public x: number;
  public y: number;

  protected timeoutId: any;

  constructor(position: Point, protected bombGroup: Group, protected explostionGroup: Group, protected radius: number = 1) {
    this.x = Math.round(position.x / GRID_SIZE) * GRID_SIZE;
    this.y = (Math.round(position.y / GRID_SIZE) * GRID_SIZE) + 25;

    this.setupSprite();
    this.explode(3000);
  }

  protected setupSprite() {
    this.sprite = this.bombGroup.create(this.x, this.y, AssetName.bomb);
    this.sprite.animations.add('timing', [0, 1, 2], 5, true);
    this.sprite.animations.play('timing');
    this.sprite.body.immovable = true;
    this.sprite.data = this;
  }

  protected explode(delay: number = 0) {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {

      // bomb
      this.sprite.kill();

      // center
      this.addExplositionSprite(this.x, this.y, ExplostionFrameLine.center);

      // latitude
      for (let dx = -this.radius; dx <= this.radius; dx++) {
        let frameLine: ExplostionFrameLine;

        if (dx === -this.radius) { frameLine = ExplostionFrameLine.leftEnd; }
        else if (dx < 0) { frameLine = ExplostionFrameLine.leftMiddle; }
        else if (dx === this.radius) { frameLine = ExplostionFrameLine.rightEnd; }
        else if (dx > 0) { frameLine = ExplostionFrameLine.rightMiddle; }

        if (frameLine !== undefined) { this.addExplositionSprite(this.x + dx * GRID_SIZE, this.y, frameLine); }
      }

      // longitude
      for (let dy = -this.radius; dy <= this.radius; dy++) {
        let frameLine: ExplostionFrameLine;

        if (dy === -this.radius) { frameLine = ExplostionFrameLine.upEnd; }
        else if (dy < 0) { frameLine = ExplostionFrameLine.upMiddle; }
        else if (dy === this.radius) { frameLine = ExplostionFrameLine.bottomEnd; }
        else if (dy > 0) { frameLine = ExplostionFrameLine.bottomMiddle; }

        if (frameLine !== undefined) { this.addExplositionSprite(this.x, this.y + dy * GRID_SIZE, frameLine); }
      }
    }, delay);

  }

  protected addExplositionSprite(x: number, y: number, frameLine: ExplostionFrameLine) {
    let explosion: Sprite = this.explostionGroup.create(x, y, AssetName.explosion);

    const NB_STEPS = 5;
    let frames = Array(NB_STEPS)
      .fill(frameLine)
      .map((val, pos) => val * NB_STEPS + pos);

    explosion.animations.add('explosion', frames);
    explosion.animations.play('explosion', 5, false, true);
  }
}
