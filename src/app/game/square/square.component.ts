import { Component, OnInit, Input } from '@angular/core';
import { StateService, State, TicTacToe } from './../state.service'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() row: number;
  @Input() column: number;

  private _game: TicTacToe;
  private _game$: BehaviorSubject<TicTacToe>

  constructor(stateService: StateService) {
    this._game = stateService.currentGame;
    this._game$ = stateService.state$;
   }

  ngOnInit() {
  }

  _handleSquareClick() {
    console.log('Square click', this.row, this.column)
    this._game.updateValue(this.row, this.column);
  }  
}
