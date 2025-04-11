import map from "../../assets/google.jpg";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { MdStopCircle } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { GrSquare } from "react-icons/gr";
import { useContext, useEffect, useRef, useState } from "react";
import RecommendedVehical from "./RecommendedVehicals";
import UberCar from "../../assets/uberCar.webp";
import UberMotor from "../../assets/uberMotor.webp";
import UberAuto from "../../assets/UberAuto.webp";
import { IoIosArrowDown } from "react-icons/io";
import { useSocket } from '../../context/SocketContex';
import {UserDataContext} from '../../context/UserContext';
import driverimage from '../../assets/driverimage.webp';
import { useNavigate } from "react-router-dom";
const Body = () => {
  const [ride, Setride] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [Destination, SetDestination] = useState("");
  const [showVehical, SetshowVehical] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ConfirmRide, SetConfirmRide] = useState(false);
  const [showpickup, SetShowpickUp] = useState(false);
  const [showDest, SetShowDest] = useState(false);
  const [pickupSuggestions, SetPickupSuggestions] = useState([]);
  const [destinationSuggestions, SetdestinationSuggestions] = useState([]);
  const [CaptainConfirm , SetCaptainConfirm] = useState(false);
  const [fare , setfare] = useState([])
  const { socket } = useSocket();
  const {user} = useContext(UserDataContext)
  const CaptainData = useRef();
  const navigate = useNavigate();
  useEffect(()=>{
    socket.emit("join" , {userType : "user" , userId : user._id})
    socket.on('ride-confirm' , (data)=>{
      console.log(data);
      CaptainData.current = data;
      SetCaptainConfirm(true);
      console.log("CaptainData" , CaptainData)
    })
    socket.on("ride-start" ,(data)=>{
      console.log(data);
      navigate("/user/riding")
    })
    
  } ,[user , socket , navigate])

  

  const pickupdata = async (d) => {
    try {
      const response = await axios.get("http://localhost:3000/getSuggestion", {
        params: {address : d },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data)
      // Ensure correct data is stored in state
      SetPickupSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };
  const destinationdata = async (d) => {
    try {
      const response = await axios.get("http://localhost:3000/getSuggestion", {
        params: {address : d },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Ensure correct data is stored in state
      SetdestinationSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };
  const getfare = async () => {
    try {
        const pickup = ride;
        const dest = Destination;

        const response = await axios.get("http://localhost:3000/rideFare", {
            params: {
                pickup: pickup,
                destination: dest,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(response.data.fared);
        setfare(response.data.fared);
    } catch (error) {
        console.error("Error fetching ride fare:", error.response ? error.response.data : error.message);
    }
};

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    SetshowVehical(true);
    getfare();
  };
  const OnChangeHandler = (e) => {
    const inputValue = e.target.value;
    Setride(inputValue);
    SetShowpickUp(true);

    if (inputValue.length > 1) {
      pickupdata(inputValue); // Fetch suggestions dynamically
    }
  };
  const OnChangeDestination = (e) => {
    const inputdatadestination = e.target.value;
    SetShowDest(true);
    SetDestination(inputdatadestination);
    if(inputdatadestination.length >1){
        destinationdata(inputdatadestination)
    }
  };
  const OnclickRide = (e) => {
    SetShowpickUp(false);
    Setride(e);
  };
  const OnclickDest = (e) => {
    SetShowDest(false);
    SetDestination(e);
  };
  const createRide = async ()=>{
    const vType = selectedIndex.tile;
    const response = await axios.post("http://localhost:3000/rideDetails",{
        pickup:ride,
        destination : Destination,
        vType,
    },{
        headers:{
            Authorization : `bearer ${localStorage.getItem("token")}`
        }
    })
    console.log(response.data)
  }
  const Ubervehicals = [
    {
      tile: "Car",
      image: UberCar,
      capaccity: " 4",
      price: `₹ ${fare.Car ?? 0}`,
    },
    {
      tile: "Motor",
      image: UberMotor,
      capaccity: "1",
      price: `₹ ${fare.Motor ?? 0}`,
    },
    {
      tile: "Auto",
      image: UberAuto,
      capaccity: " 3",
      price: `₹ ${fare.Auto ?? 0}`,
    },
  ];
  const CreateRidehandler = ()=>{
    createRide();
    SetConfirmRide(true);
  }
  return (
    <>
      <div className="bg-white mt-1 flex h-auto transition-all duration-500">
        <div
          className={`transition-all duration-500 ${
            showVehical && !clicked
              ? "w-[1500px] bg-white h-auto ml-8 mt-8 mr-10"
              : "w-80 ml-10 mt-4 mr-10 h-72 flex flex-col border-[2px] border-gray-100 px-7 py-7 rounded-lg shadow-lg "
          } ${
            clicked
              ? "w-120 ml-10 mt-4 mr-10 h-auto flex flex-col border-[2px] border-gray-100 px-7 py-7 rounded-lg shadow-lg "
              : ""
          }
          `
        }
        >
          {!showVehical && !clicked && !ConfirmRide && !CaptainConfirm && (
            <>
              <h3 className="font-bold text-xl leading-none mb-8">
                Get a Ride
              </h3>
              <form
                className="mt-0 "
                onSubmit={(e) => {
                  OnSubmitHandler(e);
                }}
              >
                <div className="relative">
                  <div className="relative flex items-center w-full mb-4">
                    <MdStopCircle className="absolute left-3 text-black " />
                    <input
                      value={ride}
                      required="true"
                      placeholder="your location"
                      className="w-full pl-12 h-9 px-3 bg-gray-100 rounded-md"
                      type="text"
                      onChange={(e) => OnChangeHandler(e)}
                    ></input>
                    {showpickup && pickupSuggestions.length > 0 && (
                      <div className=" overflow-y-auto h-80 absolute top-12 left-0 w-full border border-gray-200 shadow-lg bg-white z-10 p-2 rounded-md">
                        {pickupSuggestions
                          .filter((suggestion) => suggestion.description) // Ensure description exists
                          .map((suggestion) => (
                            <div
                              key={suggestion.place_id}
                              className="p-1.5 rounded-xs border border-gray-300 bg-gray-200 shadow m-1.5 cursor-pointer"
                              onClick={() =>
                                OnclickRide(suggestion.description)
                              }
                            >
                              {suggestion.description}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="relative flex items-center w-full ">
                    <GrSquare className="absolute left-3 text-black " />
                    <input
                      value={Destination}
                      required="true"
                      placeholder="your Destination"
                      className="w-full pl-12 h-9 px-3 bg-gray-100 rounded-md"
                      type="text"
                      onChange={(e) => OnChangeDestination(e)}
                    ></input>
                    {showDest && destinationSuggestions.length > 0 && (
                      <div className="absolute top-12 left-0 w-full border border-gray-200 shadow-lg bg-white z-10 p-2 rounded-md overflow-y-auto h-80 ">
                        {destinationSuggestions
                          .filter((suggestion) => suggestion.description) // Ensure description exists
                          .map((suggestion) => (
                            <div
                              key={suggestion.place_id}
                              className="p-1.5 rounded-xs border border-gray-300 bg-gray-200 shadow m-1.5 cursor-pointer"
                              onClick={() =>
                                OnclickDest(suggestion.description)
                              }
                            >
                              {suggestion.description}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <button className="bg-amber-500 font-semibold text-xl cursor-pointer text-white h-10 w-60 rounded-sm mt-8">
                  Search
                </button>
              </form>
            </>
          )}
          {showVehical && !clicked && !ConfirmRide && !CaptainConfirm && (
            <>
              <div className="w-full h-[500px] p-4 overflow-y-auto">
                <h3 className="text-3xl font-bold flex">
                  Choose a Ride
                  <IoIosArrowDown
                    className="ml-3 cursor-pointer mt-2.5 text-2xl text-gray-500 font-bold"
                    onClick={() => {
                      SetshowVehical(false);
                    }}
                  />
                </h3>
                <div className="h-auto w-auto p-3  border border-gray-200 shadow rounded-lg flex space-x-2.5 items-center mt-7">
                  <p>{ride}</p>
                  <FaArrowRight className="text-4xl font-bold" />
                  <p>{Destination}</p>
                </div>
                <p className="text-2xl font-semibold mt-6">Recommended</p>
                <div className="flex flex-wrap mt-4">
                {Ubervehicals.map((item, index) => (
                    <RecommendedVehical
                    key={index}
                    title={item.tile}
                    image={item.image}
                    capacity={item.capaccity}
                    price={item.price}
                    isSelected={selectedIndex && selectedIndex.tile === item.tile} // Fix null handling
                    onClick={() => setSelectedIndex(selectedIndex?.tile === item.tile ? null : item)} // Toggle selection
                    />
                ))}
                  <div className="mt-4 ml-100">
                    <button
                      onClick={() => {
                        setClicked(true);
                      }}
                      className="bg-amber-500 cursor-pointer text-white font-semibold text-xl h-11 w-44 rounded-xs"
                    >
                      Request Go Uber
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {clicked && !ConfirmRide && !CaptainConfirm && (
            <>
            {console.log(selectedIndex)}
              <p className="text-2xl font-semibold">Your Ride is on the way</p>
              <div className="mt-10">
                <img className="h-28 w-42 ml-6" src={selectedIndex.image}></img>
              </div>
              <p className="mt-12 text-lg  items-center bg-gray-100 p-2 rounded-xs">
                {ride}
              </p>
              <p className="mt-3 text-lg  items-center bg-gray-100 p-2 rounded-xs">
                {Destination}
              </p>
              <p className="mt-3 text-xl font-medium items-center ">
                {selectedIndex.price}
              </p>
              <div className="flex justify-between mt-4 space-x-1">
                <button
                  className="w-35 h-12 bg-red-400 text-white font-medium cursor-pointer text-lg rounded-xl"
                  onClick={() => setClicked(false)}
                >
                  Cancel Ride
                </button>
                <button
                  className="w-35 h-12 bg-amber-500 text-white font-medium cursor-pointer text-lg rounded-xl"
                  onClick={() => CreateRidehandler()}
                >
                  Ready to Go
                </button>
              </div>
            </>
          )}
          {ConfirmRide && !CaptainConfirm && (
            <>
              <p className="text-2xl font-semibold">Looking for the driver</p>
              <div className="w-full h-1.5 bg-gray-200 mt-4 relative overflow-hidden rounded-full">
                <div className="h-full w-1/2 bg-blue-500 absolute animate-moving"></div>
              </div>
              <div className="mt-10">
                <img className="h-28 w-42 ml-6" src={selectedIndex.image}></img>
              </div>
              <p className="mt-12 text-lg  items-center bg-gray-100 p-2 rounded-xs">
                {ride}
              </p>
              <p className="mt-3 text-lg  items-center bg-gray-100 p-2 rounded-xs">
                {Destination}
              </p>
              <p className="mt-6 text-lg font-bold items-center ">
                {selectedIndex.price}
              </p>
            </>
          )}
          {CaptainConfirm && (
            <>
              <p className="text-2xl font-semibold">Meet at Your spot </p>
              <div className="mt-5">
                <img className="h-20 w-32 ml-6" src={selectedIndex.image}></img>
              </div>
              
              <div className="flex justify-between mt-3 bg-amber-200 p-2 rounded-lg align-middle">
                <img src={driverimage} className="h-16 w-16 rounded-4xl"></img>
                <div>
                  <p className="text-lg font-medium capitalize">{CaptainData.current.captain.captainName}</p>
                  <p>{CaptainData.current.captain.vehical.vNumber}</p>
                </div>
              </div>
              
              <p className="mt-5 text-lg  space-x-5 items-center bg-gray-100 p-2 rounded-xs">
                {CaptainData.current.otp}
              </p>
              <p className="text-lg p-1.5 text-[#2ECC71]">Share otp with your captain</p>
              <div className="flex align-middle mt-4">
                <GoDotFill className="mt-1.5"/>
                <p className="text-xl font-medium">Cash : ₹{CaptainData.current.fare}</p>
              </div>
              <p className="mt-8 text-xs">We assure you that your ride will be safe and you will reach to your destination on time</p>
            </>
          )}
        </div>
        <div className="h-[500px] w-full mt-4 mr-8 overflow-hidden">
          <img src={map} className="w-full h-full object-cover"></img>
        </div>
      </div>
    </>
  );
};
export default Body;
