import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { TicTacToe } from "./tic-tac-toe";
import { Observable } from 'rxjs';

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

  getGames() {
    return new Observable<TicTacToe[]>();
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

  addGame(game: TicTacToe){
    return this.http.post<TicTacToe>(this._gamesUrl, game, httpOptions)
      .pipe(
        tap(res => {
          game.uri = res['uri'];
          this._gameList.push(game.uri);
        })
      );
  }

  updateGame(game: TicTacToe) {
    return this.http.put<TicTacToe>(game.uri, game, httpOptions);
  }
}
