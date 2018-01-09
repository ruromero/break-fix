import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameService } from '../game.service';
import { LevelService } from '../level.service';
import { Level, LevelStatus } from '../model/level';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['../app.component.css', './level.component.css']
})
export class LevelComponent implements OnInit {

  level: Level = null;
  levelStatus = LevelStatus;
  processing: boolean = false;
  toConfirm: string = '';
  error: string = '';
  password: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private levelService: LevelService,
    private router: Router
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

  setPassword = (password: string) => {
    this.error = '';
    this.gameService.validatePassword(password, () => {
        this.level = this.gameService.setCurrentLevel(1);
        this.router.navigate(['/level', {id: 1}]);
      },
      (error) => {
        this.error = "Unable to validate master password";
        this.password = '';
      });
  }

  break = (confirmed: boolean) => {
    this.toConfirm = '';
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
        this.processing = false;
      });
  };
}
