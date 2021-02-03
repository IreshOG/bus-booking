let Validator = {};

//To validate bus Id
Validator.validateBusId = function (busId) {
    let pattern = new RegExp("^B-[1-9][0-9]{2}$");
    if (busId.length != 5 && !(pattern.test(busId))) {
        let error = new Error("Error in bus Id");
        error.status = 406;
        throw error;
    }
}

//To validate booking Id
Validator.validateBookingId = function (bookingId) {
    if (new String(bookingId).length != 4) {
        let error = new Error("Error in booking Id");
        error.status = 406;
        throw error;
    }
}

module.exports=Validator;