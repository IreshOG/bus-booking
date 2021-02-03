const dbModel = require("../utilities/connection");
const busBookingDb = {};

// Generate Id
busBookingDb.generateId = async() =>{
    let model = await dbModel.getBusCollection();
    let ids = await model.distinct("bookings.bookingId");
    let bookId = Math.max(...ids);
    return bookId + 1;
}

//Getting all bookings
busBookingDb.getAllBookings = async () =>{
    let model = await dbModel.getPassengerCollection();
    let bookings = await model.find({}, { _id:0, bookings: 1 });
    if(!bookings || bookings.length == 0) return null;
    else return bookings;
}

//Check Passenger
busBookingDb.checkPassenger = async (passengerId) =>{
    let model = await dbModel.getPassengerCollection();
    let passenger = await model.findOne({ passengerId: passengerId});
    if (passenger) { 
        return passenger;
    }
    else {
        return null;
    }
}

//Check Availability
busBookingDb.checkAvailability = async (busId) => {
    let model = await dbModel.getBusCollection();
    let bus = await model.findOne({ "bookings.bookingId": bookingId });
    if (busAvailability) {
        return busAvailability;
    }
    else {
        return null;
    }
}

module.exports = busBookingDb;