import { Component, OnInit, Input } from '@angular/core';
import { StateService } from './../state.service'
import { TicTacToe } from "../tic-tac-toe";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() game: TicTacToe;

  constructor() {}

  ngOnInit() {
  }
}
