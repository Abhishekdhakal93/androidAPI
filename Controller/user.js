const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const dbConnection = require("../model/user");


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
async function register(req, res) {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const result = await dbConnection.findOne({
      where: { email: req.body.email }
    });
    if (result) {
      res.json({
        status: false,
        message: "Email already exit"
      });
    } else {
      dbConnection.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        password: hashedPassword,
        image: req.body.image
      });
      res.json({
        status: true,
        message: "User Regiser Sucessfull"
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Fail to register User"
    });
  }
}

async function getallUser(req, res) {
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

async function getUserById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

console.log(req.params.id);

  try {
    const result = await dbConnection.findAll({ where : {user_id: req.params.id }});
  const data={
        user_id:result[0].user_id,
        first_name: result[0].first_name,
        last_name:result[0].last_name,
        contact: result[0].contact,
        email: result[0].email,
        address: result[0].address,
        password: result[0].password,
        image: result[0].image
  }
    res.json(data);
  }catch(error){
    res.json({
      status: false,
      message: "data not found"
    });
  }

}

async function login(req, res) {
  console.log(req.body);
  const password = req.body.password;
  try {
    const result = await dbConnection.findOne({
      where: { email: req.body.email }
    });

    if (result) {
      const passwordFromDB = result.password;
      const id = result.user_id;
      console.log(id);
      const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
      if (isMatchPassword) {
        res.json({
          status: true,
          accessToken: jwt.sign({ patientEmail: req.body.email }, SECRET_KEY),
          message: "Login Sucess",
          id: id
        });
      } else {
        res.json({
          status: false,
          message: "Password do not match"
        });
      }
    } else {
      res.json({
        status: false,
        message: "Email do not match"
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Email donot match"
    });
  }
}



async function deleteUser(req, res) {
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
          user_id: req.params.id
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
  login,
  register,
  getallUser,
  getUserById,
  deleteUser
};
