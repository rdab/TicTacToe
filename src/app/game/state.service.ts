import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
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
  private _initialUrl = this._gamesUrl.concat('/', '1asm89');
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

  saveGame(game: TicTacToe){
    this._saveGame(game).subscribe( result => {
      console.log(result);
      game.uri = result['uri'];
      this._gameList.push(game.uri);
      console.log(this._gameList);
    });
  }

  getSavedGame() {
    let len = this._gameList.length;
    let url = this._initialUrl;
    if (len) {
      url = this._gameList[len-1];
    }
    return this.http.get<TicTacToe>(url)
      .pipe(
        map(res => TicTacToe.fromJSON(url, res))
      );
  }

  _saveGame(game: TicTacToe) {
    if (isNull(game.uri)) {
      return this.http.post(this._gamesUrl, game, httpOptions);
    }
    return this.http.put(game.uri, game, httpOptions);
  }
}
