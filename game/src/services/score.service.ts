import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ScoreService {

  public _score = 0;

  set score(value: number) {
    this._score = value;
    this.scoreChange.emit(value);
  }

  get score(): number {
    return this._score;
  }

  public scoreChange: EventEmitter<number> = new EventEmitter<number>();

  public eatStar() {
    this.score += 10;
  }

}
