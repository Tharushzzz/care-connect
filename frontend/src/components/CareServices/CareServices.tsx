import ServicesItem from "./ServicesItem"
import { Bed, Home, UserPlus, Pill, Accessibility } from 'lucide-react';

const CareServices = () => {

  const servicesData = [
    {
      id: 1,
      icon: Bed,
      header: "Hospital Bedside Care",
      description: "Dedicated caregivers to stay by the bedside, monitor vitals, advocate for the patient, and provide companionship during hospital stays."
    },
    {
      id: 2,
      icon: Home,
      header: "Home Nursing",
      description: "Professional nursing care at home for post-surgery recovery, wound care, injections, and chronic disease management."
    },
    {
      id: 3,
      icon: UserPlus,
      header: "Elderly Care",
      description: "Assistance with daily living activities, hygiene, feeding, and emotional support to ensure dignity and comfort for seniors."
    },
    {
      id: 4,
      icon: Pill,
      header: "Medication Assistance",
      description: "Timely reminders and administration of prescribed medications to ensure strict adherence to treatment plans."
    },
    {
      id: 5,
      icon: Accessibility,
      header: "Mobility Support",
      description: "Safe assistance with moving, walking, transferring between bed and chair, and fall prevention strategies."
    }

  ]

  return (
    <section className='flex flex-col py-10 px-11 bg-linear-to-b from-white to-[#A5CACA]'>
        <div className="flex flex-col justify-center p-5 md:pl-20 py-10 gap-5">
            <h1 className="font-bold text-3xl md:text-4xl">Comprehensive Care Services</h1>
            <p className="text-md md:text-lg text-[#0D182B99] font-medium md:w-2/3">Our network of professionals covers a wide range of needs, ensuring your family member receives specialized attention tailored to their condition.</p>
        </div>

        <div className="flex justify-center items-center p-5 md:p-0 gap-10 flex-wrap">
            {servicesData.map(service => (
              <ServicesItem icon={service.icon} header={service.header} description={service.description} key={service.id}></ServicesItem>
            ))}


            <div className="flex flex-col gap-5 items-center justify-center md:w-96 md:h-72 bg-linear-to-b from-[#0385BF] to-[#0C938D] rounded-2xl p-6 cursor-pointer">
              <div className="font-semibold text-2xl text-white">Need something else?</div>
              <div className="text-xl font-medium text-[#FFFFFFB2] text-center">We offer specialized care plans tailored to unique family needs.</div>
              <div className="text-center font-semibold text-[#0f6798] text-2xl bg-[#FFFFFF] py-2 px-6 rounded-3xl mt-5 hover:bg-[#eff9ff] hover:shadow-lg">Contact Us</div>
            </div>
        </div>
    </section>
  )
}


export default CareServices
