const express = require('express');
const {userReg ,userLogin , getUserDetails , userLogOut} = require('../controller/userRegistration')
const {Authorization} = require('../middleware/userAuth')
const userRouter = express.Router();
userRouter.post('/userRegistration' , userReg);
userRouter.post('/userLogin' , userLogin)
userRouter.get('/getUserDetails', Authorization, getUserDetails)
userRouter.get('/userLogout' ,userLogOut)
module.exports = userRouter;