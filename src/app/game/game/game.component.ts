import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { State, StateService, Player} from "./../state.service";
import { MyhttpService } from "../../myhttp.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(route: ActivatedRoute, stateService: StateService, myHttpService: MyhttpService) { 
    if (route.snapshot.data.continue){
      myHttpService.getSavedGame().subscribe((state: State) => {
        stateService.state = state;
      });
    } else {
      stateService.reset();
    }
  }

  ngOnInit() {
  }

}
