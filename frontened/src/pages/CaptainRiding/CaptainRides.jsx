import map from '../../assets/googlemap.jpg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from "../../context/SocketContex";
import axios from "axios";
const CaptainRides = ()=>{
    const[confirmRide , SetConfirmRide] = useState(false)
    const navigate = useNavigate();
    const { socket } = useSocket();
    const RideData = useRef();
    useEffect(()=>{
        socket.on("new-ride", (data) => {
            console.log("new-ride" , data);
            RideData.current = data;
          });
         
    })
    const token = localStorage.getItem("token")
    const OnClickHandler = ()=>{
        SetConfirmRide(false)
       
        navigate('/CaptainHome')
    }
    const RideCompleteHandler = async ()=>{
        SetConfirmRide(true)
        const response = await axios.post("http://localhost:3000/captain/ride/end" , {
            rideId : RideData.current.newRide._id,
          },{
            headers : {Authorization : `Bearer ${token}`}
          })
          console.log(response.data);
    }
    return<>
        <div className="w-full h-screen relative overflow-hidden">
            <span className=" absolute left-4 top-4 text-3xl font-bold tracking-wide italic font-sans">GoPilot 🚀</span>
            <img src={map} className="h-full w-full object-cover" alt="Map" />

            {/* Distance Indicator */}
            <div className="absolute flex justify-between bottom-4 left-4 bg-amber-400 right-4 px-4 py-2 rounded-md text-white font-semibold z-10 w-full h-16 items-center">
                <p className='text-lg font-medium p-3'>4 km away</p>
                <button className='w-40  rounded-lg h-10 mr-9 bg-[#2ECC71] text-white cursor-pointer' onClick={()=>RideCompleteHandler()}>Complete Ride</button>
            </div>
            {confirmRide && (
            <div className="absolute inset-0 flex items-center justify-center  bg-opacity-90">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-lg font-bold text-gray-800">🎉 Congratulations!! 🎉</p>
                    <p className="text-gray-700 mt-2">You have successfully earned ₹193.25</p>
                    <button
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => OnClickHandler()}
                    >
                     🏠 Go to Home
                    </button>
                </div>
            </div>
      )}
        </div>


    </>
}
export default CaptainRides