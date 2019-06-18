import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  constructor(private httpClient: HttpClient) { }

  getSavedGame(){
    return this.httpClient.get('https://api.myjson.com/bins/1e2o2p');
  }

  saveGame(game){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.httpClient.post('http://localhost:3000/games', game, httpOptions);
  }
}
