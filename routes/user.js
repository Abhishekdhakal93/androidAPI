const Express = require('express');
const routers = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require("../Controller/user");
const {userValidation}= require("../validation/user.validation");


routers.use(bodyParser.json());
routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(cors.apply());

routers.get("/get_all",userController.getallUser);
routers.get("/get_user_by_id/:id",userController.getUserById);
routers.post("/register",userValidation, userController.register);
routers.post("/login",userController.login);
routers.delete("/deleteuser/:id", userController.deleteUser);

module.exports = routers;