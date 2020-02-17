const User = require('../model/userModel');
const doctor = require('../model/doctorModel');
const hospital = require('../model/hospitalModel');
const bookmodel = require('../model/bookingModel');
const bookhospital = require('../model/hospitalModel');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const webtoken = require('jsonwebtoken');
const express = require('express');

const app = express();

exports.loginUser = (req, res, next) => {
    console.log("login success")
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = webtoken.sign({ _id: user._id }, process.env.TOKEN);
                        console.log("welcome")
                        res.json({ status: 'Login success!', token: token ,user:user});
                    }).catch(next);
            }
        })
        .catch(err => { res.send(err) })
}
exports.registerUser = (req, res, next) => {
    var password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            res.send("ERROR" + err)
        }
        else {
            var user = new User({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                image: req.body.image== null ? "":req.body.image,
                password: hash
            })
            user.save().then(
                () => {
                    let token = webtoken.sign(
                        { id: user._id },
                        process.env.token
                    );

                    res.status(201).send({
                        token: token,
                        status: "Success"
                    })
                }
            ).catch(err => {
                res.send({
                    status: "Failure",
                    err: err.message,
                })
            });
        }
    })
}

exports.bookdoctor = (req, res, next)=>{
    bookmodel.create({
            name:req.body.name,
            number: req.body.phone,
            location: req.body.location,
            image : req.body.image
    }).then(added => {res.send(added)}).catch(err => res.send({
        message: "booking create error",
        err
    }))
}


exports.addDoctor=(req,res,next)=>{
    this.addDoctor.create({
                name : req.body.name,
                location : req.body.location,
                number : req.body.number,
                image : req.body.image
        }).then(added => {res.send(added)}).catch(err => res.send)({
            message: "Doctor create error",
            err
        })
}
exports.bookhospital = (req, res, next)=>{
    bookhospital.create({
            name:req.body.name,
            number: req.body.phone,
            location: req.body.location,
            image : req.body.image,
            description: req.body.description
    }).then(book=>{res.send({message:"Success"})})
    .catch(err=>{res.send({err})})
}

exports.showuser = (req, res, next) => {
    User.find().then(user => {
        res.status(200).send(user)
    }
    )
}
exports.me = (req, res, next) => {
    console.log(req.params.id)
    User.findOne({ _id: req.params.id }).then(user => {
        res.status(200).send(user)
    }
    )
}
exports.updateMe = (req, res, next) => {
    uid = req.params._id;
    console.log(uid)
    console.log(req.body)
    User.update(
        {_id: uid},
        {
            $set:{
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            image : req.body.image
            }
        }
    )
    .then(function(user){
        console.log("User updated : ");
        res.status(201).json({
            message: "User Details are updated Successfully"
        });
    })
    .catch(function (e){
        res.status(422).json({
            message: "Unable to Update : " +e
        });
    });
}
exports.me = (req,res, next)=>{
    console.log(req.user.email);
    User.findOne({email: req.user.email}).then(user =>{
        res.status(200).send(user);
    });
};

exports.update = (req, res, next) =>{
    uid = req.user._id;
    console.log(uid); 
    console.log(req.body);
    User.update(
        { _id: uid },
            {
                $set:{
                    name : req.body.name,
                    email : req.body.email,
                    phone : req.body.phone,
                    image : req.body.image
                }
            }
    )
        .then(function(user){
            console.log("User Updated : ");
            res.status(201).json({
                message : "User details updated"
            });
        })
        .catch(function(e){
            res.status(422).json({
                message:"unable to update : " + e
            });
        });
};

exports.delete=(req, res,next) => {
    User.findById(req.params._id).then(user => {
          user
        .delete()
        .then(function(result) {
          res.status(201).json({
            message: "user Deleted Successfully"
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  }
            // User.findOneAndUpdate(
            //     { email: req.params.email },
            //     {
            //         name: req.body.name,
            //         phone: req.body.phone,
            //         email: req.body.email,
            //         image : req.body.image
            //     }
            // ).then(res.status(200).send("User Updated")).catch(err => res.send(err))

exports.showdoctor = (req, res, next) => {
    doctor.find({}).then(data=>res.send(data))
}
exports.showhospital = (req, res, next) => {
    hospital.find({}).then (data => res.send(data))
}
exports.showbooked = (req,res,next) =>{
    console.log(req.body);
    bookmodel.find({}).then(data=>res.send(data))
}