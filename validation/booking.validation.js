const {booking}= require("./booking.schema");

module.exports={
    bookingValidation: async(req,res,next)=>{
        console.log(req.body);
        const value= await booking.validate(req.body);

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


