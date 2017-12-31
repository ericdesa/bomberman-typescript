import { Game } from 'phaser-ce';

export enum AssetName {
  sky = 'sky',
  ground = 'ground',
  star = 'star',
  player = 'player',
}

export class Assets {

  public static preload(game: Game) {
    game.load.image(AssetName.sky, 'assets/sky.png');
    game.load.image(AssetName.ground, 'assets/platform.png');
    game.load.image(AssetName.star, 'assets/star.png');
    game.load.spritesheet(AssetName.player, 'assets/player.png', 34, 56, 20, 0, 2);
  }
}
