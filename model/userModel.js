const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"]
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    image : {
        type: String
    },
    rating: {
        type: String,
        default: 5
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const users = mongoose.model("User",userSchema);

module.exports = users