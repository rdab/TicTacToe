import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { State, StateService} from "./../state.service";
import { MyhttpService } from "../../myhttp.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private _status: string = 'fetching';
  private _player1: string = '';
  private _player2: string = '';
  private _stateService: StateService;

  constructor(route: ActivatedRoute, stateService: StateService, myHttpService: MyhttpService) { 
    this._stateService = stateService;
    if (route.snapshot.data.continue){
      myHttpService.getSavedGame().subscribe((state: State) => {
        console.log(state);
        stateService.loadFromJSON(state);
        this._status = 'success';
      }, error => {
        this._status = error.statusText;
      });
    } else {
      stateService.newGame(this._player1, this._player2);
      this._status = 'success';
    }
  }

  _handleSubmitClick(){
    this._stateService.newGame(this._player1, this._player2);
  }

  ngOnInit() {
  }

}
