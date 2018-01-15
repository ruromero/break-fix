import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './model/game';
import { Level, LevelStatus } from './model/level';

@Injectable()
export class GameService {

  game: Game = new Game();

  constructor(
    private http: HttpClient
  ) {
    this.load();
  }

  getGame =  () => {
    return this.game;
  };

  setCurrentLevel = (level: number) => {
    this.game.currentLevel = level;
    this.save();
    return this.game.levels[level - 1];
  };

  setUsername = (username: string) => {
    this.game.username = username;
    this.save();
  };

  breakLevel = (level: number) => {
    this.game.levels[level - 1].status = LevelStatus.Broken;
    this.game.levels[level - 1].startedAt = Date.now();
    this.save();
  };

  getCurrentScore = (level: Level) => {
    const seconds = (Date.now() - level.startedAt) / 1000;
    let maxScore = this.game.maxScore;
    if(level.maxScore !== undefined) {
      maxScore = level.maxScore;
    }
    let score = maxScore - Math.floor(seconds);
    if(score < 0) {
      score = 0;
    }
    return score;
  };

  submitScore = () => {
    this.http.post('/api/score', {
      gameId: this.game.id,
      score: {
        player: this.game.username,
        points: this.calculateScore()
      }
    }).subscribe( data => {
      console.log(`Submitted score for: ${this.game.username}`);
    }, error => {
      console.log(`Unable to submit score for: ${this.game.username}`);
      console.log(error.error);
    });
  };

  solveLevel = (id: number) => {
    const level = this.game.levels[id - 1];
    const score = this.getCurrentScore(level);
    console.log('Solved level: %d - Score: %d', id, score);
    level.status = LevelStatus.Fixed;
    level.score = score;
    level.startedAt = null;
    this.submitScore();
    if(this.game.levels.length > id) {
      this.game.levels[id].status = LevelStatus.Unlocked;
    }
    this.save();
  };

  validatePassword = (password: string, callbackFn: Function, errorCallbackFn: Function) => {
    this.http.post('/api/validatePassword', {password: password}).subscribe(
      data => {
        for(let level of this.game.levels) {
          if(level.id == 1 || level.bonus) {
            level.status = LevelStatus.Unlocked;
          } else {
            level.status = LevelStatus.Locked;
          }
        }
        this.game.key = password;
        this.save();
        callbackFn();
      },
      error => {
        errorCallbackFn(error);
      }
    );
  };

  calculateScore = () => {
    let score = 0;
    if(this.game.levels === undefined) {
      return score;
    }
    this.game.levels.forEach((level: Level, id: number) => {
      if(level.score !== undefined) {
        score += level.score;
      }
    });
    return score;
  };

  load = () => {
    if(localStorage.getItem("game") !== null) {
      this.game = JSON.parse(localStorage.getItem("game"));
      console.log("Loaded existing game");
      //TODO: DELETE
      this.submitScore();
    } else {
      this.initialize();
    }
  };

  generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  initialize = () => {
    console.log("creating new game");
    this.http.get('/api/game').subscribe(
      data => {
        this.game.id = this.generateId();
        this.game.levels = data['levels'];
        this.game.maxScore = data['maxScore'];
        delete this.game.currentLevel;
        delete this.game.key;
        delete this.game.username;
        this.save();
      },
      error => {
        console.log(error.error);
        console.log(error.message);
      }
    );
  }

  reset = () => {
    localStorage.clear();
    this.initialize();
  }

  save = (level?: Level) => {
    if(level !== undefined) {
      this.game.levels[level.id - 1] = level;
      if(level.status === LevelStatus.Fixed && level.id < this.game.levels.length) {
        this.game.levels[level.id].status = LevelStatus.Unlocked;
      }
    }
    localStorage.setItem("game", JSON.stringify(this.game));
    console.log("saved game");
  };

}
