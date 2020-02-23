
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const dbConnection = require("../model/packages");
const place= require("../model/place");
let packages_id= 0;


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

async function addPackages(req,res){
if (authenticate(req.headers.authorization)==false){
    notAuthenticated(res);
    return;
}


        const resultee = await dbConnection.findAll();
        console.log(resultee.length);
        packages_id= resultee.length+1;

   try {
       const result = await dbConnection.findOne({where:{packages_name:req.body.packages_name}});
       if (result){
        res.json({
            status:false,
            message:"this packages name already exit"
        })
       }else{
        try {
            await dbConnection.create({
                packages_id:packages_id,
                 packages_name: req.body.packages_name,
                 packages_type: req.body.packages_type,
                 duration: req.body.duration,
                 description: req.body.description,
                 price: req.body.price,
                 image: req.body.image,
                 itinary: req.body.itinary,
                 placePlaceId:req.body.placePlaceId          
               });

               res.json({
                 status: true,
                 message: "Add Packages done  "
               });
             
         } catch (error) {
             res.json({
                 status: false,
                 message: "Error: "+error
               });
             
         }
       }
   } catch (error) {
    res.json({
        status: false,
        message: "Error: "+error
      });
   }
}

async function getAllPackages(req,res){
  if (authenticate(req.headers.authorization)==false){
      notAuthenticated(res);
      return;
  }   

  try {
      const result= await dbConnection.findAll({include: [place]});
      res.json(result);
  } catch (error) {
      res.json({
          status:false,
          message: "Error: "+error
      });
  }
}



async function deletePackage(req, res) {
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
            packages_id: req.params.id
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





  async function updatePackage(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    console.log(req.body);
  
    try {
      await dbConnection.update(
        {
        packages_name: req.body.packages_name,
        packages_type: req.body.packages_type,
        duration: req.body.duration,
        description: req.body.description,
        price: req.body.price, 
        image: req.body.image,
        itinary: req.body.itinary,
        placePlaceId: req.body.placePlaceId
       
        
        },
        {
          where: {
            packages_id: req.params.id
          }
        }
      );
  
      res.json({
        status: true,
        message: "Package Update successfully"
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: error
      });
    }
  }




  async function getPackageById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
      const result = await dbConnection.findAll({
        where: {packages_id: req.params.id }
      });
  
      const data = {
        packages_id: result[0].packages_id,
        packages_name: result[0].packages_name,
        packages_type: result[0].packages_type,
        duration: result[0].duration,
        description: result[0].description,
        price: result[0].price,
        image: result[0].image,
        itinary: result[0].itinary,
        placePlaceId: result[0].placePlaceId,
    
      };
  
      console.log(data);
      res.json(data);
    } catch (error) {
      res.json({
        status: false,
        message: error
      });
    }
  }




module.exports={
    addPackages,
    getAllPackages,
    deletePackage,
    updatePackage,
    getPackageById
}


