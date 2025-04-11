const express = require("express");
const { Authorization } = require("../middleware/userAuth");
const {AuthorizationC} = require("../middleware/catainAuth")
const { Ride  , RideFare ,RideConfirm , RideStart ,RideEnd} = require("../controller/Ride");
const routes = express.Router();
routes.post("/rideDetails" , Authorization ,Ride )
routes.get("/rideFare" , Authorization ,RideFare )
routes.post("/captain/ride/confirm" , AuthorizationC , RideConfirm)
routes.post("/captain/ride/start", AuthorizationC , RideStart )
routes.post("/captain/ride/end", AuthorizationC , RideEnd )
module.exports = routes;