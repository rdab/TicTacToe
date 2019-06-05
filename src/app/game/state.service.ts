import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: string;
  values: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _stateSubject: BehaviorSubject<State>;

  constructor() {
    this._stateSubject = new BehaviorSubject({
      turn: 'PLAYER_X',
      values: [
        ['-','-','-',],
        ['-','-','-',],
        ['-','-','-',],
      ],
    });
   }
   
  get stateSubject(): BehaviorSubject<State> {
    return this._stateSubject;
  }

  get state(): State {
    return this._stateSubject.getValue();
  }

  set state(state: State) {
    this._stateSubject.next(state);
  }

  updateValue(row, col){
    if(this.state.values[row][col] === '-'){
      let newValue = this.state.turn === 'PLAYER_X' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYER_X' ? 'PLAYER_0' : 'PLAYER_X';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this.state = this.state;
    }
  }

  reset(){
    this.state = {
      turn: 'PLAYER_X',
      values: [
        ['-','-','-',],
        ['-','-','-',],
        ['-','-','-',],
      ],
    }
  }
}
