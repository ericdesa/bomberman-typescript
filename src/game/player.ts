import { Game, Sprite } from 'phaser-ce';
import { AssetName } from './assets';

export class Player {

  public sprite: Sprite;
  protected idleDirectionFrame = 1;
  protected speed = 120;

  constructor(protected game: Game) {
    this.setupSprite();
    this.setupPhysics();
    this.setupAnimation();
  }

  protected setupSprite() {
    this.sprite = this.game.add.sprite(32, this.game.world.height - 150, AssetName.player);
  }

  protected setupPhysics() {
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  protected setupAnimation() {
    this.sprite.animations.add('down', [0, 1, 2], 5, true);
    this.sprite.animations.add('left', [3, 4, 5], 5, true);
    this.sprite.animations.add('right', [6, 7, 8], 5, true);
    this.sprite.animations.add('up', [9, 10, 11], 5, true);
  }

  public moveLeft() {
    this.stopMovement();
    this.sprite.body.velocity.x = -this.speed;
    this.sprite.animations.play('left');
    this.idleDirectionFrame = 4;
  }

  public moveRight() {
    this.stopMovement();
    this.sprite.body.velocity.x = this.speed;
    this.sprite.animations.play('right');
    this.idleDirectionFrame = 7;
  }

  public moveUp() {
    this.stopMovement();
    this.sprite.body.velocity.y = -this.speed;
    this.sprite.animations.play('up');
    this.idleDirectionFrame = 10;
  }

  public moveDown() {
    this.stopMovement();
    this.sprite.body.velocity.y = this.speed;
    this.sprite.animations.play('down');
    this.idleDirectionFrame = 1;
  }

  public idle() {
    this.stopMovement();
    this.sprite.animations.stop();
    this.sprite.frame = this.idleDirectionFrame;
  }

  protected stopMovement() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }
}
