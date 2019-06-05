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
   
}
