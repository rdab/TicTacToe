import { Injectable } from '@angular/core';
import { MyhttpService } from '../myhttp.service';
import { TicTacToe, State } from "./tic-tac-toe";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _game: TicTacToe; 
  private _gameList: Array<TicTacToe>;
  private _http: MyhttpService;

  constructor(httpService: MyhttpService) {
    this._game = new TicTacToe();
    this._gameList = new Array();
    this._http = httpService;
  }

  get currentGame(): TicTacToe {
    return this._game;
  }

  newGame(player1='', player2=''){
    this._game = new TicTacToe(player1, player2);
  }

  loadFromJSON(state: State){
    this._game = new TicTacToe(
      state['player1'],
      state['player2'],
      state['values'],
      state['plays'],
      state['turn']
      );
    this._game.uri = state['id'];
  }

  saveGame(){
    this._http.saveGame(this._game).subscribe( result => {
      console.log(result['id']);
      this._game.uri = result['id'];
      this._gameList.push(this._game);
    });
  }
}
