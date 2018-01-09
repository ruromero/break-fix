import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LevelService {

  constructor(
    private http: HttpClient
  ) { }

  readonly MAX_SCORE: number = 10 * 60;

  levelTracker: Map<number, Date> = new Map();

  break = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    this.http.post('/api/break', {
      level: id,
      key: key})
    .subscribe(
      data => {
        this.levelTracker[id] = Date.now();
        callbackFn();
      },
      error => {
        errorCallbackFn(error.error);
      });
  };

  check = (id: number, callbackFn: Function, errorCallbackFn: Function) => {
    console.log('Checking level: ' + id);
    const end = Date.now();
    this.http.get('/api/check').subscribe(
      data => {
        if(data === "PASSED") {
          const seconds = end - this.levelTracker[id];
          let score = this.MAX_SCORE - Math.round(seconds / 60);
          if(score < 0) {
            score = 0;
          }
          console.log('Solved level: %d - Score: %d', id, score);
          callbackFn(true, score);
        } else {
          callbackFn(false);
        }
      },
      error => {
        errorCallbackFn(error);
      }
    );

    setTimeout(() => {

    }, 1000);

  };

  giveUp = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    this.http.post('/api/fix', {
      level: id,
      key: key})
    .subscribe(
      data => {
        console.log('Gave up for level: %d - Score: 0', id);
        callbackFn(0);
      },
      error => {
        errorCallbackFn(error.error);
      });
  };
}
