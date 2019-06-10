import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/game/game.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'new',
    component: GameComponent
  },
  {
    path: 'continue',
    component: GameComponent,
    data: { continue: true }
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
