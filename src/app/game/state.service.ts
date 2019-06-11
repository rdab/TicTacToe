import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: Player;
  values: string[][];
  plays: number;
  winner: Player;
  playerName: string;
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

  checkWinner(): Player {
    if (this.state.plays < 5){ return null }
    let v = this.state.values;
    let winMatrix = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]],
    ]
    for (let condition of winMatrix) {
      let point1 = condition[0];
      let point2 = condition[1];
      let point3 = condition[2];
      let val1 = v[point1[0]][point1[1]];
      let val2 = v[point2[0]][point2[1]];
      let val3 = v[point3[0]][point3[1]];
      if ((val1===val2) && (val2===val3) && (val1 !== '-')) {
        return val1 === this._player1.symbol ? this._player1 : this._player2;
      }
    }
  }

  updateValue(row, col){
    if (this.state.values[row][col] !== '-'){
      return null;
    }
    this.state.values[row][col] = this.state.turn.symbol;
    this.state.plays++;
    let winner = this.checkWinner();
    if (winner){
      this.state.winner = winner;
    } else {
      this.state.turn = this.state.turn === this._player1 ? this._player2 : this._player1;
    }
    this.state = this.state;
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
      winner: null,
      playerName: '',
    }
  }
}
