import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  row: number;
  column: number;

  constructor() { }

  ngOnInit() {
  }

  _handleSquareClick() {
    console.log('Square click')
  }  
}
