const express = require('express');
const {AuthorizationC} = require('../middleware/catainAuth')
const {captainLogin , captainLogout , captainRegister , getCapatinDetails} = require('../controller/captainRegistration')
const captainRotes = express.Router();
captainRotes.post('/captainRegister' , captainRegister);
captainRotes.get('/getCaptainDetails', AuthorizationC , getCapatinDetails);
captainRotes.post('/captainLogin' , captainLogin);
captainRotes.get('/captainLogout' , captainLogout);
module.exports = captainRotes