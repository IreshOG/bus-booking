const BusBooking = require("../model/busbooking");
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

//Service for bus booking
busBookingService.bookBus = async (busBooking) =>{
    validator.validateBusId( busBooking.busId);
    let passenger = await db.checkPassenger(busBooking.passengerId);
    if (passenger) {
        let bus = await db.checkAvailability( busBooking.busId);
        if (bus) {
            if(bus.status == "Cancelled") {
                let error = new Error("Bus with Id " + bus.busId + " is cancelled.");
                error.status=404;
                throw error;
            }
            else if (bus.seatsAvailable == 0){
                let error = new Error("Bus with Id " + bus.busId + " is full");
                error.status = 404;
                throw error;
            }
            else if (bus.seatsAvailable < busBooking.numberOfTickets ){
                let error = new Error("Bus with Id" + bus.busId + " is almost full. Only " + bus.seatsAvailable + " seats are left.");
                error.status = 404;
                throw error;
            }
        }
        else {
            let error = new Error("Bus not available");
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

module.exports = busBookingService;