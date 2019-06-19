import { Component, OnInit, Input } from '@angular/core';
import { TicTacToe } from '../tic-tac-toe';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() game: TicTacToe;

  constructor() {}

  ngOnInit() {
  }

}
