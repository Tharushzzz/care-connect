
import type { LucideIcon } from 'lucide-react'

const ServicesItem = ({ icon: Icon, header, description } : { icon: LucideIcon; header: string; description: string }) => {
  return (
    <div className="flex flex-col gap-4 w-106 h-80.5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow ease-in-out cursor-pointer">
        <div className='pb-5'>
            <Icon size={50} className="text-[#0686CD] bg-[#f0f7ff] p-2 rounded-xl" />
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
