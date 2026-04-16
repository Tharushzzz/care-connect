import { useState } from 'react'

const Workitem = ({ svg, header, body } : { svg: string; header: string; body: string }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center justify-around md:w-90 md:h-90 bg-white/40 shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-shadow ease-in-out" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
    >

        <div className={`flex items-center justify-center w-18 h-18 rounded-full bg-linear-to-b from-[#85D0E2] to-[#07C9D1] border-4 border-white transition-all duration-300 ease-in-out ${isHovered ? 'scale-110' : `scale-100`} `} >
            <img src={svg} alt="work1" className="w-10 h-10"></img>
        </div>
        <div className="flex flex-col gap-2">   
            <div className="text-2xl font-bold text-center">
                {header}
            </div>
            <div className="text-lg text-center text-[#0D182B80] font-medium">
                {body}
            </div>
        </div>
        
    </div>
  )
}

export default Workitem
