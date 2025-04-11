
const server = require('./server')
const socketIo = require('socket.io');
const userSchema = require('./model/userSechma');
const captainSchema = require('./model/captainSchema');
let io;
const Initialize = (sever)=>{
    io = socketIo(sever , {
        cors :{
            origin : '*',
            methods :['GET' , 'POST'],
        }
    })
    io.on('connection' , (socket)=>{
        console.log(`client connected having Id : ${socket.id} `);
        socket.on('join' , async(data)=>{
            const {userType , userId} = data
            if(userType=='user'){
                await userSchema.findByIdAndUpdate(userId , {socketId : socket.id})
            }else{
                await captainSchema.findByIdAndUpdate(userId , {socketId : socket.id});
            }
        })
        socket.on('update-captain-location', async (data) => {
            
          
            const { captainId, location } = data;
          
            // Correct validation
            if (!location || location.lat == null || location.lng == null) {
              console.error("Invalid location data:", location);
              return socket.emit('error', { message: 'Invalid location' });
            }
          
            try {
              await captainSchema.findByIdAndUpdate(
                captainId,
                {
                  location: {
                    type: "Point",
                    coordinates: [Number(location.lng), Number(location.lat)]
                  }
                },
                { new: true }
              );
            } catch (err) {
              console.error("Error updating location:", err.message);
              socket.emit('error', { message: 'DB error while updating location' });
            }
          });
          
        socket.on('disconnect' , ()=>{
            console.log(`disconnected clinet id : ${socket.id} `);
        })
    })
}
const messageSend = (socketId , message) =>{
    if(io){
      console.log(socketId);
      console.log(message.data);

        io.to(socketId).emit(message.event , message.data);
    }else{
        console.log('socket is not intitalize');
    }
}
module.exports = {
    Initialize , 
    messageSend,
}