import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LevelComponent } from './level/level.component';
import { MenuComponent } from './menu/menu.component';
import { UsernameComponent } from './username/username.component';
import { ScoreComponent } from './score/score.component';
import { LogoComponent } from './logo/logo.component';

import { GameService } from './game.service';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'menu',       component: MenuComponent },
  { path: 'level',  component: LevelComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    MenuComponent,
    UsernameComponent,
    ScoreComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
