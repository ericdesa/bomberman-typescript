import { Component } from '@angular/core';
import { Game, Group, Sprite, CursorKeys, Text } from 'phaser-ce';

import { AssetName } from './../game/assets';
import { Assets } from '../game/assets';
import { Controls } from './../game/controls';
import { Level } from '../game/level';
import { Player } from './../game/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected game: Game;
  protected player: Player;
  protected controls: Controls;
  protected level: Level;


  protected score = 0;
  protected scoreText: Text;

  constructor() {
    this.game = new Game(800, 600, Phaser.AUTO, '', {
      preload: Assets.preload,
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this.game);
    this.controls = new Controls(this.game, this.player);

    this.level = new Level(this.game, this.player, (points: number) => {
      this.score += points;
      this.scoreText.text = `score: ${this.score}`;
    });

    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: 32, fill: '#000' });
  }

  update() {
    this.level.update();
    this.controls.update();
  }
}
