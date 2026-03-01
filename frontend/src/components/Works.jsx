import React from 'react'
import work1 from '../assets/work1.svg'
import work2 from '../assets/work2.svg'
import work3 from '../assets/work3.svg'
import Workitem from './Workitem'

const Works = () => {
  return (
    <div className="flex flex-col pt-20 lg:pt-0 gap-20 items-center justify-center lg:h-screen bg-linear-to-b from-[#e2f1ff83] to-[#a5caca]">
      
        <section class="flex flex-col items-center justify-center gap-2 p-5 lg:p-0 lg:w-150">
          <div class="text-[#0071A8] text-xl font-semibold">SIMPLE PROCESS</div>
          <div class="text-3xl  md:text-4xl text-black font-semibold">How CareConnect Works</div>
          <div class="text-md md:text-lg text-[#0D182B99] font-medium text-center">We’ve stremlined the process to help you find help quickly, safely, and without the administrative headache</div>
        </section>


        <section class="flex w-full gap-10 lg:gap-0 items-center justify-evenly px-10 flex-wrap">

          <Workitem svg={work1} header={"Post Your Need"} body={"Describe your situation whether it’s hospital bedside monitoring, home, recovery or elderly companionship. Tell us dates, times, and specific requrements."}/>
          <Workitem svg={work2} header={"Choose a Verified Caregiver"} body={"Browse profiles of background-checked, certified caregivers. Review their experience, ratings, and specialties to find the perfect match for your family."}/>
          <Workitem svg={work3} header={"Get Professional Care"} body={"Rest easy knowing your loved one is in good hands. Receive real-time updates and manage payments securely through our platform."}/>
          
        </section>
    </div>
  )
}

export default Works
