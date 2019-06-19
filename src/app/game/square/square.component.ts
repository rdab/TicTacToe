import { Component, OnInit, Input } from '@angular/core';
import { TicTacToe } from "../tic-tac-toe";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() row: number;
  @Input() column: number;
  @Input() game: TicTacToe;

  constructor() {}

  ngOnInit() {
  }

  _handleSquareClick() {
    console.log('Square click', this.row, this.column)
    this.game.updateValue(this.row, this.column);
  }  
}
