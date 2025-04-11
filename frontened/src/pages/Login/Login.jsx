/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const userDetails = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/userLogin",
      userDetails
    );
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token" , data.token)
      setUser(data.user);
      
      navigate("/home");
    }else{
      console.log(response)
    }
    setEmail("");
    setpassword("");
  };
  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-23 py-4">
        <span className="text-3xl font-bold tracking-wide fonr-mono italic">PickMeUp !</span>
        <button className="bg-white text-black h-8 w-40 px-1 rounded-md flex flex-wrap">
          <a href="/captain/login" className="flex flex-wrap">
            Sign-in As captain <FaArrowRight className="mt-2 ml-2" />
          </a>
        </button>
      </nav>
      <div className="flex flex-col my-25 justify-center border border-gray-300 rounded-lg shadow p-4 mx-125">
        <h3 className="text-xl  mb-3">What's your email ?</h3>
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <input
            placeholder="examle@email.com"
            value={email}
            required
            type="email"
            className="mb-4 w-80 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <h3 className="text-xl  mb-3">What's your password ?</h3>
          <input
            placeholder="a-z/@#A-Z;1-0"
            value={password}
            required
            type="password"
            className="mb-4 w-80 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></input>
          <button className="ml-17 mt-5 w-40 h-10 bg-amber-500 text-xl font-semibold cursor-pointer rounded-md text-white">
            Login
          </button>
        </form>

        <div class="flex items-center mt-6">
          <div class="flex-1 border-t border-gray-400"></div>
          <span class="mx-2 text-gray-600">or</span>
          <div class="flex-1 border-t border-gray-400"></div>
        </div>
        <p className="ml-10">
          New User ?{" "}
          <a href="/sign-in" className="text-blue-500">
            Create your Account{" "}
          </a>
        </p>
      </div>
    </>
  );
};
export default Login
