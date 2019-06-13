import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: Player;
  values: string[][];
  plays: number;
  winner: Player;
}

export class TicTacToe {

  private _turn: Player;
  private _values: string[][];
  private _plays: number;
  private _winner: Player;
  private _player1: Player;
  private _player2: Player;
  private _subject$: BehaviorSubject<TicTacToe>;

  constructor(player1='', player2=''){
    this._player1 = new Player(player1, "X");
    this._player2 = new Player(player2, "0");
    this._values = [
      ['-','-','-',],
      ['-','-','-',],
      ['-','-','-',],
    ];
    this._plays = 0;
    this._winner = null;
    this._turn = this._player1; 
    this._subject$ = new BehaviorSubject(this);
  }

  get turn(): Player {
    return this._turn;
  }

  get values(): string[][] {
    return this._values;
  }

  get plays(): number {
    return this._plays;
  }

  get winner(): Player {
    return this._winner;
  }

  get player1(): string {
    return this._player1.name;
  }

  get player2(): string {
    return this._player2.name;
  }

  get onChange$(): BehaviorSubject<TicTacToe>{
    return this._subject$;
  }

  private notify(){
    this._subject$.next(this);
  }
  
  checkWinner(): Player {
    if (this.plays < 5){ return null }
    let v = this.values;
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
    if (this.values[row][col] !== '-'){
      return null;
    }
    this.values[row][col] = this._turn.symbol;
    this._plays++;
    let winner = this.checkWinner();
    if (winner){
      this._winner = winner;
    } else {
      this._turn = this._turn === this._player1 ? this._player2 : this._player1;
    }
    this.notify()
  }
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

  private _game: TicTacToe; 

  constructor() {
    this._game = new TicTacToe();
  }

  get currentGame(): TicTacToe {
    return this._game;
  }

  newGame(player1='', player2=''){
    this._game = new TicTacToe(player1, player2);
  }
}
