
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SignupInputs from "../components/Signup/SignupInputs";
import signupimage from "../assets/signup/signup.jpg";
import findworkimage from "../assets/signup/findwork.jpg";

const Signup = () => {
  const location = useLocation();
  const initialRole = (location.state?.role as 'family' | 'caregiver') || 'family';
  const [role, setRole] = useState<'family' | 'caregiver'>(initialRole);

  const isCaregiver = role === 'caregiver';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side: Image Card */}
        <div
          className={`w-full lg:w-1/2 hidden md:block relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto ${
            isCaregiver ? 'lg:h-[960px]' : 'lg:h-[720px]'
          } transition-all duration-500 ease-in-out`}
        >
          <img
            src={isCaregiver ? findworkimage : signupimage}
            alt={isCaregiver ? "Caregiver consulting with elderly patient" : "CareConnect Caregiver assisting elderly patient"}
            className="w-full h-full object-cover object-center rounded-3xl sm:rounded-[36px] transition-all duration-500"
          />
          {/* Quote overlay at the bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 pt-20 text-white rounded-b-3xl sm:rounded-b-[36px] transition-opacity duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2 drop-shadow-sm">
              Join our community of compassionate care.
            </h2>
            <p className="text-base sm:text-lg font-normal leading-relaxed text-white/90 drop-shadow-sm">
              Whether you're looking for trusted help for a loved one, or seeking meaningful work as a caregiver, you belong here.
            </p>
          </div>
        </div>

        {/* Right side: Signup Inputs Form */}
        <div className="w-full lg:w-1/2 flex items-center lg:justify-end">
          <SignupInputs role={role} onRoleChange={setRole} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
