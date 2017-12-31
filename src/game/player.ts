import { Game, Sprite } from 'phaser-ce';

export class Player {

  public sprite: Sprite;

  constructor(protected game: Game) {
    this.setupSprite();
    this.setupPhysics();
    this.setupAnimation();
  }

  protected setupSprite() {
    this.sprite = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
  }

  protected setupPhysics() {
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 1000;
    this.sprite.body.collideWorldBounds = true;
  }

  protected setupAnimation() {
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  public moveLeft() {
    this.sprite.body.velocity.x = -250;
    this.sprite.animations.play('left');
  }

  public moveRight() {
    this.sprite.body.velocity.x = 250;
    this.sprite.animations.play('right');
  }

  public jump() {
    this.sprite.body.velocity.y = -350;
  }

  public idle() {
    this.sprite.body.velocity.x = 0;
    this.sprite.animations.stop();
    this.sprite.frame = 4;
  }
}
