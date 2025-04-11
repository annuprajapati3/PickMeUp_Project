import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";

import axios from "axios";
const UserSign = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserDataContext);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      userName: username,
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/userRegistration",
      newUser
    );
    if (response.status == 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      console.log(data);
      setUser(data.user);
      navigate("/home");
    }
    setemail("");
    setpassword("");
    setusername("");
  };
  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-23 py-4">
        <span className="text-3xl font-bold tracking-wide font-sans italic">
          PickMeUp !
        </span>
      </nav>
      <div className="flex flex-col p-6 w-100  my-14 justify-center  mx-125 border border-gray-200 shadow rounded-lg">
        <h3 className="text-xl  mb-3">What's your username ?</h3>
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <input
            placeholder="username"
            value={username}
            required
            type="text"
            className="mb-4 w-full h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <h3 className="text-xl  mb-3">What's your email ?</h3>
          <input
            placeholder="example@email.com"
            value={email}
            required
            type="email"
            className="mb-4 w-full h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => setemail(e.target.value)}
          ></input>

          <h3 className="text-xl  mb-3">What's your password ?</h3>
          <input
            placeholder="a-z/@#A-Z;1-0"
            value={password}
            required
            type="password"
            className="mb-4 w-full h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <button className="ml-22 mt-5 w-40 h-10 bg-amber-500 font-semibold text-xl cursor-pointer rounded-md text-white">
            Sign Up
          </button>
        </form>
        <div class="flex items-center mt-6">
          <div class="flex-1 border-t border-gray-400"></div>
          <span class="mx-2 text-gray-600">or</span>
          <div class="flex-1 border-t border-gray-400"></div>
        </div>
        <p className="ml-2">
          Already have account ?{" "}
          <a href="/login" className="text-blue-500">
            Login to your account{" "}
          </a>
        </p>
        <p className="text-xs my-8 ml-2">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </>
  );
};
export default UserSign;
