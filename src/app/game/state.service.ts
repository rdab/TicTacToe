import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TicTacToe, State } from "./tic-tac-toe";
import { isNull } from 'util';

const httpOptions = {
  headers:  new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _gamesUrl = 'https://api.myjson.com/bins';
  private _game: TicTacToe; 
  private _gameList: Array<string>;

  constructor(private http: HttpClient) {
    this._game = new TicTacToe();
    this._gameList = new Array();
  }

  get currentGame(): TicTacToe {
    return this._game;
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
    return this._game;
  }

  saveGame(){
    this._saveGame(this._game).subscribe( result => {
      console.log(result['id']);
      this._game.uri = result['id'];
      this._gameList.push(this._game.uri);
    });
  }

  getSavedGame() {
    let len = this._gameList.length;
    let id = '1asm89';
    if (len) {
      id = this._gameList[len-1];
    }
    return this.http.get(`${ this._gamesUrl }/${ id }`);
  }

  _saveGame(game: TicTacToe) {
    if (isNull(game.uri)) {
      return this.http.post(this._gamesUrl, game, httpOptions);
    }
    return this.http.put(game.uri, game, httpOptions);
  }
}
