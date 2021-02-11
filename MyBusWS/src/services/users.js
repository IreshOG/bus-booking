const CarBooking = require("../model/carbooking");
const db = require("../model/users");
const validator = require("../utilities/validator");

let carBookingService = {}
//getting carDB
carBookingService.getAllCar = async()=>{
    let data = await db.getAllCar();
    if(data){
        return data;
    }else{
        let error = new Error("No Cars found in database");
        error.status = 404;
        throw error;
    }
}

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
        console.log("received date in service"+carBooking.dateOfBooking);
        let car = await db.checkAvailability( carBooking.carId,carBooking.dateOfBooking);
        if (car) {
           promise = await db.bookCar(carBooking);
           //let bookingId = await promise;
           return promise;
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