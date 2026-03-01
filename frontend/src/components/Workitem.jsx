import React, { useState } from 'react'

const Workitem = ({ svg, header, body }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div class="flex flex-col gap-4 items-center justify-around w-90 h-90 bg-white/40 shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-shadow ease-in-out" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
    >

        <div class={`flex items-center justify-center w-18 h-18 rounded-full bg-linear-to-b from-[#85D0E2] to-[#07C9D1] border-4 border-white transition-all duration-300 ease-in-out ${isHovered ? 'scale-110' : `scale-100`} `} >
            <img src={svg} alt="work1" class="w-10 h-10"></img>
        </div>
        <div class="flex flex-col gap-2">   
            <div class="text-2xl font-bold text-center">
                {header}
            </div>
            <div class="text-lg text-center text-[#0D182B80] font-medium">
                {body}
            </div>
        </div>
        
    </div>
  )
}

export default Workitem
