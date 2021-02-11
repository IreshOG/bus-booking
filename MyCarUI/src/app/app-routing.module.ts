import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCarsComponent } from './view-cars/view-cars.component';

const routes: Routes = [
  {path:'', component: ViewCarsComponent},
  {path:'view', component: ViewCarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
