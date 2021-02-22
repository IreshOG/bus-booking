import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import {BookingFormComponent} from './booking-form/booking-form.component';

const routes: Routes = [
  {path:'', component: ViewCarsComponent},
  {path:'view', component: ViewCarsComponent},
  {path:'bookcar',component:BookingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
