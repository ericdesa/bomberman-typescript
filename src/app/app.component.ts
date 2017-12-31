import { Controls } from './../game/controls';
import { Component } from '@angular/core';

import { Game, Group, Sprite, CursorKeys, Text } from 'phaser-ce';
import { AssetName } from './../game/assets';
import { Player } from './../game/player';
import { Assets } from '../game/assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected game: Game;
  protected player: Player;
  protected controls: Controls;

  protected stars: Group;
  protected platforms: Group;

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
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.game.add.sprite(0, 0, AssetName.sky);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    let platforms = this.game.add.group();
    this.platforms = platforms;
    platforms.enableBody = true;

    // Here we create the ground.
    let ground = platforms.create(0, this.game.world.height - 64, AssetName.ground);
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge1 = platforms.create(400, 400, AssetName.ground);
    ledge1.body.immovable = true;

    let ledge2 = platforms.create(-150, 250, AssetName.ground);
    ledge2.body.immovable = true;

    this.player = new Player(this.game);
    this.controls = new Controls(this.game, this.player);

    let stars = this.game.add.group();
    this.stars = stars;

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++) {
      //  Create a star inside of the 'stars' group
      let star = stars.create(i * 70, 0, AssetName.star);

      //  Let gravity do its thing
      star.body.gravity.y = 600;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.1 + Math.random() * 0.2;
    }

    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: 32, fill: '#000' });
  }

  update() {
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.player.sprite, this.platforms);
    this.game.physics.arcade.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
    this.controls.update();
  }

  protected collectStar(player: Sprite, star: Sprite) {
    star.kill();
    this.score += 10;
    this.scoreText.text = `score: ${this.score}`;
  }
}
