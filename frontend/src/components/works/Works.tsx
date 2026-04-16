
import work1 from '../../assets/worksIcons/work1.svg'
import work2 from '../../assets/worksIcons/work2.svg'
import work3 from '../../assets/worksIcons/work3.svg'
import Workitem from './Workitem.js'

const Works = () => {
  return (
    <div className="flex flex-col py-20 lg:pt-16 gap-20 items-center justify-center xl:h-screen bg-linear-to-b from-[#e2f1ff83] to-[#a5caca]">
      
        <section className="flex flex-col items-center justify-center gap-2 p-5 lg:p-0 lg:w-150">
          <div className="text-[#0071A8] text-xl font-semibold">SIMPLE PROCESS</div>
          <div className="text-3xl  md:text-4xl text-black font-semibold">How CareConnect Works</div>
          <div className="text-md md:text-lg text-[#0D182B99] font-medium text-center">We’ve stremlined the process to help you find help quickly, safely, and without the administrative headache</div>
        </section>


        <section className="flex w-full gap-10 lg:gap-0  items-center justify-evenly p-5 md:py-0 md:px-10 flex-wrap">

          <Workitem svg={work1} header={"Post Your Need"} body={"Describe your situation whether it’s hospital bedside monitoring, home, recovery or elderly companionship. Tell us dates, times, and specific requrements."}/>
          <Workitem svg={work2} header={"Choose a Verified Caregiver"} body={"Browse profiles of background-checked, certified caregivers. Review their experience, ratings, and specialties to find the perfect match for your family."}/>
          <Workitem svg={work3} header={"Get Professional Care"} body={"Rest easy knowing your loved one is in good hands. Receive real-time updates and manage payments securely through our platform."}/>
          
        </section>
    </div>
  )
}

export default Works
