import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { TicTacToe } from "./tic-tac-toe";

const httpOptions = {
  headers:  new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _gamesUrl = 'https://api.myjson.com/bins';
  private _gameList: Array<TicTacToe>;

  constructor(private http: HttpClient) {
    this._gameList = new Array();
  }

  get latest() {
    let index = this._gameList.length;
    if (index) {
      return this._gameList[index-1].id;
    }
    return null;
  }

  getGames() {
    return this._gameList;
  }

  getSavedGame(id) {
    let url = this._gamesUrl.concat('/', id);
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
          this._gameList.push(game);
        })
      );
  }

  updateGame(game: TicTacToe) {
    return this.http.put<TicTacToe>(game.uri, game, httpOptions)
      .pipe(
        tap(_ => {
          let index = this._gameList.findIndex(item => item.uri==game.uri);
          this._gameList.splice(index, 1);
          this._gameList.push(game)
        })
      );
  }

  deleteGame(game:TicTacToe){
    let index = this._gameList.findIndex(item => item.uri==game.uri);
    this._gameList.splice(index, 1);
  }
}
