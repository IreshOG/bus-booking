const dbModel = require("../utilities/connection");
const carBookingDb = {};

// Generate Id
carBookingDb.generateId = async() =>{
    let model = await dbModel.getBusCollection();
    let ids = await model.distinct("bookings.bookingId");
    let bookId = Math.max(...ids);
    return bookId + 1;
}

//Getting all bookings
carBookingDb.getAllBookings = async () =>{
    let model = await dbModel.getPassengerCollection();
    let bookings = await model.find({}, { _id:0, bookings: 1 });
    if(!bookings || bookings.length == 0) return null;
    else return bookings;
}

//Check Passenger
carBookingDb.checkPassenger = async (passengerId) =>{
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
carBookingDb.checkAvailability = async (busId) => {
    let model = await dbModel.getBusCollection();
    let bus = await model.findOne({ "bookings.bookingId": bookingId });
    if (busAvailability) {
        return busAvailability;
    }
    else {
        return null;
    }
}

//To update the customer wallet
carBookingDb.updateWallet = async (customerId, price)=>{
    let model = await dbModel.getCustomerCollection();
    let data = await model.updateOne({ customerId: customerId }, { $inc: { walletBalance: -price }});
    if ( data.nModified) return true;
    else return false;
}

//To book the bus
carBookingDb.bookBus = async (busBooking) => {
    let model = await dbModel.getPassengerCollection();
    let bookId = await busBooking.generateId();
    busBooking.bookingId = bookId;
    let data = await model.updateOne({ busId: busBooking.busId }, { $push: { bookings: busBooking}});
    if (data.nModified){
        let seats = await model.updateOne({ busId: busBooking.busId }, { $inc: { seatsAvailable: -busBooking.numberOfTickets }});
        if (seats.nModified){
            let statusOfBooking = await busBookingDb.updateWallet( busBooking.passengerId, busBooking.bookingCost );
            if (statusOfBooking) {
                return busBooking.bookingId;
            }
            else {
                let error = new Error("Wallet cannot be updated");
                error.status = 400;
                throw error;
            }
        }
        else {
            let error = new Error("Seats cannot be updated");
            error.status = 400;
            throw error;
        }
    }
    else {
        let error = new Error("booking failed");
        error.status = 400;
        throw error;
    }
}

//get booking by id
carBookingDb.getBookingById = async(bookingid)=>{
    let book = await dbModel.getBookingCollection();
    let data = await book.findOne({bookingId:bookingid});
    if(data.length>0){
        return data;
    }else{
        return null;
    }
}

// update booking
// carBookingDb.updateBooking = async(bookingId) =>{
//     let booking = await dbModel.getBookingCollection();

// }

//deleting booking
carBookingDb.deletebooking = async(bookingid)=>{
    let book = await dbModel.getBookingCollection();
    let data = await book.findOne({bookingId:bookingid});
    if(data){
        let del = data.deleteOne({bookingId:bookingid});
        if(del.deletedCount){
            return true;
        }else{
            return false;
        }
    }
    
}



module.exports = carBookingDb;