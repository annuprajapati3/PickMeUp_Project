const Navbar2 = ()=>{
    return <>
    <nav className="flex flex-wrap justify-between bg-white text-black  items-center px-23 py-4">
        <span className="text-2xl font-bold tracking-wide">Ride</span>
        <ul className="flex flex-wrap space-x-5 text-gray-500">
            <li className=" cursor-pointer hover:text-black">Request a ride</li>
            <li className=" cursor-pointer hover:text-black">Reserve a ride</li>
            <li className=" cursor-pointer hover:text-black">See Prices</li>
            <li className=" cursor-pointer hover:text-black">Explore ride options</li>
            <li className=" cursor-pointer hover:text-black">Airpodes rides</li>
        </ul>
    </nav>
    </>
}
export default Navbar2