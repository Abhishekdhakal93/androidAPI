const Express = require('express');
const routers = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const placeController = require("../Controller/place");
const {placeValidation}= require("../validation/place.validation");


routers.use(bodyParser.json());
routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(cors.apply());

routers.get("/get_all_palce",placeController.getallPlace);
routers.get("/get_city_by_id/:id",placeController.getCitybyId);
routers.get("/get_place_by_city/:name",placeController.getPlaceByCity);
routers.get("/get_packages_by_type/:name",placeController.getPackagesByType);
routers.post("/add_place",placeController.addPlace);
routers.delete("/deleteplace/:id", placeController.deletePlace);
routers.put("/updateplace/:id", placeController.updatePlace);
routers.get("/getPlaceById/:id", placeController.getPlaceById);
module.exports = routers;