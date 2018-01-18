import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../model/game';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.css', './menu.component.css']
})
export class MenuComponent implements OnInit {

  game: Game;
  toConfirm: boolean = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.game = this.gameService.getGame();
  }

  reset = (confirmed: boolean) => {
    if(confirmed === undefined) {
      this.toConfirm = true;
    } else {
      this.toConfirm = false;
      if(confirmed) {
        this.gameService.reset();
        this.game = this.gameService.getGame();
      }
    }
  };

  survey = () => {
    window.open('https://es.surveymonkey.com/r/TLHCGMB', '_blank');
  };

}
