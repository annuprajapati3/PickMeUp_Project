
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContex';
import LiveMap from '../../routersPages/LiveMap';
import { useRide } from '../../context/RideContext';
const UserRides = ()=>{
    const { socket } = useSocket();
    const {UserData} = useRide();
    const RideInfo = useRef();
    const[confirmRide , SetConfirmRide] = useState(false)
        const navigate = useNavigate();
        const OnClickHandler = ()=>{
            SetConfirmRide(false)
            
            navigate('/home')
        }
    useEffect(() =>{
        socket.on('ride-end' , (data)=>{
            RideInfo.current = data;
            navigate('/home')
        })
    })
    // eslint-disable-next-line no-unused-vars
    const [location , setLocation] = useState(null);
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
          },
          (err) => console.error("Live location error:", err),
          { enableHighAccuracy: true }
        );
    
        return () => navigator.geolocation.clearWatch(watchId);
      }, []);
        return<>
            <div className="w-full h-screen relative overflow-hidden">
                <span className=" absolute left-4 top-4 text-3xl font-bold tracking-wide italic font-sans">PickMeUp</span>
                <LiveMap ></LiveMap>
    
                {/* Distance Indicator */}
                <div className="absolute flex justify-between bottom-4 left-4 bg-amber-400 right-4 px-4 py-2 rounded-md text-white font-semibold z-10 w-full h-16 items-center">
                    <p className='text-lg font-medium p-3'>4 km away</p>
                    <button className='w-40  rounded-lg h-10 mr-9 bg-[#2ECC71] text-white cursor-pointer' onClick={()=>SetConfirmRide(true)}>Make Payment</button>
                </div>
                {confirmRide && (
                <div className="absolute inset-0 flex items-center justify-center  bg-opacity-90">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-bold text-gray-800">🎉 You have reached your destination 🎉</p>
                        <p className="text-gray-700 mt-2">Pay ₹193.25 to your Captain</p>
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
export default UserRides;