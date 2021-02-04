const CarBooking = require("../model/carbooking");
const db = require("../model/users");
const validator = require("../utilities/validator");

let carBookingService = {}

//Getting All Bookings
carBookingService.getAllBookings = async() =>{
    let bookings = await db.getAllBookings();
    if (bookings == null) {
        let error = new Error("No bookings found");
        error.status = 404;
        throw error;
    }
    else {
        return bookings;
    }
}

//Service for car booking
carBookingService.bookCar = async (carBooking) =>{
    validator.validateCarId(carBooking.carId);
    let passenger = await db.checkCustomer(carBooking.customerId);
    if (passenger) {
        let car = await db.checkAvailability( carBooking.carId);
        if (car) {
           promise = await db.bookCar(carBooking);
           let bookingId = await promise;
           return bookingId;
        }
        else {
            let error = new Error("Car not available");
            error.status = 404;
            throw error;
        }
    }
    else {
        let error = new Error("Registration not found. Register to proceed");
        error.status = 404;
        throw error;
    }
}

module.exports = carBookingService;