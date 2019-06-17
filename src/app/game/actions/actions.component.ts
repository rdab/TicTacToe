import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
   }

  ngOnInit() {
  }

  reset() {
    this._stateService.newGame();
  }

  save(){
    this._stateService.saveGame();
  }
}
