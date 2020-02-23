const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const dbConnection = require("../model/contact_us");


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

async function addContact(req,res){
if (authenticate(req.headers.authorization)==false){
    notAuthenticated(res);
    return;
}

    try {
       await dbConnection.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
           
          });
          res.json({
            status: true,
            message: "Cantact  added"
          });
        
    } catch (error) {
        res.json({
            status: false,
            message: "Error: "+error
          });
        
    }
}



async function getallContact(req, res) {
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




async function deleteContact(req, res) {
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
          contact_id: req.params.id
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






module.exports={
    addContact,
    getallContact,
    deleteContact
}


