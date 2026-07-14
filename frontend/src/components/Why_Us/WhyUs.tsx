import whyus from "../../assets/whyus.png";
import { ShieldCheck, Clock, CreditCard, Heart,  } from 'lucide-react';
import WhyUsItem from "./WhyUsItem";

const WhyUs = () => {


  const OurKeyBenefits = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Strictly Vetted Professionals",
      description: "Identity verification, criminal record checks, and certification validation for every caregiver."
    },
    {
      id: 2,
      icon: Clock,
      title: "24/7 Support Team",
      description: "Our dedicated care team is available around the clock to handle emergencies or questions."
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Secure & Transparent Billing",
      description: "No hidden fees. Automated payments only released when you are satisfied with the service."
    },
    {
      id: 4,
      icon: Heart,
      title: "Compassionate Match Guarantee",
      description: "If you don't connect with your caregiver, we'll find you a replacement immediately at no extra cost."
    }

  ];

  return (
    <section className="flex flex-col lg:flex-row gap-3 items-center justify-center bg-linear-to-b from-[#F4FEFF] to-[#d0eeee] lg:min-h-158 py-10 lg:py-0">

      {/* Left Content */}
        <div className="flex relative lg:w-2/5 h-full items-center justify-end lg:pr-15 order-2 lg:order-1 py-20 ml-25">
            <img src={whyus} alt="Why Us" className="object-cover p-4 lg:p-0 lg:h-[90%]" />

            <div className="flex flex-col lg:p-5 p-3 pl-6 w-74 lg:h-30 h-24 lg:gap-2 absolute bg-white rounded-xl shadow-lg shadow-black bottom-17.5 right-0  lg:bottom-4 lg:right-6">
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
        <div className="flex flex-col lg:w-1/2 h-full p-7 px-10 order-1 lg:order-2">
          <div className="flex flex-col gap-2 mb-8">
            <div className="text-[#3386B0] text-xl font-semibold">Why Families Trust Us</div>
            <div className="text-3xl text-black font-semibold">Peace of Mind is Our Priority</div>
            <div className="text-[15px] text-[#00000099] font-medium md:w-4/5 mt-1">We understand that inviting someone to care for your family is a big decision. That's why we've built a platform centered around safety, transparency, and reliability.</div>
          </div>

          <div className="flex flex-col gap-4">
              {OurKeyBenefits.map(benefit => (
                <WhyUsItem icon={benefit.icon} title={benefit.title} description={benefit.description} key={benefit.id}></WhyUsItem>
              ) )}
          </div>
        </div>


    </section>
  )
}

export default WhyUs
