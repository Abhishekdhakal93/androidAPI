const joi = require("@hapi/joi");
const schama={
   booking:joi.object({
      booking_id: joi.number().integer().max(3),
      userUserId:joi.number().integer().max(3).required(),
      packagePackagesId: joi.number().integer().required(),
      date: joi.string().required(),
      no_people: joi.number().integer().max(6).required()
      
      
   })
};

module.exports= schama;