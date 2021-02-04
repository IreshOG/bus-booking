const dbModel = require("../utilities/connection");
const carBookingDb = {};

// Generate Id
carBookingDb.generateId = async() =>{
    let model = await dbModel.getCarCollection();
    let ids = await model.distinct("bookings.bookingId");
    let bookId = Math.max(...ids);
    return bookId + 1;
}

//Getting all bookings
carBookingDb.getAllBookings = async () =>{
    let model = await dbModel.getBookingCollection();
    let booking = await model.find({}, { _id:0 });
    if(!booking || booking.length == 0) return null;
    else return booking;
}

//Check Customer
carBookingDb.checkCustomer = async (customerId) =>{
    let model = await dbModel.getCustomerCollection();
    let customer = await model.findOne({ customerId: customerId});
    if (customer) { 
        return customer;
    }
    else {
        return null;
    }
}

//Check Availability
carBookingDb.checkAvailability = async (carId) => {
    let model = await dbModel.getCarCollection();
    let carAvailability = await model.findOne({ carId: carId });
    if (carAvailability) {
        return carAvailability;
    }
    else {
        return null;
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
module.exports = carBookingDb