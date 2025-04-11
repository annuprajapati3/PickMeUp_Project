import { useState } from "react";
import { FaCarAlt} from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdCarCrash, MdDirectionsBus } from "react-icons/md";
import { BiSolidToggleRight } from "react-icons/bi";
import { BiSolidToggleLeft } from "react-icons/bi";
import Home from "./Home";
import Offline from "./Offline";
const Nav = () => {
  const [activeOption, setActiveOption] = useState("Ride");
  const[online , SetOnline] = useState(true)
  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-16 py-4">
        <div className="flex items-center space-x-20">
          <span className="text-3xl font-bold tracking-wide italic font-sans">GoPilot 🚀</span>
          <div className="flex space-x-5 mt-2">
            {[
              { name: "Ride Request", icon: <FaCarAlt className="text-xl" /> },
              { name: "Earning", icon: <RiMoneyRupeeCircleFill className="text-xl" /> },
            ].map((option) => (
              <div
                key={option.name}
                className="flex items-center space-x-2 group cursor-pointer"
                onClick={() => setActiveOption(option.name)}
              >
                {option.icon}
                <p
                  className={`font-semibold text-xl transition-all duration-200 ${
                    activeOption === option.name
                      ? "underline decoration-white decoration-2 underline-offset-12"
                      : "group-hover:underline decoration-white decoration-2 underline-offset-12"
                  }`}
                >
                  {option.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap">
            {online && (
              <>
              <p className="text-white mr-1 font-semibold mt-2">online</p>
              <BiSolidToggleRight className="h-10 w-16" onClick={()=>SetOnline(false)}/>
              </>
            )}
            {!online && (
              <>
               <p className="text-white mr-1 font-semibold mt-2">offline</p>
               <BiSolidToggleLeft className="h-10 w-16" onClick={()=>SetOnline(true)} />
              </>
            )}
          <button className="h-10 w-24 ml-2 bg-red-400 text-black text-lg font-medium shadow rounded-lg">Log out</button>
        </div>
      </nav>
      {online && (<Home></Home>)}
      {!online && (<><Offline></Offline></>)}
    </>
  );
};

export default Nav;