import { useContext, useState } from "react";
import { CaptainData } from "../../context/CaptainContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const CaptainSign = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [DL, setDL] = useState("");
  const [VName, setVName] = useState("");
  const [VModel, setVModel] = useState("");
  const [VColor, setVCOlor] = useState("");
  const [VNumber, setVNumber] = useState("");
  const [VCapacity, setVCapacity] = useState("2");
  const [VType, setVType] = useState("car");
  const { Captain, SetCaptain } = useContext(CaptainData);
  const navigate = useNavigate();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      captainName: username,
      email: email,
      password: password,
      drivingLicence: DL,
      vehical: {
        vName: VName,
        vColor: VColor,
        vNumber: VNumber,
        vType: VType,
        vModel: VModel,
        vCapacity: VCapacity,
      },
    };
    const response = await axios.post(
      "http://localhost:3000/captainRegister",
      newCaptain
    );
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      SetCaptain(data);
      navigate("/CaptainHome");
    }
  };
  return (
    <>
      <nav className="bg-[#2ECC71] text-white flex items-center justify-between px-23 py-4">
        <span className="text-3xl font-bold tracking-wide italic font-sans">GoPilot 🚀</span>
      </nav>
      <div className="flex flex-col p-4 w-100  my-14 justify-center border border-gray-300 rounded-lg shadow mx-110">
        <h3 className="text-xl  mb-3">What's your CaptainName ?</h3>
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

          <h3 className="text-xl  mb-3"> Driving Licence</h3>
          <input
            placeholder="Driving Licence"
            value={DL}
            required
            type="text"
            className="mb-4 w-full h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
            onChange={(e) => setDL(e.target.value)}
          ></input>

          <h3 className="text-xl  mb-3">vehical</h3>
          <div className="flex flex-wrap space-x-2.5 w-full">
            <input
              placeholder="Vehical Name"
              value={VName}
              required
              type="text"
              className="mb-4 w-1/2 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
              onChange={(e) => setVName(e.target.value)}
            ></input>
            <input
              placeholder="Vehical Color"
              value={VColor}
              required
              type="text"
              className="mb-4 w-40 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
              onChange={(e) => setVCOlor(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-wrap space-x-2.5 w-full">
            <input
              placeholder="Vehical Number"
              value={VNumber}
              required
              type="text"
              className="mb-4 w-1/2 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
              onChange={(e) => setVNumber(e.target.value)}
            ></input>
            <input
              placeholder="Vehical Model"
              value={VModel}
              required
              type="text"
              className="mb-4 w-40 h-8 bg-gray-200 rounded-md placeholder:ml-4 placeholder:text-gray-500 border border-gray-300 px-4"
              onChange={(e) => setVModel(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-wrap space-x-2 w-full">
            <label
              htmlFor="VCapcity"
              className="w-1/2 h-8 bg-gray-200 rounded-md border border-gray-300 px-4 flex items-center text-gray-600"
            >
              Vehicle Capacity:
            </label>
            <select
              name="VCapacity"
              id="VCapacity"
              value={VCapacity}
              onChange={(e) => {
                console.log(e.target.value);
                setVCapacity(e.target.value);
              }}
              className="w-1/3 h-8 bg-gray-200 rounded-md border border-gray-300 px-4 text-gray-700 placeholder:text-gray-400"
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="flex flex-wrap space-x-2 w-full mt-2">
            <label
              htmlFor="VType"
              className="w-1/2 h-8 bg-gray-200 rounded-md border border-gray-300 px-4 flex items-center text-gray-600"
            >
              Vehicle Type:
            </label>
            <select
              name="VType"
              id="VType"
              value={VType}
              onChange={(e) => {
                console.log(e.target.value);
                setVType(e.target.value);
              }}
              className="w-1/3 h-8 bg-gray-200 rounded-md border border-gray-300 px-4 text-gray-700 placeholder:text-gray-400"
            >
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="motorCycle">motorCycle</option>
            </select>
          </div>
          <button className="ml-22 mt-5 w-40 h-10 bg-amber-500 text-xl font-semibold  rounded-md text-white">
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
export default CaptainSign;
