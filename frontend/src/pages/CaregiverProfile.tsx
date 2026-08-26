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
          
      <div className="flex w-3/4 mx-auto gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8 ">
          <div>
            <img src={caregiver.profileImage} alt={caregiver.name} className="h-40 w-40 rounded-full object-cover" />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold text-[#111827]">{caregiver.name}</h1>
            <p className="text-sm text-[#6B7280]">{caregiver.role}</p>
            <div>
              
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <MapPin className="h-4 w-4" />
                {caregiver.location}
              </div>  

            </div>
          </div> 

      </div>


      
    </div>
    
  )
}
          


export default CaregiverProfile
