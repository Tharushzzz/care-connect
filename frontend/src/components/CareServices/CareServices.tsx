import ServicesItem from "./ServicesItem"
import { Bed } from 'lucide-react';

const CareServices = () => {

  const servicesData = [
    {
      id: 1,
      icon: Bed,
      header: "Hospital Bedside Care",
      description: "Dedicated caregivers to stay by the bedside, monitor vitals, advocate for the patient, and provide companionship during hospital stays."
    }
  ]

  return (
    <section className='flex flex-col py-10 bg-linear-to-b from-white to-[#A5CACA]'>
        <div className="flex flex-col justify-center pl-20 py-10 gap-5">
            <h1 className="font-bold text-4xl">Comprehensive Care Services</h1>
            <p className="text-lg text-[#0D182B99] font-medium w-2/3">Our network of professionals covers a wide range of needs, ensuring your family member receives specialized attention tailored to their condition.</p>
        </div>

        <div className="flex justify-center items-center gap-10 flex-wrap">
            {servicesData.map(service => (
              <ServicesItem icon={service.icon} header={service.header} description={service.description} key={service.id}></ServicesItem>
            ))}
        </div>
    </section>
  )
}


export default CareServices
