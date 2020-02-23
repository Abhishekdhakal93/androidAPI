const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const mySeq = require("../databaseConfiguration/dbConfiguration");
const dbConnection = require("../model/booking");


function notAuthenticated(res) {
    res.json({
        status: false,
        message: 'You are not authenticate user',
        code: 404
    });
}

function authenticate(token) {
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return true;
        // use payload if required
    } catch (error) {
        console.log(error)
        return false
    }
}

async function addbooking(req, res) {
    if (authenticate(req.headers.authorization) == false) {
        notAuthenticated(res);
        return;
    }
    try {
        await dbConnection.create({
            date: req.body.date,
            no_people: req.body.no_people,
            packagePackagesId: req.body.packagePackagesId,
            userUserId: req.body.userUserId
        });
        res.json({
            status: true,
            message: "Booking done  "
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Error: " + error
        });

    }
}

async function getallBooking(req, res) {
    if (authenticate(req.headers.authorization) == false) {
        notAuthenticated(res);
        return;
    }

    // if (authenticate(req.headers.authorization) == false) {
    //     notAuthenticated(req);
    //     return;
    // }
    mySeq.sequelize.query(
        ` select * from user u inner join booking b on u.user_id=b.userUserId 
    INNER JOIN packages p on b.packagePackagesId=p.packages_id    `, //query for counting user
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            const data = {

                packages_name: result[0].packages_name,
                packages_type: result[0].packages_type,
                booking_id: result[0].booking_id,
                email: result[0].email,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                contact: result[0].contact,
                date: result[0].date,
                no_people: result[0].no_people

            }

            res.json(data);
        }).catch(err => {

            res.json({
                status: false,
                message: "Error: " + err
            });
        })



}



async function getall(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      const result = await dbConnection.findAll();
    
      res.json(result);
    }catch(error){
      res.json({
        status: false,
        message: error
      });
    }
  
  }

  async function deleteBooking(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    if (req.params.id === null) {
      // console.log('asdadsasdasdasdasdasdasd')
      res.status(500);
      res.json({ status: 500, message: "ID is not provided" });
    } else {
      dbConnection
        .destroy({
          where: {
            booking_id: req.params.id
          }
        })
        .then(function(result) {
          //console.log(result + "asdadsasdasdasdasdasdasd");
          if (result === 0) {
            res.status(404);
            res.json({ status: 404, message: "user not found" });
          } else {
          }
          //console.log(result);
          res.status(200);
          res.json({ status: 200, message: "succesfully deleted" });
        })
        .catch(function(err) {
          console.log(error);
          res.json({
            status: false,
            message: error
          });
        });
    }
  }






module.exports = {
    addbooking,
    getallBooking,
    getall,
    deleteBooking
}


