import { Component } from '@angular/core';
import { Game, Group, Sprite, CursorKeys, Text } from 'phaser-ce';

import { AssetName } from './../game/assets';
import { Assets } from '../game/assets';
import { Controls } from './../game/controls';
import { GUI } from '../game/gui';
import { Level } from '../game/level';
import { Player } from './../game/player';

import { ScoreService } from '../services/score.service';

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
  protected gui: GUI;

  constructor(protected scoreService: ScoreService) {
    this.game = new Game(800, 600, Phaser.AUTO, '', {
      preload: Assets.preload,
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  protected create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this.game);
    this.level = new Level(this.game, this.player, this.scoreService);
    this.controls = new Controls(this.game, this.level);
    this.gui = new GUI(this.game, this.scoreService);
  }

  protected update() {
    this.level.update();
    this.controls.update();
  }
}
