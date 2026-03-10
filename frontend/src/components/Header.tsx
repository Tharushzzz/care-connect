import React from 'react'
import logo1 from '../assets/logo1.png';


function Header() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <header className='sticky top-0 z-20'>
        <nav className="flex bg-[#F7FBFE] p-2.5 items-center justify-between drop-shadow-lg">
            <div className="flex items-center gap-2 pl-3">
                <div className="w-9 h-9">     
                    <img src={logo1} alt="Logo" className="rounded-lg" />
                </div>
                <div className="text-lg font-semibold select-none">
                  CareConnect
                </div>
            </div>

            {/* desktop menu */}
              <div className=" items-center justify-center gap-10 text-lg select-none hidden lg:flex">
                <div className="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">How it Works</div>
                <div className="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Services</div>
                <div className="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Why Us</div>
                <div className="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Find Caregiver</div>
              </div>

              <div className="items-center justify-center gap-4 pb-0.5 pr-3 select-none hidden sm:flex">
                <div className="bg-[#E2F1FF] p-1.5 px-4 rounded-xl text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0686CD] transition-colors ease-in-out">
                  Log In
                </div>

                <div className="bg-[#0686CD] p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75">
                  Get Started
                </div>

              </div>
            
            {/* menu icon */}
            <button onClick={() => setExpanded(!expanded)} className="w-9 h-9 mr-3 sm:hidden">
              {expanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="rgb(160, 164, 165)" d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="rgb(160, 164, 165)" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
              )}
            </button>

        </nav>
        {/* mobile menu */}
        <div
          className={
            `sm:hidden flex flex-col z-10 w-full items-start py-5 px-5 justify-center gap-3 text-lg text-[#5E656A] select-none bg-white absolute drop-shadow-lg rounded-bl-lg rounded-br-lg overflow-hidden transition-all ease-in-out duration-300` +
            (expanded ? ' opacity-0 pointer-events-none' : ' opacity-100 pointer-events-auto')
          }
          style={{maxHeight: expanded ? '0px' : '500px'}}
        >
          
          <div className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3"> How it Works </div>
          <div className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3"> Services </div>
          <div className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3"> Why Us </div>
          <div className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3"> Find Caregiver </div>
          
          <div className="bg-white border border-[#0686CD] w-full text-center p-1.5 px-4 rounded-xl text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0687cd] transition-colors ease-in-out">
            Log In
          </div>

          <div className="bg-[#0686CD] w-full text-center p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75">
            Get Started
          </div>
          

                
        </div>
    </header>
    

    
  )
}

export default Header
