import { Component, OnInit, Input } from '@angular/core';
import { StateService } from './../state.service'
import { TicTacToe } from "../tic-tac-toe";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() row: number;
  @Input() column: number;

  private _game: TicTacToe;

  constructor(stateService: StateService) {
    this._game = stateService.currentGame;
   }

  ngOnInit() {
  }

  _handleSquareClick() {
    console.log('Square click', this.row, this.column)
    this._game.updateValue(this.row, this.column);
  }  
}
