import { Group, CursorKeys, Game } from 'phaser-ce';
import { Player } from './player';

export class Controls {

  protected cursors: CursorKeys;

  constructor(protected game: Game, protected player: Player) {
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.idle();
    }

    if (this.cursors.up.isDown && this.playerCanJump()) {
      this.player.jump();
    }
  }

  protected playerCanJump() {
    let isTouchingDown = this.player.sprite.body.touching.down;
    return isTouchingDown;
  }
}
