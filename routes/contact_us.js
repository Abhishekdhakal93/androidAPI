const Express = require('express');
const routers = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const contactController = require("../controller/contact_us");
const {ContactValidation}= require("../validation/contact.validation");

routers.use(bodyParser.json());
routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(cors.apply());

routers.get("/get_all_contact",contactController.getallContact);
routers.post("/add_contact",ContactValidation, contactController.addContact);
routers.delete("/deletecontact/:id", contactController.deleteContact);

module.exports = routers;