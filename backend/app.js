const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./connection');
const userRouter = require('./routers/userRouters');
const captainRotes = require('./routers/captainRoutes');
const map = require('./routers/mapRoutes');
const ride = require('./routers/RideRoutes')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter)
app.use(captainRotes);
app.use(map);
app.use(ride)
app.use((req,res,next)=>{
    res.send('hwllo');
    next();
})
module.exports = app;