import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private _values: string[][];

  constructor(stateService: StateService) {
    this._values = stateService.currentGame.values;
   }

  ngOnInit() {
  }

}
