import { Injectable } from '@angular/core';
import { Game } from './model/game';
import { Level, LevelStatus } from './model/level';

@Injectable()
export class GameService {

  game: Game;

  constructor() {
    this.load();
  }

  getGame = function () {
    return this.game;
  }

  setCurrentLevel = function(level: number) {
    this.game.currentLevel = level;
    this.save();
    return this.game.levels[level - 1];
  }

  setUsername = function(username: string) {
    this.game.username = username;
    this.save();
  }

  calculateScore = function() {
    let score = 0;
    for(let level of this.game.levels) {
      score += level.score;
    }
    return score;
  }

  load = function() {
    if(localStorage.getItem("game") !== null) {
      this.game = JSON.parse(localStorage.getItem("game"));
      console.log("loading existing game");
    } else {
      console.log("creating new game");
      this.game = new Game();
      this.game.levels = [
        new Level(1, 0, LevelStatus.Fixed),
        new Level(2, 0, LevelStatus.Unlocked),
        new Level(3, 0, LevelStatus.Broken),
        new Level(4, 0, LevelStatus.Locked),
        new Level(5, 0, LevelStatus.Locked),
        new Level(6, 0, LevelStatus.Locked),
      ];
      this.save();
    }
  }

  save = function() {
    localStorage.setItem("game", JSON.stringify(this.game));
    console.log("saved game");
  }

}
