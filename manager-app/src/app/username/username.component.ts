import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css', '../app.component.css']
})
export class UsernameComponent implements OnInit {

  waitForUser: boolean = true;

  constructor(
    private gameService: GameService
  ) {
    document.addEventListener('keypress', () => {
      this.waitForUser = false;
    }, Object({once: true}));
  }

  ngOnInit() {
  }

  saveUsername(username: string): void {
    this.gameService.setUsername(username);
  }

}
