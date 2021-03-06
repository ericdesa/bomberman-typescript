import { Game } from 'phaser-ce';

export enum AssetName {
  sky = 'sky',
  ground = 'ground',
  star = 'star',
  player = 'player',
  bomb = 'bomb',
  explosion = 'explosion',
  obstacle = 'obstacle',
}

export class Assets {

  public static preload(game: Game) {
    game.load.image(AssetName.sky, 'assets/sky.png');
    game.load.image(AssetName.ground, 'assets/ground.png');
    game.load.image(AssetName.star, 'assets/star.png');
    game.load.spritesheet(AssetName.player, 'assets/player.png', 35, 56);
    game.load.spritesheet(AssetName.bomb, 'assets/bomb.png', 34, 34);
    game.load.spritesheet(AssetName.explosion, 'assets/explosion.png', 34, 32);
    game.load.spritesheet(AssetName.obstacle, 'assets/obstacle.png', 32, 32);
  }

}
