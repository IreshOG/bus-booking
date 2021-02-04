const BusBooking = require("../model/busbooking");
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

//Service for bus booking
carBookingService.bookBus = async (busBooking) =>{
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


carBookingService.getById = async(bookingId)=>{
    let data = db.getBookingById(bookingId);
    if(data){
        return data;
    }else{
        let e = new Error("No bookings by Id:"+bookingId+"found");
        e.status=404;
        throw e;
    }
}

carBookingService.deleteById = async(bookingId)=>{
    let data = db.deletebooking(bookingId);
    if(data){
        return data;
    }else{
        let err = new Error("No booking found");
        err.status = 500;
        throw err;
    }
}









module.exports = carBookingService;