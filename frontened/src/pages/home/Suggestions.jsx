import SComponent from "./SComponent";
import Courier from '../../assets/Courier.png';
import reserve_clock from '../../assets/reserve_clock.png';
import ride from '../../assets/ride.png';
const Suggestions = () => {
  return (
    <>
      <div className="px-26 py-2 ">
        <h1 className="font-bold text-4xl text-balck tracking-wide">
          Suggestions
        </h1>
        <div className="flex flex-wrap space-x-3 mt-10">
          <div><SComponent head = {"Courier"} text = {"Uber makes same-day item delivery easier then ever"} images={Courier}></SComponent></div>
          <div><SComponent head = {"Reserve"} text = {"reserve your ride in advance so you can realx on the day of your trip"} images={reserve_clock}></SComponent></div>
          <div><SComponent head = {"Ride"} text = {"Go anywhere with uber . Request a ride , hop in ,and go"} images={ride}></SComponent></div>
        </div>
      </div>
    </>
  );
};
export default Suggestions;
