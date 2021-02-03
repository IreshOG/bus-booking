const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex',true);
const url = "mongodb://localhost:27017/BusBooking_DB";

//Schema for passenger
const passengerSchema = Schema({
    passengerId: Number,
    passengerName: String,
    walletBalance: Number
},{ collection: "Passenger" });

//Schema for Bus booking
const busBookingSchema = Schema ({
    passengerId: { type: Number, required: true },
    passengerName: { type: String, required: true },
    bookingId: { type: Number, unique: true },
    numberOfTickets: { type: Number, min: [1, "Minimum number of Tickets should be 1"], max: [5, "Maximum number of tickets booked should be 5"] },
    bookingDate: { type: Date, default: new Date() },
    bookingCost: { type: Number, min: [0, "Booking cost should not be negative"] }
});

//schema for bus
const BusSchema = Schema({
    busId:Number,
    busName:String,
    price:Number,
    seatsAvailable:Number,
    status:{type:String,enum:['Running', 'Cancelled']},
    bookings:{
        type:[busBookingSchema],default:[]
    }
},{collection:'Bus'})


let collection = {};


collection.getBusCollection = async()=>{
    try{
        let dbConnection = await mongoose.connect(url,{useNewUrlParser:true});
        let model = await dbConnection.model('Bus',BusSchema);
        return model;
    }catch(error){
        let err = new Error('Cannot connect to DB');
        err.status = 500;
        throw err;
    }
}

collection.getPassengerCollection = async()=>{
    try{
        let dbConnection = await Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let model = await dbConnection.model('Passenger', passengerSchema);
        return model;
    }catch (error){
        let err = new Error("Unable to connect to the database");
        err.status = 500;
        throw err;
    }

}

module.exports = collection;