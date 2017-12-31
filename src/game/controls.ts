import { Group, CursorKeys, Game, Keyboard, Key } from 'phaser-ce';
import { Player } from './player';

export class Controls {

  protected cursors: CursorKeys;

  protected pressSpaceEnabled = true;
  protected spaceKey: Key;

  constructor(protected game: Game, protected player: Player) {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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

    if (this.pressSpaceEnabled && this.spaceKey.isDown) {
      this.player.dropBomb();
      this.pressSpaceEnabled = false;
    } else if (this.spaceKey.isUp) {
      this.pressSpaceEnabled = true;
    }
  }
}
