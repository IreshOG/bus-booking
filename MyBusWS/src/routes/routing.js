const express = require("express");
const routing = express.Router();
const carBookingService = require("../services/users");
const CarBooking = require("../model/carbooking");

//showmy car database
routing.get("/show",async(req,res,next)=>{
    try{
        let data = await carBookingService.getAllCar();
        res.json(data);
    }catch{
        next(err);
    }
})

//Showing all details for the booking of car
routing.get("/getAllBookings",async(req,res,next)=>{
    //let bid = parseInt(req.params.bookingId);
    try{
        let bookings= await carBookingService.getAllBookings();
        res.json(bookings);
    }catch(err){
        next(err);
    }
})

// Inserting car booking
routing.post("/bookCar", async (req,res,next)=>{
    console.log(req.body);
    const carBooking = new CarBooking(req.body);
    try{
        let bookingId = await carBookingService.bookCar(carBooking);
        res.json({ "message": "Car booking is successful with booking Id " + bookingId });
    }
    catch (error) {
        next(error);
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