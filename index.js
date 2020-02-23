const Express = require('express');
const port = process.env.PORT || 8001;
const userRoutes = require('./routes/user');
const contactUsRoutes= require('./routes/contact_us');
const placeRoutes= require('./routes/place');
const packagesRoutes= require('./routes/packages');
const bookingRoutes= require('./routes/booking');
const imageUpload= require('./routes/imageUpload');

const app = new Express();
const path = require('path');

app.use("/travel/v1/user",userRoutes);
app.use("/travel/v1/contact",contactUsRoutes);
app.use("/travel/v1/place",placeRoutes);
app.use("/travel/v1/packages",packagesRoutes);
app.use("/travel/v1/booking",bookingRoutes);
app.use("/travel/v1",imageUpload);

app.use(Express.static(path.join(__dirname, './images')));


app.use((req, res, next) => {
    const error = new Error("URL not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
         
          message: error.message
        }
    });
});

app.listen(port, function () {
    console.log("Listening on port: ", port);
});

module.exports=app;