import map from "../../assets/map.png";
import dummyLady from "../../assets/dummyLady.webp";
import { IoLocation } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineBookOnline } from "react-icons/md";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainData } from "../../context/CaptainContext";
import { useSocket } from "../../context/SocketContex";

import axios from "axios";
const Home = () => {
  const { Captain } = useContext(CaptainData);
  const [confirmRide, SetConfirmRide] = useState(false);
  const [Ridereq, SetRideReq] = useState(false);
  const otp = useRef();
  const navigate = useNavigate();
  const UserData = useRef(null);
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: Captain._id });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const captainId = Captain._id;
            socket.emit("update-captain-location", {
              captainId,
              location: {
                lat,
                lng,
              },
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();
    socket.on("new-ride", (data) => {
      console.log(data);
      SetRideReq(true);
      UserData.current = data;
    });
  }, [Captain, socket]);
  const token = localStorage.getItem("token")
  const OnClickHandler = async () => {
      const setOtp = otp.current.value;
      const response = await axios.post("http://localhost:3000/captain/ride/start" , {
        rideId : UserData.current.newRide._id,
        otp : setOtp,
      },{
        headers : {Authorization : `Bearer ${token}`}
      })
      if(response.status==200){
        navigate("/captain/riding");
      }
      
  };
  const OnClickConfirmRide = async ()=>{
    SetConfirmRide(true)
    const response = await axios.post(
      "http://localhost:3000/captain/ride/confirm",
      {
        rideId: UserData.current.newRide._id, // replace `yourRideId` with the actual variable holding the ID
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  }
  
  return (
    <>
      <div className="bg-white flex  my-1.5 overflow-hidden">
        <div className="h-[530px] ml-4 overflow-hidden">
          <img src={map}></img>
        </div>
        {Ridereq && (
          <div className="border border-gray-300 mx-6 mt-2 p-3.5 shadow rounded-lg w-1/3 overflow-y-scroll h-[530px]">
            {!confirmRide && (
              <>
                <h1 className="font-bold text-3xl ">
                  You have a New Ride request !
                </h1>
                <div className="bg-[#ffa500] flex justify-between items-center p-1.5 mt-8 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={dummyLady}
                      className="w-20 h-20 rounded-full"
                    ></img>
                    <p className="ml-1.5 font-medium text-xl capitalize">
                      {UserData.current.NewUser.userName}
                    </p>
                  </div>
                  <p className="text-lg font-medium">2.2km</p>
                </div>
                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                  <IoLocation className="h-5 w-5 mt-1" />
                  <p className="text-lg ">{UserData.current.newRide.pickup}</p>
                </div>
                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                  <MdOutlineLocationCity className="h-5 w-5 mt-1" />
                  <p className="text-lg ">
                    {UserData.current.newRide.destination}
                  </p>
                </div>
                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                  <MdOutlineCurrencyRupee className="h-5 w-5 mt-1" />
                  <p className="text-lg ">{UserData.current.newRide.fare}</p>
                </div>
                <button
                  className="w-full h-10 mt-6 rounded-lg text-lg font-medium bg-gray-400 cursor-pointer"
                  onClick={() => {
                    SetRideReq(false);
                  }}
                >
                  Igonre
                </button>
                <button
                  className="w-full h-10 mt-4 rounded-lg text-lg text-white font-medium bg-[#2ECC71] cursor-pointer"
                  onClick={() => OnClickConfirmRide()}
                >
                  Confirm
                </button>
              </>
            )}
            {confirmRide && (
              <>
                <div >
                  <p className="font-bold text-3xl ">Your Ride details</p>
                  <div className="bg-[#ffa500] flex justify-between items-center p-1.5 mt-8 rounded-lg">
                    <div className="flex items-center">
                      <img
                        src={dummyLady}
                        className="w-20 h-20 rounded-full"
                      ></img>
                      <p className="ml-1.5 font-medium text-xl capitalize">{UserData.current.NewUser.userName}</p>
                    </div>
                    <p className="text-lg font-medium">2.2km</p>
                  </div>
                  <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                    <IoLocation className="h-5 w-5 mt-1" />
                    <p className="text-lg ">{UserData.current.newRide.pickup}</p>
                  </div>
                  <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                    <MdOutlineLocationCity className="h-5 w-5 mt-1" />
                    <p className="text-lg ">{UserData.current.newRide.destination}</p>
                  </div>
                  <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                    <MdOutlineCurrencyRupee className="h-5 w-5 mt-1" />
                    <p className="text-lg ">{UserData.current.newRide.fare}</p>
                  </div>
                  <div className="flex space-x-1.5 mt-8 pb-2  border-gray-300 ">
                    <input type="number" placeholder="ENTER OTP" className="h-10 w-60 font-mono  bg-gray-200 shadow" ref={otp}></input>
                  </div>
                  <button
                    className="w-full h-10 mt-6 rounded-lg text-lg font-medium bg-red-400 cursor-pointer"
                    onClick={() => {
                      SetRideReq(false);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="w-full h-10 mt-4 rounded-lg text-lg text-white font-medium bg-[#2ECC71] cursor-pointer"
                    onClick={() => {
                      OnClickHandler();
                    }}
                  >
                    PickUp
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {!Ridereq && (
          <>
            <div className="flex flex-col m-8 w-1/3">
              <div className="border border-gray-400 shadow rounded-lg mb-4 w-full p-4">
                <p className="text-lg font-medium">You dont have any ride 😥</p>
              </div>
              <div className="border border-gray-400 shadow w-full rounded-lg p-5">
                <div className="m-1.5 bg-gray-200 shadow-2xl rounded-lg">
                  <p className="text-xl p-3 capitalize font-bold">
                    {Captain.captainName}
                  </p>
                </div>

                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                  <MdOutlineBookOnline className="h-5 w-5 mt-1" />
                  <p className="text-lg pl-4">Hours Offline</p>
                  <p className="text-lg pl-53">5</p>
                </div>
                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 border-gray-300 shadow-2xl">
                  <HiOutlineStatusOnline className="h-5 w-5 mt-1" />
                  <p className="text-lg pl-4">Hours Online</p>
                  <p className="text-lg pl-53">5</p>
                </div>
                <div className="flex space-x-1.5 mt-8 pb-2 border-b-2 mb-6 border-gray-300 shadow-2xl">
                  <FaCarAlt className="h-5 w-5 mt-1" />
                  <p className="text-lg pl-4 ">Total Rides</p>
                  <p className="text-lg pl-58">5</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Home;
