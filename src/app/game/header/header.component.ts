import { Component, OnInit } from '@angular/core';
import { StateService, TicTacToe } from './../state.service'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _game$: BehaviorSubject<TicTacToe>;

  constructor(stateService: StateService) {
    this._game$ = stateService.state$;
   }

  ngOnInit() {
  }
}
