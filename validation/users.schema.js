const joi = require("@hapi/joi");
 
const schama={
   user:joi.object({
       user_id: joi.number().integer().max(3),
       first_name:joi.string().min(4).max(50).required(),
       last_name: joi.string().min(4).max(50).required(),
       email: joi.string().email().required(),
       address: joi.string().min(4).max(50).required(),
       password: joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
       contact: joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number").required(),
       image:joi.string().min(5).max(100).required()
   })
};

module.exports= schama;