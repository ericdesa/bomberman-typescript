import { Component } from '@angular/core';
import { Game, Group, Sprite, CursorKeys, Text } from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected game: Game;
  protected player: Sprite;
  protected stars: Group;
  protected platforms: Group;
  protected cursors: CursorKeys;

  protected score = 0;
  protected scoreText: Text;

  constructor() {
    this.game = new Game(800, 600, Phaser.AUTO, '', {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  preload() {

    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    let platforms = this.game.add.group();
    this.platforms = platforms;
    platforms.enableBody = true;

    // Here we create the ground.
    let ground = platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge1 = platforms.create(400, 400, 'ground');
    ledge1.body.immovable = true;

    let ledge2 = platforms.create(-150, 250, 'ground');
    ledge2.body.immovable = true;



    // The player and its settings
    let player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    this.player = player;

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    this.cursors = this.game.input.keyboard.createCursorKeys();



    let stars = this.game.add.group();
    this.stars = stars;

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++) {
      //  Create a star inside of the 'stars' group
      let star = stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 600;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.1 + Math.random() * 0.2;
    }

    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: 32, fill: '#000' });
  }

  update() {
    this.game.physics.arcade.collide(this.stars, this.platforms);
    let hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);


    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -250;

      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 250;

      this.player.animations.play('right');
    } else {
      //  Stand still
      this.player.animations.stop();

      this.player.frame = 4;
    }

    //  Allow the this.player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
      this.player.body.velocity.y = -350;

    }
  }

  protected collectStar(player: Sprite, star: Sprite) {
    console.log('coucoc');
    star.kill();
    this.score += 10;
    this.scoreText.text = `score: ${this.score}`;
  }
}
