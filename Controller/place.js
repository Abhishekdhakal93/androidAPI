const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const dbConnection = require("../model/place");
const mySeq = require("../databaseConfiguration/dbConfiguration");
var packages = require("../model/packages");

dbConnection.hasMany(packages);
packages.belongsTo(dbConnection);


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

async function addPlace(req,res){
    if (authenticate(req.headers.authorization)==false){
        notAuthenticated(res);
        return;
    }
    try {
        const result = await dbConnection.findOne({where:{place_name:req.body.place_name}});
        console.log(result)
        if(result){
            res.json({
                status:false,
                message:"this place name already exit"
            })
        }else{
            try {
                await dbConnection.create({
                 place_name: req.body.place_name,
                 image: req.body.image,
                 country: req.body.country,
                 city: req.body.city,
                 address: req.body.address
                   });
                   res.json({
                     status: true,
                     message: "Tourism place  added"
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


async function getPlaceByCity(req,res){
    if (authenticate(req.headers.authorization)==false){
        notAuthenticated(req);
        return;
    }
    try {
        const result= await dbConnection.findAll({ where : {city: req.params.name }});
        console.log(result)
        res.json(result);
    } catch (error) {
        res.json({
            status:false,
            message: "Error: "+error
        });
    }
}

async function getallPlace(req,res){
    if (authenticate(req.headers.authorization)==false){
        notAuthenticated(res);
        return;
    }   

    console.log(req.headers)

    try {
        const result= await dbConnection.findAll();
        res.json(result);
    } catch (error) {
        res.json({
            status:false,
            message: "Error: "+error
        });
    }
}

async function getCitybyId(req,res){
    if (authenticate(req.headers.authorization)==false){
        notAuthenticated(req);
        return;
    }   
    mySeq.sequelize.query(
        `select * from  place p 
        inner join packages pa
        where p.place_id=pa.placePlaceId and p.place_id =:pid`, //query for counting user
        { replacements: {pid:req.params.id } ,type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        const data={
            place_id: result[0].place_id,
            place_name:  result[0].place_name,
            image:  result[0].image,
            country:  result[0].country,
            city:  result[0].city,
            address:  result[0].address,
            packages_id:  result[0].packages_id,
            packages_name:  result[0].packages_name,
            packages_type:  result[0].packages_type,
            duration:  result[0].duration,
            description: result[0].description,
            price: result[0].price,
            itinary: result[0].itinary,
            placePlaceId: result[0].placePlaceId

        }

        res.json(data);
    }).catch(err => {
       
        res.json({
            status:false,
            message: "Error: "+err
        });
    })

}

async function getPackagesByType(req,res){
    if (authenticate(req.headers.authorization)==false){
        notAuthenticated(req);
        return;
    }   
    mySeq.sequelize.query(
        `select * from  place p 
        inner join packages pa
        where p.place_id=pa.placePlaceId and pa.packages_type =:name`, //query for counting user
        { replacements: {name:req.params.name } ,type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        res.json(result);
    }).catch(err => {
       
        res.json({
            status:false,
            message: "Error: "+err
        });
    })

}


async function deletePlace(req, res) {
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
            place_id: req.params.id
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



  async function updatePlace(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    console.log(req.body);
  
    try {
      await dbConnection.update(
        {
        place_name: req.body.place_name,
        image: req.body.image,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address 
        
        },
        {
          where: {
            place_id: req.params.id
          }
        }
      );
  
      res.json({
        status: true,
        message: "Place Update successfully"
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: error
      });
    }
  }


  async function getPlaceById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
      const result = await dbConnection.findAll({
        where: {place_id: req.params.id }
      });
  
      const data = {
        place_id: result[0].place_id,
        place_name: result[0].place_name,
        image: result[0].image,
        country: result[0].country,
        city: result[0].city,
        address: result[0].address,
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
    addPlace,
    getPlaceByCity,
    getallPlace,
    getCitybyId,
    getPackagesByType,
    deletePlace,
    updatePlace,
    getPlaceById
}


