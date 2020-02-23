const {contact}= require("./contact.schema");

module.exports={
   ContactValidation: async(req,res,next)=>{
        const value= await contact.validate(req.body);

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


