import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TicTacToe, State } from "./tic-tac-toe";
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _game: TicTacToe; 
  private _gameList: Array<TicTacToe>;

  constructor(private http: HttpClient) {
    this._game = new TicTacToe();
    this._gameList = new Array();
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
    this._saveGame(this._game).subscribe( result => {
      console.log(result['id']);
      this._game.uri = result['id'];
      this._gameList.push(this._game);
    });
  }

  getSavedGame() {
    return this.http.get('http://localhost:3000/games/1');
  }

  _saveGame(game: TicTacToe) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (isNull(game.uri)) {
      return this.http.post('http://localhost:3000/games', game, httpOptions);
    }
    return this.http.put('http://localhost:3000/games'.concat('/', game.uri), game, httpOptions);
  }
}
