const joi = require("@hapi/joi");
const schama={
   place:joi.object({
      place_id:joi.number().integer().max(3),
      place_name:joi.string().min(5).required(),
      image: joi.string().min(5).required(),
      country: joi.string().min(4).required(),
      city: joi.string().min(4).required(),
      address: joi.string().min(5).required()
   })
};

module.exports= schama;