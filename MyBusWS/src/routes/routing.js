const express = require("express");
const routing = express.Router();
const busBookingService = require("../services/users");
const busBooking = require("../model/busbooking");

//Showing all details for the booking of bus
routing.get("/getAllBookings", async (req, res, next) => {
    try{
        let bookings= await busBookingService.getAllBookings();
        res.json(bookings);
    }
    catch (error){
        next(error);
    }
})

module.exports = routing;