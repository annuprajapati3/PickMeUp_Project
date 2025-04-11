import Taxi from "../../assets/Taxi-Safeguarding-Tips.webp";
import { FaCarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineBookOnline } from "react-icons/md";
import { CaptainData } from "../../context/CaptainContext";
import { useContext } from "react";
const Offline = () => {
  const { Captain } = useContext(CaptainData);
  return (
    <>
      <div className="flex space-x-4 overflow-hidden justify-between">
        <div className="border border-gray-300 items-center  shadow-lg rounded-lg mx-4 h-auto mt-4 p-4 w-1/3 overflow-hidden">
          <p className="text-2xl font-bold mb-4 pl-35 capitalize">{Captain.captainName}</p>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>email</p>
            <p>{Captain.email}</p>
          </div>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>Vehical No.</p>
            <p>{Captain.vehical.vNumber}</p>
          </div>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>Vehical Model </p>
            <p>{Captain.vehical.vModel}</p>
          </div>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>Driving Licence</p>
            <p>{Captain.drivingLicence}</p>
          </div>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>Type Of Vehical</p>
            <p>{Captain.vehical.vType}</p>
          </div>
          <div className="border-b-2 border-gray-200 shadow  mb-4 w-full p-4 flex justify-between">
            <p>Capacity of vehical</p>
            <p>{Captain.vehical.vCapacity}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4 w-1/3">
          <div className="border border-gray-200 shadow rounded-lg mb-4 w-full p-4">
            <p className="text-lg font-medium">
              You may have a ride , Go & check
            </p>
          </div>
          <div className="border border-gray-200 shadow w-full rounded-lg p-5">
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
        <div className="w-[370px] overflow-hidden mt-4 mr-9">
          <img src={Taxi} className="w-full overflow-hidden rounded-lg"></img>
        </div>
      </div>
    </>
  );
};
export default Offline;
