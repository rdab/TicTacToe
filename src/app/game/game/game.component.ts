import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { State, StateService, Player} from "./../state.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(route: ActivatedRoute, stateService: StateService) { 
    if (route.snapshot.data.continue){
      stateService.state = {
        turn: new Player('test', 'X'),
        values: [
          ['-','-','-',],
          ['X','-','-',],
          ['-','-','-',],
        ],
        plays: 0,
        winner: null,
      };
    } else {
      stateService.reset();
    }
  }

  ngOnInit() {
  }

}
