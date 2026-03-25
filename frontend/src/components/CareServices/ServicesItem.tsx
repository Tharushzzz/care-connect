import { useState } from 'react';
import type { LucideIcon } from 'lucide-react'

const ServicesItem = ({ icon: Icon, header, description } : { icon: LucideIcon; header: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-106 h-80.5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow ease-in-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >



        <div className='pb-5'>
                        <Icon
                            size={60}
                            className={`p-3 rounded-xl ${isHovered ? 'text-white bg-[#0384c6]' : 'text-[#0686CD] bg-[#f0f7ff]'} transition-colors ease-in-out duration-300`}
                        />
        </div>
        <div className='font-semibold text-2xl'>
            {header}
        </div>
        <div className='text-xl font-medium text-[#0D182B80]'>
            {description}
        </div>
    </div>
  )
}

export default ServicesItem
