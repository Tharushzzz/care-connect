import logo from "../../assets/logo/Logo.svg";


const Footer = () => {
  return (
    <div className="flex w-full h-80 bg-[#0F172A]">
        
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10 lg:gap-20  p-10 text-white">

        {/* left two columns */}
        <div className="flex flex-col lg:flex-row  items-center justify-center gap-10 lg:gap-20 ">
            {/* first column */}
            <div className="flex flex-col gap-5 w-50">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="rounded-lg w-10 h-10" />
                    <div className="text-xl font-semibold">CareConnect</div>
                </div>
                <div className="text-[#FFFFFFB2]">
                    Empowering families with trusted,
                    professional care for their loved
                    ones.Compassion meets
                    technology.
                </div>
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M22.5 2.5H18.75C17.0924 2.5 15.5027 3.15848 14.3306 4.33058C13.1585 5.50269 12.5 7.0924 12.5 8.75V12.5H8.75V17.5H12.5V27.5H17.5V17.5H21.25L22.5 12.5H17.5V8.75C17.5 8.41848 17.6317 8.10054 17.8661 7.86612C18.1005 7.6317 18.4185 7.5 18.75 7.5H22.5V2.5Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M27.5 5.00003C27.5 5.00003 26.625 7.62503 25 9.25003C27 21.75 13.25 30.875 2.5 23.75C5.25 23.875 8 23 10 21.25C3.75 19.375 0.625 12 3.75 6.25003C6.5 9.50003 10.75 11.375 15 11.25C13.875 6.00003 20 3.00003 23.75 6.50003C25.125 6.50003 27.5 5.00003 27.5 5.00003Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M21.25 2.5H8.75C5.29822 2.5 2.5 5.29822 2.5 8.75V21.25C2.5 24.7018 5.29822 27.5 8.75 27.5H21.25C24.7018 27.5 27.5 24.7018 27.5 21.25V8.75C27.5 5.29822 24.7018 2.5 21.25 2.5Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20 14.2124C20.1543 15.2527 19.9766 16.3152 19.4922 17.2487C19.0078 18.1822 18.2414 18.9392 17.302 19.412C16.3626 19.8848 15.2981 20.0494 14.2597 19.8823C13.2214 19.7152 12.2622 19.225 11.5185 18.4813C10.7749 17.7377 10.2847 16.7785 10.1176 15.7402C9.9505 14.7018 10.1151 13.6373 10.5879 12.6979C11.0607 11.7585 11.8177 10.9921 12.7512 10.5077C13.6847 10.0233 14.7472 9.84562 15.7875 9.99989C16.8487 10.1572 17.8311 10.6517 18.5896 11.4103C19.3482 12.1688 19.8426 13.1512 20 14.2124Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.875 8.125H21.8878" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M20 10C21.9891 10 23.8968 10.7902 25.3033 12.1967C26.7098 13.6032 27.5 15.5109 27.5 17.5V26.25H22.5V17.5C22.5 16.837 22.2366 16.2011 21.7678 15.7322C21.2989 15.2634 20.663 15 20 15C19.337 15 18.7011 15.2634 18.2322 15.7322C17.7634 16.2011 17.5 16.837 17.5 17.5V26.25H12.5V17.5C12.5 15.5109 13.2902 13.6032 14.6967 12.1967C16.1032 10.7902 18.0109 10 20 10Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.5 11.25H2.5V26.25H7.5V11.25Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 7.5C6.38071 7.5 7.5 6.38071 7.5 5C7.5 3.61929 6.38071 2.5 5 2.5C3.61929 2.5 2.5 3.61929 2.5 5C2.5 6.38071 3.61929 7.5 5 7.5Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </div>
            </div>

            {/* second column */}
            <div className="flex flex-col gap-5 w-50">
                <div className="text-lg font-semibold">
                    Quick Links
                </div>
                <div className="flex flex-col gap-3 text-[#FFFFFFB2] mb-7">
                    <div>How it Works</div>
                    <div>Services</div>
                    <div>Why Us</div>
                    <div>Find Caregiver</div>
                </div>
            </div>
        </div>

        {/* right column */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 text-white">
            <div className="flex flex-col gap-5 w-50">
                <div className="text-lg font-semibold">Services</div>
                <div className="flex flex-col gap-3 text-[#FFFFFFB2]">
                    <div>Home Nursing</div>
                    <div>Hospital Support</div>
                    <div>Elderly Companionship</div>
                    <div>Physiotherapy</div>
                    <div>Dementia Care</div>
                </div>
            </div>

            <div className="flex flex-col gap-5 w-50">
                <div className="text-lg font-semibold">Contact Us</div>
                <div className="flex flex-col gap-3 text-[#FFFFFFB2]">
                    <div>123 Care Street</div>
                    <div>City, State 12345</div>
                    <div>Phone: (123) 456-7890</div>
                    <div>Email: info@careconnect.com</div>
                </div>
            </div>
        </div>
      </div>


      <div></div>
    </div>
  )
}

export default Footer
