const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false,
        unique: false
    },
    number: {
        type: String,
        required: false,
        unique: true
    },
    image: {
        type : String,
        required : true
    }
})

const hospital = mongoose.model("hospital",hospitalSchema);

module.exports = hospital