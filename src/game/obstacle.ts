import { Sprite, Group } from 'phaser-ce';
import { AssetName } from './assets';

const GRID_SIZE = 32;

export class Obstacle {

  public sprite: Sprite;

  constructor(protected group: Group, public x?: number, public y?: number) {
    this.setupSprite();
  }

  protected setupSprite() {
    this.x = this.x || Math.round(Math.random() * 800 / GRID_SIZE) * GRID_SIZE - GRID_SIZE;
    this.y = this.y || Math.round(Math.random() * 600 / GRID_SIZE) * GRID_SIZE - GRID_SIZE;

    this.sprite = this.group.create(this.x, this.y, AssetName.obstacle);
    this.sprite.animations.add('loop', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
    this.sprite.animations.play('loop');
    this.sprite.body.immovable = true;
  }

}
