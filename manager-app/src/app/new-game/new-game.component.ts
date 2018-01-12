import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['../app.component.css','./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private router: Router
  ){
  }

  ngOnInit() {
  }

  error: string = '';
  password: string = '';

  setPassword = (password: string) => {
    this.error = '';
    this.gameService.validatePassword(password, () => {
        this.gameService.setCurrentLevel(1);
        this.router.navigate(['/level', {id: 1}]);
      },
      (error) => {
        this.error = "Unable to validate master password";
        this.password = '';
      });
  }
}
