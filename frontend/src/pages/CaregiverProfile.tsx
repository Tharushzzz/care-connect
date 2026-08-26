import { ArrowLeft, MapPin, ShieldCheck, Star, BriefcaseBusiness } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import caregiversData from '../../config/Caregivers'

const CaregiverProfile = () => {
  const { id } = useParams()
  const caregiver = caregiversData.find((item) => item.id === Number(id))

  if (!caregiver) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-[#111827]">Caregiver profile not found.</p>
        <Link to="/find-caregivers" className="mt-4 inline-block text-[#0B8BD8] underline">
          Back to caregivers
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#F3F5F8] px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mx-auto max-w-6xl">
        <Link
          to="/find-caregivers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0B8BD8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to caregivers
        </Link>
      </div>
        
      {/* herosection */}
          
      <div className="flex w-3/5 ml-40 gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8 ">
          <div className="flex w-1/4 justify-center ">
            <img src={caregiver.profileImage} alt={caregiver.name} className="h-40 w-40 rounded-full object-cover" />
          </div>

          <div className="flex flex-col w-3/4 justify-center gap-3">
            <h1 className="text-4xl font-semibold text-[#111827]">{caregiver.name}</h1>

            <p className="text-[18px] text-[#41474E]">{caregiver.role}</p>

            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2 text-sm text-[#41474E]">
                <Star className="h-4 w-4" />
                {caregiver.rating} ({caregiver.reviews} reviews)
              </div>  
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <BriefcaseBusiness className="h-4 w-4" />
                {caregiver.experience}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <MapPin className="h-4 w-4" />
              {caregiver.location}
            </div>

            <p className="text-[16px] max-w-full text-[#41474E]">{caregiver.bio}</p>
          </div>


          <div className="flex  px-2 py-2 items-center gap-3 rounded-4xl bg-[#8EF4E9] h-fit">
              <ShieldCheck className="h-8 w-8 text-[#006F67]" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-[#006F67]">Background Checked</p>
              </div>  
          </div> 

      </div>

      


      
    </div>
    
  )
}
          


export default CaregiverProfile
