import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { TicTacToe } from '../tic-tac-toe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private games: Array<TicTacToe>;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.fetchGames();
  }

  fetchGames(): void {
    this.stateService.getGames()
      .subscribe(games => {
        this.games = games;
      });
  }
}
