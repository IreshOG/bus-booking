import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import {ReactiveFormsModule} from  '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ViewCarsComponent,
    BookingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
