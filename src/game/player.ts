import { Game, Sprite } from 'phaser-ce';

import { AssetName } from './assets';
import { Bomb } from './bomb';
import { Level } from './level';

export class Player {

  public isAlive = true;
  public sprite: Sprite;
  public idleDirectionFrame = 1;
  protected speed = 120;

  public bombs = 5;

  constructor(protected game: Game) {
    this.setupSprite();
    this.setupPhysics();
    this.setupAnimation();
  }

  protected setupSprite() {
    this.sprite = this.game.add.sprite(32 * 2, 0, AssetName.player);
  }

  protected setupPhysics() {
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(20, 25, 6, 25);
  }

  protected setupAnimation() {
    this.sprite.animations.add('down', [0, 1, 2], 5, true);
    this.sprite.animations.add('left', [3, 4, 5], 5, true);
    this.sprite.animations.add('right', [6, 7, 8], 5, true);
    this.sprite.animations.add('up', [9, 10, 11], 5, true);
    this.sprite.animations.add('die', [16, 17, 19], 5, false);
  }

  public moveLeft() {
    if (!this.isAlive) return;
    this.stopMovement();
    this.sprite.body.velocity.x = -this.speed;
    this.sprite.animations.play('left');
    this.idleDirectionFrame = 4;
  }

  public moveRight() {
    if (!this.isAlive) return;
    this.stopMovement();
    this.sprite.body.velocity.x = this.speed;
    this.sprite.animations.play('right');
    this.idleDirectionFrame = 7;
  }

  public moveUp() {
    if (!this.isAlive) return;
    this.stopMovement();
    this.sprite.body.velocity.y = -this.speed;
    this.sprite.animations.play('up');
    this.idleDirectionFrame = 10;
  }

  public moveDown() {
    if (!this.isAlive) return;
    this.stopMovement();
    this.sprite.body.velocity.y = this.speed;
    this.sprite.animations.play('down');
    this.idleDirectionFrame = 1;
  }

  public idle() {
    if (!this.isAlive) return;
    this.stopMovement();
    this.sprite.animations.stop();
    this.sprite.frame = this.idleDirectionFrame;
  }

  public die() {
    if (!this.isAlive) return;
    this.isAlive = false;
    this.stopMovement();
    this.sprite.animations.play('die');
  }

  protected stopMovement() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }
}
