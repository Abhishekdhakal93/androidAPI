const express = require('express');
const bodyParser = require('body-parser');
const user = require('../controller/userController');
const auth = require('../auth');
var multer  = require('multer')
const User = require('../model/userModel');

// const upload = require('../controller/uploads');
const upload = require('../controller/middleware/userUpload');

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
.post(user.loginUser)

route.post("/bookdoctor",user.bookdoctor) 
route.post("/bookhospital", user.bookhospital)

route.route("/me")
.get (auth.verifyUser, user.me)
.patch (auth.verifyUser, user.update);

route.get("/users",auth.verifyUser,user.showuser)



route.route("/users/:id").get(auth.verifyUser,user.me)
.patch(auth.verifyUser,user.updateMe);


route.post("/userUpload", upload,(req,res)=>{
    console.log("SAD",req.file.path);
    
    User.findOneAndUpdate({email:req.email}, {
        image:req.file.path
    }, function (err, user) {
        res.json(req.file)
    });
   
  });


module.exports = route;