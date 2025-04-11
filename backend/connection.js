const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/uber').then(()=>console.log('db connected'));
module.exports = mongoose;