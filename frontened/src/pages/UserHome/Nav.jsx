import { useState } from "react";
import { FaCarAlt, FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { MdCarCrash, MdDirectionsBus } from "react-icons/md";

const Nav = () => {
  const [activeOption, setActiveOption] = useState("Ride");

  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-20 py-4">
        <div className="flex items-center space-x-20">
          <span className="text-3xl font-bold tracking-wide font-sans italic">PickmeUp !</span>
          <div className="flex space-x-5 mt-2">
            {[
              { name: "Ride", icon: <FaCarAlt className="text-xl" /> },
              { name: "Courier", icon: <FaBoxOpen className="text-xl" /> },
              { name: "Rentals", icon: <MdCarCrash className="text-xl" /> },
              { name: "Shuttle", icon: <MdDirectionsBus className="text-xl" /> },
            ].map((option) => (
              <div
                key={option.name}
                className="flex items-center space-x-1 group cursor-pointer"
                onClick={() => setActiveOption(option.name)}
              >
                {option.icon}
                <p
                  className={`font-semibold text-lg transition-all duration-200 ${
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
        <div>
          <FaUserCircle className="text-4xl mt-2 text-black" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
