const express = require('express');
const bodyParser = require('body-parser');
const list = require('../controller/userController');
const doctormodel = require('../model/doctorModel');
const auth = require('../auth');
const route = express.Router();
const upload = require('../controller/middleware/doctorUpload');
var multer  = require('multer')


route.post("/doctorUpload", upload,(req,res)=>{
    console.log(req.file.image)
    res.json(req.file)
  });

route.post("/doctoradd", list.addDoctor);

route.get("/doctoradd",list.showdoctor);

route.post("/booking",list.bookdoctor);

route.get("/booking",auth.verifyUser, list.showbooked);

module.exports=route;