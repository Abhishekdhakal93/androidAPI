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
        required: true,
        unique: false
    },
    image: {
        type: String,
        required : [true, "Image is required"]
    }
})

const doctor = mongoose.model("doctor",doctorSchema);

module.exports = doctor