import HomeSection from '../pages/home/HomeSection';
import Navbar from '../pages/home/Navbar';
import Navbar2 from '../pages/home/Navbar2';
import Suggestions from '../pages/home/Suggestions';

const Home = ()=>{
  return  <>
  <div className="bg-white h-auto w-full overflow-hidden">
    <Navbar/>
    <Navbar2></Navbar2>
    <HomeSection></HomeSection>
    <Suggestions></Suggestions>
  </div>
  </>
}
export default Home