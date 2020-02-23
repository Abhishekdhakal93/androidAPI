const joi = require("@hapi/joi");
const schama={
   contact:joi.object({
      contact_id: joi.number().integer().max(3),
      name:joi.string().min(4).max(100).required(),
      email: joi.string().email().required(),
      message: joi.string().min(10).max(500).required(),
      subject: joi.string().min(4).max(50).required()
          
   })
};

module.exports= schama;