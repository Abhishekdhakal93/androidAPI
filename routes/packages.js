const Express = require('express');
const routers = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const packagesController = require("../Controller/packages");
const {packagesValidation}= require("../validation/packages.validation");


routers.use(bodyParser.json());
routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(cors.apply());

routers.get("/get_all_packges",packagesController.getAllPackages);
routers.post("/add_packages",packagesValidation, packagesController.addPackages);
routers.delete("/deletepackage/:id", packagesController.deletePackage);
routers.put("/updatepackage/:id", packagesController.updatePackage);
routers.get("/getPackageById/:id", packagesController.getPackageById);
module.exports = routers;