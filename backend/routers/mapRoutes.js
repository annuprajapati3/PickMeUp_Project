const express = require("express");
const {getAddressCondinator , getDistance ,GetSuggestion} = require("../controller/MapServices")
const {Authorization } = require("../middleware/userAuth")
const routes = express.Router();
routes.get("/getCoordinate" , Authorization ,  getAddressCondinator)
routes.get("/getDistance" ,  Authorization,getDistance)
routes.get("/getSuggestion",Authorization  , GetSuggestion);
module.exports = routes;