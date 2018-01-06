import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../model/game';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css', '../app.component.css']
})
export class UsernameComponent implements OnInit {

  @Input() game: Game;

  username: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(username: string): void {
    this.game.username = username;
  }

}
