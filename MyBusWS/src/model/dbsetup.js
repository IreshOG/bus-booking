const collection = require("../utilities/connection");

const passengerDb = [{
        passengerId: 1001,
        passengerName: "Sam",
        walletBalance: 2500,
    },
    {
        passengerId: 1035,
        passengerName: "Amanda",
        walletBalance: 5500
    },
    {
        passengerId: 2001,
        passengerName: "Tim",
        walletBalance: 0
    },
    
];

const busDb = [{
        busId: "B-101",
        busName: "Bharat",
        price: 500,
        seatsAvailable: 10,
        status:"Running",
        bookings: [{
            passengerId: 1001,
            passengerName:"Joshua",
            bookingId: 3001,
            numberOfTickets: 4,
            bookingCost: 2000
        },
        {
            passengerId: 2001,
            passengerName:"Lopen",
            bookingId: 3004,
            numberOfTickets: 1,
            bookingCost: 500
        }
    ]
},
    {
        busId: "B-102",
        busName: "Volvo",
        price: 800,
        seatsAvailable: 20,
        status:"Running",
        bookings: [{
                passengerId: 1001,
                passengerName:"Reno",
                bookingId: 3002,
                numberOfTickets: 2,
                bookingCost: 1600
            },
            {
                passengerId: 1035,
                passengerName:"Polard",
                bookingId: 3003,
                numberOfTickets: 4,
                bookingCost: 3200
            }
        ]
    },
    {
        busId: "B-103",
        busName: "Safar",
        price: 650,
        seatsAvailable: 10,
        status:"Cancelled",
        bookings: [{
                passengerId: 2001,
                passengerName:"McCullum",
                bookingId: 3010,
                numberOfTickets: 1,
                bookingCost: 650
            },
            {
                passengerId: 1035,
                passengerName:"Stewart",
                bookingId: 3006,
                numberOfTickets: 3,
                bookingCost: 1950
            }
        ]
    }

]

exports.setupDb = async() => {
    let passenger = await collection.getPassengerCollection();
    await passenger.deleteMany();
    let passengerData = await passenger.insertMany(passengerDb);
    let busBooking = await collection.getBusCollection();
    await busBooking.deleteMany();
    let busBookingData = await busBooking.insertMany(busDb)
    if(passengerData && busBookingData) {
        return "Insertion Successful"
    }
    else{
        let error = new Error("Insertion failed");
        error.status = 400;
        throw error;
    }    
}