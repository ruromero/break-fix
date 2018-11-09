import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { LevelStatus } from '../model/level';

@Component({
  selector: 'app-level-select',
  templateUrl: './level-select.component.html',
  styleUrls: ['../app.component.css','./level-select.component.css']
})
export class LevelSelectComponent {

  levelStatus = LevelStatus;

  constructor(
    public gameService: GameService
  ) { }

}
