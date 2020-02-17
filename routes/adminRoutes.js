const express = require('express');
const bodyParser = require('body-parser');
const user = require('../controller/adminController');
const auth = require('../auth');
const route = express.Router();
var multer  = require('multer')


route.route("/adminregister")
.get((req, res) =>{
    res.send("Register Page")
})
.post(user.registerAdmin);

module.exports=route;