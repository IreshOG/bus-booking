import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BookingserviceService} from '../bookingservice.service';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingform:any;
  constructor(private fb:FormBuilder,private bs:BookingserviceService) { }
//bookingform;
data='';  
ngOnInit(): void {
  this.bookingform = this.fb.group({
    uid: ['',Validators.required],
    cid:['',Validators.required],
    dob:['',Validators.required],
    //cartype:['',Validators.required],
    price:['',Validators.required]
  });

}
  submit():void{
   // console.log(this.data);
    this.bookingform.reset();
  }
  bookCar():void{
    this.bs.bookMyCar(this.bookingform.value).subscribe((res)=>{
      console.log(res);
      //this.submit();
    },
    (err)=>console.log(err)
    );
  }
}
