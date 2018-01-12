import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { LevelService } from '../level.service';
import { Level, LevelStatus } from '../model/level';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['../app.component.css', './level.component.css']
})
export class LevelComponent implements OnInit {

  level: Level;
  levelStatus = LevelStatus;
  processing: boolean = false;
  toConfirm: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private levelService: LevelService
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

  break = (confirmed: boolean) => {
    this.toConfirm = '';
    this.error = '';
    if(!confirmed) {
      return;
    }
    this.processing = true;
    this.levelService.break(this.level.id, this.gameService.getGame().key,
      () => {
        this.gameService.breakLevel(this.level.id);
        this.processing = false;
      }, (error: string) => {
        console.log("Unable to break level %d. Error: %s", this.level.id, error);
        this.error = 'I have not been able to break it. You can try again but I don\'t promise you anything';
        this.processing = false;
      });
  };

  check = () => {
    this.error = "";
    this.processing = true;
    this.levelService.check(this.level.id,
      (passed, score) => {
        if(passed) {
          this.gameService.solveLevel(this.level.id);
        } else {
          this.error = "The check failed. The route is not yet reachable";
        }
        this.processing = false;
      },
      (error: string) => {
        console.log("Unable to check level %d. Error: %s", this.level.id, error);
        this.error = "Something went terribly wrong";
        this.processing = false;
      });
  };

  giveUp = (confirmed: boolean) => {
    this.toConfirm = '';
    this.error = '';
    if(!confirmed) {
      return;
    }
    this.processing = true;
    this.levelService.giveUp(this.level.id, this.gameService.getGame().key,
      () => {
        this.level.score = 0;
        this.level.status = LevelStatus.Fixed;
        this.gameService.save(this.level);
        this.processing = false;
      }, (error: string) => {
        console.log("Unable to give up for level %d. Error: %s", this.level.id, error);
        this.error = 'I have not been able to fix it. You can try again but I don\'t promise you anything';
        this.processing = false;
      });
  };
}
