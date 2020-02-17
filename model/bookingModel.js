const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
        unique: false
    },
    image: {
        type: String
    },
    
})

const bookdoctor = mongoose.model("doctorBooking",doctorSchema);

module.exports = bookdoctor