import { Game, Text } from 'phaser-ce';

import { ScoreService } from './../services/score.service';

export class GUI {

  protected scoreText: Text;

  constructor(protected game: Game, protected scoreService: ScoreService) {
    this.setupScoreText();
    this.setupScoreListener();
  }

  protected setupScoreText() {
    this.scoreText = this.game.add.text(16, 16, '', { fontSize: 32, fill: '#000' });
    this.updateScore();
  }

  protected setupScoreListener() {
    this.scoreService.scoreChange.subscribe(() => {
      this.updateScore();
    });
  }

  protected updateScore() {
    this.scoreText.text = `score: ${this.scoreService.score}`;
  }
}
