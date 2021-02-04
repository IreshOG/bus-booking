const express = require("express");
const routing = express.Router();
const carBookingService = require("../services/users");
const carBooking = require("../model/carbooking");



//Showing all details for the booking of car
routing.get("/booking",async(req,res,next)=>{
    //let bid = parseInt(req.params.bookingId);
    try{
        let bookings= await carBookingService.getAllBookings();
        res.json(bookings);
    }catch(err){
        next(err);
    }
})


//delete booking
routing.put("/deleteBooking/:bookingId",async(req,res,next)=>{
    let bid = parseInt(req.params.bookingId);
    try{
        let d = await carBookingService.deleteById(bid);
        res.json("Your booking is deleted");
    }catch(err){
        next(err);
    }
})

//update route



module.exports = routing;