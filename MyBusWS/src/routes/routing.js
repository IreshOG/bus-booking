const express = require("express");
const routing = express.Router();
const carBookingService = require("../services/users");
const carBooking = require("../model/carbooking");

//Showing all details for the booking of bus
routing.get("/getAllBookings", async (req, res, next) => {
    try{
        let bookings= await carBookingService.getAllBookings();
        res.json(bookings);
    }
    catch (error){
        next(error);
    }
})

module.exports = routing;