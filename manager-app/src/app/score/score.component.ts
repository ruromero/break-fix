import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  constructor(
    public gameService: GameService
  ) { }

  onNextLevel() {
    this.gameService.calculateScore();
  }

}
