import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { StateService } from './state.service';
import { PlayCounterComponent } from './play-counter/play-counter.component';
import { FormsModule } from "@angular/forms";
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GameComponent, HeaderComponent, BoardComponent, SquareComponent, PlayCounterComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    GameComponent,
  ],
  providers: [StateService],
})
export class GameModule { }
