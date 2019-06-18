import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TicTacToe } from "./game/state.service";
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  constructor(private httpClient: HttpClient) { }

  getSavedGame() {
    return this.httpClient.get('http://localhost:3000/games/1');
  }

  saveGame(game: TicTacToe) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (isNull(game.uri)) {
      return this.httpClient.post('http://localhost:3000/games', game, httpOptions);
    }
    return this.httpClient.put('http://localhost:3000/games'.concat('/', game.uri), game, httpOptions);
  }
}
