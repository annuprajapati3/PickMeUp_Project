const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const { Initialize } = require('./Socket');
dotenv.config();
const httpServer = http.createServer(app);
const Port = process.env.PORT || 3000;
Initialize(httpServer);
httpServer.listen(Port , ()=>{
    console.log(`server is running on port ${Port}`)
})