import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service'

@Component({
  selector: 'app-play-counter',
  templateUrl: './play-counter.component.html',
  styleUrls: ['./play-counter.component.scss']
})
export class PlayCounterComponent implements OnInit {

  private _game;

  constructor(stateService: StateService) {
    this._game = stateService.currentGame;
   }

  ngOnInit() {
  }
}
