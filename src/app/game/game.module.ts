import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [GameComponent, HeaderComponent, BoardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GameComponent,
  ],
})
export class GameModule { }
