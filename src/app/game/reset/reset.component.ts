import { Component, OnInit } from '@angular/core';
import { StateService, TicTacToe } from '../state.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
   }

  ngOnInit() {
  }

  reset() {
    this._stateService.newGame();
  }
}
