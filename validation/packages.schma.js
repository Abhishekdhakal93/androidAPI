const joi = require("@hapi/joi");
const schama={
   packages:joi.object({
    packages_name:joi.string().min(5).required(),
    packages_type:joi.string().min(5).required(),
    duration:joi.string().min(3).required(),
    description: joi.string().min(10).required(),
    price: joi.number().integer().max(50000).required(),
    image: joi.string().min(5).required(),
    itinary: joi.string().min(5).required(),
    placePlaceId: joi.number().integer().required(),
    packages_id: joi.number().integer()
      
      
   })
};

module.exports= schama;