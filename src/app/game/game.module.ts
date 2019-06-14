import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { StateService } from './state.service';
import { PlayCounterComponent } from './play-counter/play-counter.component';
import { ActionsComponent } from './actions/actions.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [GameComponent, HeaderComponent, BoardComponent, SquareComponent, PlayCounterComponent, ActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    GameComponent,
  ],
  providers: [StateService],
})
export class GameModule { }
