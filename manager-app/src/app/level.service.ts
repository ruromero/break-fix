import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GameService } from './game.service';

@Injectable()
export class LevelService {

  constructor(
    private http: HttpClient,
    private gameService: GameService
  ) { }

  break = (id: number, key: string, callbackFn: Function, errorCallbackFn: Function) => {
    this.http.post('/api/break', {
      level: id,
      key: key
    })
    .subscribe(
      data => {
        this.gameService.breakLevel(id);
        callbackFn();
      },
      errorResp => {
        errorCallbackFn(errorResp.error.error);
      });
  };

  check = (id: number, callbackFn: Function, errorCallbackFn: Function) => {
    console.log('Checking level: ' + id);
    const end = Date.now();
    const params = new HttpParams().set('level', String(id));
    this.http.get('/api/check', {params: params})
    .subscribe(
      data => {
        callbackFn(data['passed']);
      },
      error => {
        console.log(error.error);
        errorCallbackFn(error.error);
      }
    );
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
      errorResp => {
        errorCallbackFn(errorResp.error.error);
      });
  };

}
