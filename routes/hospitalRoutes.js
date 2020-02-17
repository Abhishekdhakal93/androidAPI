const express = require('express');
const bodyParser = require('body-parser');
const list = require('../controller/userController');
const hospitalmodel = require('../model/hospitalModel');
const auth = require('../auth');
const route = express.Router();
const upload = require('../controller/middleware/hospitalUpload')
var multer  = require('multer')

route.post("/hospitalUpload", upload,(req,res)=>{
    console.log(req.file.image)
    res.json(req.file)
  });

route.route("/hospitaladd").post(async(req,res)=>{
    console.log(req.body)
const post = new hospitalmodel({
    name : req.body.name,
    location : req.body.location,
    number : req.body.number,
    image : req.body.image
})
const data = await post.save();
res.json(data)
});
route.get("/hospitaladd",list.showhospital);

module.exports=route;