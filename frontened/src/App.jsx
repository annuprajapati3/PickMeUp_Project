import { Route, Routes } from "react-router-dom";
import Home from "./routersPages/Home";
import LoginPage from "./routersPages/LoginPage";
import CaptainLoginPage from "./routersPages/CaptainLoginPage";
import CaptainSignPage from "./routersPages/CaptainSignPage";
import UserSignPage from "./routersPages/UserSignPage";
import UserProtectWraaper from "./routersPages/userProtectWraaper";
import UserLogout from "./routersPages/UserLogout";
import CaptainProtectedWraper from "./routersPages/CaptainProtectedWraper";
import UserHome from "./routersPages/UserHome";
import CaptainHomePage from "./routersPages/CaptainHomePage";
import CaptainRidingPage from "./routersPages/CaptainRidingPage";
import UserRiddingPage from "./routersPages/UserRiddingPage";

const App = ()=>{
  return<>
    <Routes>
      <Route path="/" element = {<Home></Home>}></Route>
      <Route path="/login" element = {<LoginPage></LoginPage>}></Route>
      <Route path="/captain/login" element = {<CaptainLoginPage></CaptainLoginPage>}></Route>
      <Route path="/sign-in" element = {<UserSignPage></UserSignPage>}></Route>
      <Route path="/captain/sign-in" element = {<CaptainSignPage></CaptainSignPage>}></Route>
      <Route path="/home" element={<UserProtectWraaper><UserHome></UserHome></UserProtectWraaper>}></Route>
      <Route path="/user/logout" element={<UserProtectWraaper><UserLogout></UserLogout></UserProtectWraaper>}></Route>
      <Route path="/CaptainHome" element={<CaptainProtectedWraper><CaptainHomePage></CaptainHomePage></CaptainProtectedWraper>}></Route>
      <Route path="/captain/riding" element={<CaptainProtectedWraper><CaptainRidingPage></CaptainRidingPage></CaptainProtectedWraper>}></Route>
      <Route path="/user/riding" element={<UserProtectWraaper><UserRiddingPage></UserRiddingPage></UserProtectWraaper>}></Route>
    </Routes>
    
  </>
}
export default App;