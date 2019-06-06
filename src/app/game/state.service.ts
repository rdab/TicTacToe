import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: string;
  values: string[][];
  plays: number;
}

function cleanState(){
  return {
    turn: 'PLAYER_X',
    values: [
      ['-','-','-',],
      ['-','-','-',],
      ['-','-','-',],
    ],
    plays: 0,
  }
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() {
    this._state$ = new BehaviorSubject(cleanState());
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
    if(this.state.values[row][col] === '-'){
      let newValue = this.state.turn === 'PLAYER_X' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYER_X' ? 'PLAYER_0' : 'PLAYER_X';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this.state.plays++;
      this.state = this.state;
    }
  }

  reset() {
    this.state = cleanState();
  }
}
