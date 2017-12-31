import { Group, CursorKeys, Game, Keyboard, Key } from 'phaser-ce';

import { Player } from './player';
import { Level } from './level';

export class Controls {

  protected cursors: CursorKeys;

  protected pressSpaceEnabled = true;
  protected spaceKey: Key;

  constructor(protected game: Game, protected level: Level) {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  public update() {
    if (this.cursors.left.isDown) this.level.player.moveLeft();
    else if (this.cursors.right.isDown) this.level.player.moveRight();
    else if (this.cursors.up.isDown) this.level.player.moveUp();
    else if (this.cursors.down.isDown) this.level.player.moveDown();
    else this.level.player.idle();

    if (this.pressSpaceEnabled && this.spaceKey.isDown) {
      this.level.dropBomb();
      this.pressSpaceEnabled = false;
    } else if (this.spaceKey.isUp) {
      this.pressSpaceEnabled = true;
    }
  }
}
