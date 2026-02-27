import React from 'react'
import logo1 from '../assets/logo1.png';


function Header() {
  return (
    <header>
        <nav class="flex bg-[#F7FBFE] p-2.5 items-center justify-between drop-shadow-lg">
            <div class="flex items-center gap-2 pl-3">
                <div class="w-9 h-9">     
                    <img src={logo1} alt="Logo" class="rounded-lg" />
                </div>
                <div class="text-lg font-semibold select-none">
                  CareConnect
                </div>
            </div>

            <div class="flex items-center justify-center gap-10 text-lg select-none">
              <div class="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">How it Works</div>
              <div class="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Services</div>
              <div class="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Why Us</div>
              <div class="cursor-pointer text-black/75 hover:text-[#0686CD] transition-colors ease-in-out delay-100">Find Caregiver</div>
            </div>

            <div class="flex items-center justify-center gap-4 pb-0.5 pr-3 select-none">
              <div class="bg-[#E2F1FF] p-1.5 px-4 rounded-xl text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0686CD] transition-colors ease-in-out">
                Log In
              </div>

              <div class="bg-[#0686CD] p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75">
                Get Started
              </div>

            </div>
        </nav>
    </header>
  )
}

export default Header
