import { useContext, useState } from "react";
import { CaptainData } from "../../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { Captain, SetCaptain } = useContext(CaptainData);
  const navigate = useNavigate();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/captainLogin",
      captainData
    );
    if (response.status == 200) {
      SetCaptain(captainData);
      const data = response.data;
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/Captainhome");
    }
    setEmail("");
    setpassword("");
  };
  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-23 py-4">
      <span className="text-3xl font-bold tracking-wide italic font-sans">GoPilot 🚀</span>
        <button className="bg-white text-black h-8 w-35 pl-3 px-1 rounded-md flex flex-wrap">
          <a href="/login">Sign-in As user </a>
        </button>
      </nav>
      <div className="flex flex-col my-25 mx-[450px] justify-center w-90 p-5 rounded-lg border border-gray-200 shadow">
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
          <button className="ml-17 mt-5 w-40 h-10 bg-amber-500 font-semibold text-xl cursor-pointer rounded-md text-white">
            Login
          </button>
        </form>

        <div class="flex items-center mt-6">
          <div class="flex-1 border-t border-gray-400"></div>
          <span class="mx-2 text-gray-600">or</span>
          <div class="flex-1 border-t border-gray-400"></div>
        </div>
        <p className="ml-10">
          New Captain ?{" "}
          <a href="/captain/sign-in" className="text-blue-500">
            Create your Account{" "}
          </a>
        </p>
      </div>
    </>
  );
};
export default CaptainLogin;
