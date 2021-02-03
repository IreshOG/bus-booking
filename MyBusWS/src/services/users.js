const db = require("../model/users");
const validator = require("../utilities/validator");

let busBookingService = {}

//Getting All Bookings
busBookingService.getAllBookings = async() =>{
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

module.exports = busBookingService;