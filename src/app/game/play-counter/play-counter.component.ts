import { Component, OnInit, Input } from '@angular/core';
import { StateService } from './../state.service'
import { TicTacToe } from '../tic-tac-toe';

@Component({
  selector: 'app-play-counter',
  templateUrl: './play-counter.component.html',
  styleUrls: ['./play-counter.component.scss']
})
export class PlayCounterComponent implements OnInit {

  @Input() game: TicTacToe;

  constructor() {}

  ngOnInit() {
  }
}
