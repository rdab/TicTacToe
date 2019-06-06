import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: Player;
  values: string[][];
  plays: number;
}

class Player {
  private _name: string;
  private _symbol: string;

  constructor(public name:string, public symbol:string) {
    this._name = name;
    this._symbol = symbol;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _player1: Player;
  private _player2: Player;
  private _state$: BehaviorSubject<State>;

  constructor() {
    this._player1 = new Player('Player 1', "X");
    this._player2 = new Player('Player 2', "0");
    let initState = this.clearState(this._player1);
    this._state$ = new BehaviorSubject(initState);
  }
   
  get state$(): BehaviorSubject<State> {
    return this._state$;
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }

  updateValue(row, col){
    if (this.state.values[row][col] === '-'){
      this.state.values[row][col] = this.state.turn.symbol;
      let newTurn = this.state.turn === this._player1 ? this._player2 : this._player1;
      this.state.turn = newTurn;
      this.state.plays++;
      this.state = this.state;
    }
  }

  reset() {
    this.state = this.clearState();
  }

  clearState(startingPlayer?: Player){
    let player = startingPlayer || this._player1;
    return {
      turn: player,
      values: [
        ['-','-','-',],
        ['-','-','-',],
        ['-','-','-',],
      ],
      plays: 0,
    }
  }
}
