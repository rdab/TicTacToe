import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service'
import { TicTacToe } from "../tic-tac-toe";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _game: TicTacToe;

  constructor(stateService: StateService) {
    this._game = stateService.currentGame;
   }

  ngOnInit() {
  }
}
