const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const webtoken = require('jsonwebtoken');
const express = require('express');

const app = express();

exports.registerAdmin = (req, res, next) => {
    var password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            res.send("ERROR" + err)
        }
        else {
            var admin = new Admin({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash
            })
            admin.save().then(
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
                    err: err,
                })
            });
        }
    })
}
