import { Injectable } from '@angular/core';

export interface State {
  turn: string;
  values: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
}
