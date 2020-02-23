const Express = require('express');
const routers = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingController = require("../Controller/booking");
const {bookingValidation}= require("../validation/booking.validation");

routers.use(bodyParser.json());
routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(cors.apply());

routers.get("/get_all_booking",bookingController.getallBooking);
routers.get("/getallbookinglist",bookingController.getall);
routers.post("/addBooking",bookingController.addbooking);
routers.delete("/deletebooking/:id", bookingController.deleteBooking);

module.exports = routers;                        