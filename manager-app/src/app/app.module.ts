import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LevelsComponent } from './levels/levels.component';
import { UsernameComponent } from './username/username.component';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    LevelsComponent,
    UsernameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
