import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameService } from '../game.service';
import { Level, LevelStatus } from '../model/level';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['../app.component.css']
})
export class LevelComponent implements OnInit {

  level: Level = null;

  levelStatus = LevelStatus;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.level = this.gameService.setCurrentLevel(Number(params['id']));
      } else {
        this.level = null;
      }
    });
  }

  ngOnInit() {
  }

}
