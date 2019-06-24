import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { StateService} from "./../state.service";
import { TicTacToe } from "../tic-tac-toe";

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
  private plays: number = 0;
  private showNameInput = false;

  constructor(route: ActivatedRoute, private stateService: StateService) { 
    let id = route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchGame(id)
    }
    else if (route.snapshot.data.continue){
      this.fetchGame(null)
    }
    else {
      this.game = null;
      this._status = 'success';
    }
  }

  _handleSubmitClick(){
    this._player1 = this._player1.trim();
    this._player2 = this._player2.trim();
    this.game = new TicTacToe(this._player1, this._player2);
    this.updatePlays();
  }

  ngOnInit() {
  }

  reset() {
    this.game = null;
  }

  fetchGame(id) {
    this.stateService.getSavedGame(id).subscribe((game: TicTacToe) => {
      this.game = game;
      this._player1 = game.player1;
      this._player2 = game.player2;
      this._status = 'success';
      this.updatePlays();
    }, error => {
      this._status = error.statusText;
    });
  }

  save(name){
    this.game.name = name;
    if (this.game.uri) {
      this.stateService.updateGame(this.game).subscribe();
    } else {
      this.stateService.addGame(this.game).subscribe();
    }
    this.updatePlays();
    this.toggleSaveButton();
  }

  updatePlays() {
    this.plays = this.game.plays;
  }

  toggleSaveButton() {
    this.showNameInput = !this.showNameInput;
  }

  canSave() {
    return this.plays == this.game.plays;
  }


}
