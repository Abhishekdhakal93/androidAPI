const express = require('express');
const bodyParser = require('body-parser');

const user = require('../controller/nareshController');

const route = express.Router();

route.route("/register")
.get((req, res) =>{
    res.send("Register Page")
})
.post(user.registerUser);

route.route("/login")
.get((req,res) => {
    res.send("Login page")
})

module.exports = route;