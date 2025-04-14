
import { useNavigate } from 'react-router-dom';
import { useRide } from '../../context/RideContext';
import axios from "axios";
import { useState , useEffect} from 'react';
import LiveMap from '../../routersPages/LiveMap';
const CaptainRides = ()=>{
    const[confirmRide , SetConfirmRide] = useState(false)
    const navigate = useNavigate();
    const {UserData} = useRide();
    const token = localStorage.getItem("token")
    const OnClickHandler = ()=>{
        SetConfirmRide(false)
        navigate('/CaptainHome')
    }
    const RideCompleteHandler = async ()=>{
        SetConfirmRide(true)
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post("http://localhost:3000/captain/ride/end" , {
            rideId : UserData.newRide._id,
          },{
            headers : {Authorization : `Bearer ${token}`}
          })
    }
    const [UserPickupCoords , setUserPickupCoords] = useState(null)
    const userLiveLocation = async ()=>{
        const res = await axios.get("http://localhost:3000/getCoordinate", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    params: {
                      address: UserData.newRide.pickup,
                    },
                  });
          
                  const { lat, lng } = res.data;
                  if (lat && lng) {
                    setUserPickupCoords([lat, lng]);
                  }
    }
    userLiveLocation();
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
          console.log("cap live location" , location)
          console.log("user live location" , UserPickupCoords)
    return<>
        <div className="w-full h-screen relative overflow-hidden">
            <span className=" absolute left-4 top-4 text-3xl font-bold tracking-wide italic font-sans">GoPilot 🚀</span>
            {UserPickupCoords && location ? (
                        <LiveMap pickup={UserPickupCoords} destination={location} ride={`User Live Location ${UserData.newRide.pickup}`} dest={"Your live loaction"}/>
                      ) : (
                        <LiveMap />
                      )}

            {/* Distance Indicator */}
            <div className="absolute flex justify-between bottom-4 left-4 bg-amber-400 right-4 px-4 py-2 rounded-md text-white font-semibold z-10 w-full h-16 items-center">
                <p className='text-lg font-medium p-3'>4 km away</p>
                <button className='w-40  rounded-lg h-10 mr-9 bg-[#2ECC71] text-white cursor-pointer' onClick={()=>RideCompleteHandler()}>Complete Ride</button>
            </div>
            {confirmRide && (
            <div className="absolute inset-0 flex items-center justify-center  bg-opacity-90">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-lg font-bold text-gray-800">🎉 Congratulations!! 🎉</p>
                    <p className="text-gray-700 mt-2">You have successfully earned ₹{UserData.newRide.fare}</p>
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