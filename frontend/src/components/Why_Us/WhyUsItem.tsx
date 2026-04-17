import type { LucideIcon } from 'lucide-react'

const WhyUsItem = ({ icon: Icon, title, description }:{ icon: LucideIcon; title: string; description: string }) => {
  return (
    <div className="flex gap-3.5 items-start ">
        <div className="flex justify-center items-center bg-white p-1.5 rounded-full">
            <Icon size={30} color="#3D92B9" stroke-width="2px" />
        </div>
        <div className="flex flex-col gap-1">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-[16px] text-[#000000B2] font-medium leading-6 w-5/6">{description}</div>
        </div>
    </div>
  )
}

export default WhyUsItem
