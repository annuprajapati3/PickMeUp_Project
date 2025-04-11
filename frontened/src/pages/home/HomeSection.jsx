import homePage from "../../assets/homePage.webp";
const HomeSection = ()=>{
    return <>
        <div className="flex flex-wrap py-19 px-22 justify-between">
            <div className="px-3 py-23">
                <h3 className="font-bold text-5xl tracking-wide">Request a Ride for</h3>
                <h3 className="font-bold text-5xl tracking-wide py-2">now or later</h3>
                <p className="text-lg mt-8">Add your trip details , hop in ,and go</p>
                <form>
                    <input className="w-100 bg-gray-200  h-11 rounded-md px-3 mt-5" placeholder="Enter Location" name="location"/><br></br>
                    <input className="w-100 bg-gray-200 h-11 rounded-md px-3 mt-3" placeholder="Enter destination" name="destination"/>
                </form>
                <button className="bg-[#2ECC71] text-white text-lg rounded-md h-13 w-35 mt-7">See Prices</button>
            </div>
            <div className=" mx-3">
                <img src={homePage} className="w-140 h-auto"/>
            </div>
        </div>
        </>
}
export default HomeSection;