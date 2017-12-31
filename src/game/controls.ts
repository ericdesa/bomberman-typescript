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
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else {
      this.player.idle();
    }
  }
}
