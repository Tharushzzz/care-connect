import whyus from "../../assets/whyus.png";
import { ShieldCheck } from 'lucide-react';

const WhyUs = () => {
  return (
    <section className="flex gap-3 items-center justify-center bg-linear-to-b from-[#F4FEFF] to-[#d0eeee] h-[91vh]">

      {/* Left Content */}
        <div className="flex relative w-1/2 h-full items-center justify-end pr-15">
            <img src={whyus} alt="Why Us" className="object-cover h-[90%]" />

            <div className="flex flex-col p-5 pl-6 w-74 h-30 gap-2 absolute bg-white rounded-xl shadow-lg shadow-black  bottom-4 right-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={26} color="#16B8A6" stroke-width="3px" /> 
                    <div className="font-semibold text-xl">100% Verified</div>
                </div>
                <div className="text-[14px] font-normal flex justify-end text-black pl-8">
                  Every caregiver undergoes a rigorous 7-step background check.
                </div>
            </div>
        </div>

      {/* Right Content */}
        <div className="flex w-1/2 h-full border-2">
          
        
        </div>


    </section>
  )
}

export default WhyUs
