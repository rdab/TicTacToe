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
  private _playerName: string = '';
  private _stateService: StateService;

  constructor(route: ActivatedRoute, stateService: StateService, myHttpService: MyhttpService) { 
    this._stateService = stateService;
    if (route.snapshot.data.continue){
      myHttpService.getSavedGame().subscribe((state: State) => {
        stateService.state = state;
        this._status = 'success';
      }, error => {
        this._status = error.statusText;
      });
    } else {
      stateService.reset();
      this._status = 'success';
    }
  }

  _handleSubmitClick(){
    this._stateService.state.playerName = this._playerName
  }
  ngOnInit() {
  }

}
