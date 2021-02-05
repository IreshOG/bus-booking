const dbModel = require("../utilities/connection");
const CarBooking = require("./carbooking");
const carBookingDb = {};

// Generate Id
carBookingDb.generateId = async() =>{
    let model = await dbModel.getBookingCollection();
    let ids = await model.distinct("bookingId");
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
carBookingDb.checkAvailability = async (carId,dateOfBooking) => {
    console.log("Received date "+dateOfBooking)
    let model = await dbModel.getBookingCollection();
    let carAvailability = await model.find({
            carId:carId
    });
    let f=0;
    let y = new Date(dateOfBooking).getFullYear();
    let m = new Date(dateOfBooking).getMonth();
    let d1 = new Date(dateOfBooking).getDate();

    //console.log("Given date : "+typeof(d));
    for(d of carAvailability){
        // console.log(d.dateOfBooking);
        let year = new Date(d.dateOfBooking).getFullYear();
        let month = new Date(d.dateOfBooking).getMonth();
        let date = new Date(d.dateOfBooking).getDate();
        //console.log(" Date : "+d);
        if(y==year && m==month && d1==date){
            console.log("H");
            f=1;
            break;
        }
    }
    console.log("f = "+f );
    if (f==0) {
        return carAvailability;
    }
    else {
        return null;
    }
}

//To book the car
carBookingDb.bookCar = async (carBooking) => {
    let model = await dbModel.getBookingCollection();
    let bookId = await carBookingDb.generateId();
    carBooking.bookingId = bookId;
    let c = model.countDocuments();
    console.log(c);
    // console.log("Called");
    // console.log(bookId);
    // console.log(carBooking)
    // console.log(model)
    // let id = carBooking.carId;
    // console.log(id);
    let data = await model.insertMany({bookingId: carBooking.bookingId, customerId:carBooking.customerId,
    carId:carBooking.carId,dateOfBooking:carBooking.dateOfBooking ,cartype:carBooking.cartype,price:carBooking.price});
    console.log(data);
    if (data){
            return carBooking.bookingId;
        }
    else{
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