import { useState } from "react";
import { FaUser } from "react-icons/fa";
const RecommendedVehical = ({ title, image, price, capacity,isSelected, onClick }) => {
    const[Click , SetClick] = useState(false);
  return (
    <>
      <div
      onClick={onClick} 
      className={`flex flex-wrap justify-between items-center p-2.5 w-full mb-4 border ${
        isSelected ? "border-black border-2" : "border-gray-200 rounded-2xl"
      } shadow  cursor-pointer transition-all`}>
        <div className="flex flex-wrap items-center ">
          <img className="h-28 w-38" src={image}></img>
          <div>
            <div className="flex flex-wrap">
              <p className="font-bold text-xl">{title}</p>
              <FaUser className="text-[10px] ml-4 mt-2.5 font-light" />
              <p className="text-xs ml-1 mt-2 ">{capacity}</p>
            </div>
            <p>4 min away</p>
            <p className="text-gray-400">Affordable comfortable rides</p>
          </div>
        </div>
        <div>
          <p className="mr-7 font-semibold text-xl">{price}</p>
        </div>
      </div>
      
    </>
  );
};
export default RecommendedVehical;
