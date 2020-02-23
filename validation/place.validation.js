const {place}= require("./place.schama");

module.exports={
    placeValidation: async(req,res,next)=>{
        const value= await place.validate(req.body);
        if(value.error){
            res.json({
                status:false,
                message:value.error.details[0].message
            })
        }else{
            next();
        }
    }
}


