const express = require('express');
const mongoose = require('mongoose')
const morgan = require ('morgan');
const doctorRoutes = require('./routes/doctorRoutes')
const hospitalRoutes = require('./routes/hospitalRoutes')
const bodyParser = require ('body-parser');
require('dotenv').config();
const userRoute = require('./routes/usersRoutes')
const bodyparse = require('body-parser')
const app = express();
const auth = require('./auth')
const image = require ('./controller/uploads')

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
}). then(() =>{
    console.log('Connected to DB' + process.env.MONGO)
}).catch((err)=>{
    console.log('Failed to connect to DB' + err)
})

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/users",userRoute);
app.use("/doctors",doctorRoutes);
app.use("/hospital",hospitalRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("START "+ process.env.PORT)
})
module.exports=app;



