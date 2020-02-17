const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"]
    },
    location: {
        type: String,
        required: false,
        unique: false
    },
    number: {
        type: String,
        required: true,
        unique: false
    },
    image: {
        type: String
    },
    description: {
        type : String
    }
    
})

const bookhospital = mongoose.model("hospitalBooking",doctorSchema);

module.exports = bookhospital