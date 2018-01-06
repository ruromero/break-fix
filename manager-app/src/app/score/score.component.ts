import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../model/game';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit() {
  }

  onNextLevel() {
    this.calculateScore();
  }

  calculateScore() {
    let score = 0;
    for(let level of this.game.levels) {
      score += level.score;
    }
    return score;
  }

}
