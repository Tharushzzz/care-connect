
import right from "../assets/right.svg";
import correct from "../assets/correct.svg";
import hero from "../assets/hero.png";
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg"; 

const Herosection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:px-20 lg:py-24 bg-linear-to-b from-[#FDFEFF] to-[rgba(66,161,153,0.35)]">
      <div className="flex flex-col gap-2 lg:w-1/2    lg:justify-end h-full mt-10 ml-10 ">
        <div className="flex items-center gap-2 bg-[#e2f1fc] rounded-3xl w-max px-3 py-0.5">
          <div>
            <div className="h-2 w-2 animate-ping rounded-full bg-[#15aaec] opacity-75 absolute"></div>
            <div className="relative h-2 w-2 rounded-full bg-[#15aaec]"></div>
          </div>
          <span className="text-[#5cabc9] font-semibold">
            #1 Trusted Caregiver Platform
          </span>
        </div>
        <div className="text-4xl font-bold text-[#0D182B]">Compassionate Care,</div>

        <div className="text-[#0686CD] text-3xl md:text-5xl lg:text-4xl font-semibold md:mr-35 lg:w-100 ">
          When Your Family Needs it Most
        </div>
        <div className="md:text-lg w-4/5 mt-7">
          When a loved one is in the hospital or recovering at home, finding
          reliable support shouldn't be another worry. Instantly hire trusted,
          background-checked caregivers to be there when you can't.
        </div>
        <div className="flex flex-col w-full lg:flex-row  items-center gap-3 mt-5">
          <div className="flex items-center bg-[#0686CD] w-full justify-center lg:w-max p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75">
            Find a Caregiver <img src={right} alt="right arrow" className="ml-2 w-4 h-4"></img>
          </div>
          <div className="flex bg-[#E2F1FF] p-1.5 px-4 w-full justify-center lg:w-max rounded-xl border border-[#0071A8] text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0686CD] transition-colors ease-in-out">
            Become a Caregiver
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <img src={correct} alt="correct icon"></img>
            <span>Verified Pros</span>
          </div>

          <div className="flex items-center gap-1">
            <img src={correct} alt="correct icon"></img>
            <span>24/7 Support</span>
          </div>

          <div className="flex items-center gap-1">
            <img src={correct} alt="correct icon"></img>
            <span>Secure Booking</span>
          </div>
          
        </div>
      </div>

      <div className="lg:w-1/2 h-full flex flex-col items-center justify-end">

        <div className="relative w-full h-full flex items-end justify-center">
            <img src={hero} alt="hero image" className="object-cover rounded-[30px] relative top-6"></img>

            <div className="bg-[#F1F8FF] rounded-3xl w-[90%]  h-18 absolute flex items-center pl-4">
                <img src={Ellipse1} alt="ellipse1" className="w-12 h-12 "></img>
                <img src={Ellipse2} alt="ellipse2" className="w-12 h-12 relative right-4"></img>
                <img src={Ellipse3} alt="ellipse3" className="w-12 h-12 relative right-7"></img>
                <div className="w-12 h-12 rounded-full relative right-12 bg-[#D9D9D9]  flex items-center justify-center">
                    <span className="text-[#00000099] font-semibold text-[14px]">+2K</span>
                </div>

                <div className="flex flex-col right-8 relative">
                    <div className="font-medium text-[16px]">Trusted by Families</div>
                    <div className="text-[#00000066] text-[14px] font-normal">Rated 4.9/5 stars</div>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Herosection;
