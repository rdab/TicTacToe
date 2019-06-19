import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { StateService} from "./../state.service";
import { State, TicTacToe } from "../tic-tac-toe";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private _status: string = 'fetching';
  private _player1: string = '';
  private _player2: string = '';
  private game: TicTacToe;

  constructor(route: ActivatedRoute, private stateService: StateService) { 

    if (route.snapshot.data.continue){
      stateService.getSavedGame().subscribe((state: State) => {
        console.log(state);
        this.game = stateService.loadFromJSON(state);
        this._status = 'success';
      }, error => {
        this._status = error.statusText;
      });
    } else {
      this._status = 'success';
    }
  }

  _handleSubmitClick(){
    this.game = new TicTacToe(this._player1, this._player2);
  }

  ngOnInit() {
  }

  reset() {
    this.game = null;
  }

  save(){
    this.stateService.saveGame();
  }
}
