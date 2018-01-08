import { Injectable } from '@angular/core';

@Injectable()
export class LevelService {

  constructor() { }

  // Mock scores
  readonly EXPECTED_KEY: string = "mutante";
  readonly GIVEUP_KEY: string = "planetas";
  readonly MAX_SCORE: number = 10 * 60;

  levelTracker: Map<number, Date> = new Map();

  break = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    if(key === this.EXPECTED_KEY) {
      console.log('Breaking level: ' + id);
      setTimeout(() => {
        this.levelTracker[id] = Date.now();
        callbackFn();
      }, 1000);
    } else {
      errorCallbackFn("Wrong key");
    }
  };

  check = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    if(key === this.EXPECTED_KEY) {
      console.log('Checking level: ' + id);
      const end = Date.now();
      setTimeout(() => {
        const seconds = end - this.levelTracker[id];
        let score = this.MAX_SCORE - Math.round(seconds / 60);
        if(score < 0) {
          score = 0;
        }
        console.log('Solved level: %d - Score: %d', id, score);
        callbackFn(score);
      }, 1000);
    } else {
      errorCallbackFn("Wrong key");
    }
  };

  giveUp = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    if(key === this.GIVEUP_KEY) {
      console.log('Giving up for level: ' + id);
      setTimeout(() => {
        console.log('Gave up for level: %d - Score: 0', id);
        callbackFn(0);
      }, 1000);
    } else {
      errorCallbackFn("Wrong key");
    }
  };
}
