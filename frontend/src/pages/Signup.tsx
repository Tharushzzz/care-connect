
import SignupInputs from "../components/Signup/SignupInputs"
import signupimage from "../assets/signup/signup.jpg"

const Signup = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side: Image Card */}
        <div className="w-full lg:w-1/2 hidden md:block relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[720px]">
          <img
            src={signupimage}
            alt="CareConnect Caregiver assisting elderly patient"
            className="w-full h-full object-cover object-top rounded-3xl sm:rounded-[36px]"
          />
          {/* Quote overlay at the bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm p-6 sm:p-8 text-white rounded-b-3xl sm:rounded-b-[36px]">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
              Join our community of compassionate care.
            </h2>
            <p className="text-base sm:text-lg font-normal leading-relaxed text-white/90">
              Whether you're looking for trusted help for a loved one, or seeking meaningful work as a caregiver, you belong here.
            </p>
          </div>
        </div>


        {/* Right side: Signup Inputs Form (Swapped for Signup) */}
        <div className="w-full lg:w-1/2 flex items-center lg:justify-end">
          <SignupInputs />
        </div>
      </div>
    </div>
  )
}

export default Signup
