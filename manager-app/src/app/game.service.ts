import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './model/game';
import { Level, LevelStatus } from './model/level';

@Injectable()
export class GameService {

  game: Game;
  readonly MAX_SCORE: number = 10 * 60;

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

  solveLevel = (id: number) => {
    const level = this.game.levels[id - 1];
    const seconds = (Date.now() - level.startedAt) / 1000;
    let score = this.MAX_SCORE - Math.floor(seconds);
    if(score < 0) {
      score = 0;
    }
    console.log('Solved level: %d - Score: %d', id, score);
    this.game.levels[id - 1].status = LevelStatus.Fixed;
    this.game.levels[id - 1].score = score;
    this.game.levels[id - 1].startedAt = null;
    if(this.game.levels.length > id) {
      this.game.levels[id].status = LevelStatus.Unlocked;
    }
    this.save();
  }

  validatePassword = (password: string, callbackFn: Function, errorCallbackFn: Function) => {
    this.http.post('/api/validatePassword', {password: password}).subscribe(
      data => {
        this.game.levels[0].status = LevelStatus.Unlocked;
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
    this.game.levels.forEach((level: Level, id: number) => {
      score += level.score;
    });
    return score;
  };

  load = () => {
    if(localStorage.getItem("game") !== null) {
      this.game = JSON.parse(localStorage.getItem("game"));
      console.log("Loaded existing game");
    } else {
      this.initialize();
    }
  };

  initialize = () => {
    console.log("creating new game");
    this.game = new Game();
    delete this.game.currentLevel;
    delete this.game.key;
    this.game.levels = [
      new Level(1, "What are you waiting for? Christmas?", 0, LevelStatus.Locked),
      new Level(2, "For Pete's sake, I'm not going to hurt you!", 0, LevelStatus.Locked),
      new Level(3, "Go and play in the airlock, Wilco.", 0, LevelStatus.Locked),
      new Level(4, "I'd be peeing my pants if I wore any!", 0, LevelStatus.Locked),
      new Level(5, "The cake is a lie", 0, LevelStatus.Locked),
      new Level(6, "I feel like I could, TAKE ON THE WORLD!", 0, LevelStatus.Locked)
    ];
    this.save();
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
