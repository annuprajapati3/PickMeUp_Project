const Navbar = () => {
    return (
      <>
        <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-23 py-4">
          <div className="flex items-center">
            <span className="text-3xl font-bold fonr-mono italic tracking-wide">PickMeUp !</span>
            <ul className="flex space-x-4 font-semibold ml-15">
              <li className="cursor-pointer hover:text-gray-300">Ride</li>
              <li className="cursor-pointer hover:text-gray-300">Drive</li>
              <li className="cursor-pointer hover:text-gray-300">Business</li>
              <li className="cursor-pointer hover:text-gray-300">About</li>
            </ul>
          </div>
          <ul className="flex space-x-6 font-semibold">
            <li className="cursor-pointer hover:text-gray-300">Help</li>
            <li className="cursor-pointer hover:text-gray-300"><a href="/login">Login</a></li>
            <li className="cursor-pointer bg-white text-black px-4 py-1 rounded-full transition duration-200 hover:bg-gray-200">
              Signup
            </li>
          </ul>
  
        </nav>
      </>
    );
  };
  
  export default Navbar;
  