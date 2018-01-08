import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LevelComponent } from './level/level.component';
import { MenuComponent } from './menu/menu.component';
import { UsernameComponent } from './username/username.component';
import { ScoreComponent } from './score/score.component';
import { LogoComponent } from './logo/logo.component';
import { LevelSelectComponent } from './level-select/level-select.component';

import { GameService } from './game.service';
import { LevelService } from './level.service';
import { MenuBtnComponent } from './menu-btn/menu-btn.component';

const appRoutes: Routes = [
  { path: 'menu',       component: MenuComponent },
  { path: 'level',  component: LevelComponent },
  { path: 'level-select', component: LevelSelectComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    MenuComponent,
    UsernameComponent,
    ScoreComponent,
    LogoComponent,
    ConfirmationComponent,
    LevelSelectComponent,
    MenuBtnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameService,
    LevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
