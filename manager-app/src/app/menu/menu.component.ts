import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../model/game';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.css']
})
export class MenuComponent implements OnInit {

  game: Game;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.game = this.gameService.getGame();
  }

}
