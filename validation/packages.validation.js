const {packages}= require("./packages.schma");

module.exports={
   packagesValidation: async(req,res,next)=>{
        const value= await packages.validate(req.body);
        console.log(req.body)
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


