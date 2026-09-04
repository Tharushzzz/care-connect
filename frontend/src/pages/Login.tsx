import LoginInputs from "../components/Login/LoginInputs"
import loginimage from "../assets/login/login.jpg"

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side: Login Inputs Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-top">
          <LoginInputs />
        </div>

        {/* Right side: Image Card with Rounded Corners & Overlay Testimonial */}
        <div className="w-full lg:w-1/2 hidden md:block relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[680px]">
          <img
            src={loginimage}
            alt="CareConnect Caregiver assisting elderly patient"
            className="w-full h-full object-cover object-top rounded-3xl sm:rounded-[36px]"
          />
          {/* Quote overlay at the bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-[#0686CD]/80 backdrop-blur-md p-6 sm:p-8 text-white rounded-b-3xl sm:rounded-b-[36px] border-t border-white/20">
            <p className="text-lg sm:text-xl font-medium leading-relaxed">
              "CareConnect gave us peace of mind when we needed it most. The caregivers are incredibly professional and truly compassionate."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
