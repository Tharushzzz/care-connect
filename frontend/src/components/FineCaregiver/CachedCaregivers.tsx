import { MapPin, ShieldCheck, Star } from 'lucide-react'
import sahara from '../../assets/Caregiverprofile/Sarah.jpeg'
import Michael from '../../assets/Caregiverprofile/Michael.jpeg'
import Emily from '../../assets/Caregiverprofile/Emily.jpeg'


const caregivers = [
  {
    profileImage: sahara,
    name: 'Sarah Jenkins',
    role: 'Registered Nurse (RN)',
    location: 'San Francisco, CA',
    experience: '5 years experience',
    rating: 4.9,
    reviews: 124,
    description:
      'Compassionate RN with extensive experience in geriatric care and post-surgery recovery. Dedicated to providing dignified, respectful care to all my patients.',
    specialties: ['Senior Care', 'Mobility Assistance', 'Medication Support'],
  },
  {
    profileImage: Michael,
    name: 'Michael Lee',
    role: 'Certified Nursing Assistant',
    location: 'Oakland, CA',
    experience: '4 years experience',
    rating: 4.8,
    reviews: 96,
    description:
      'Warm, dependable caregiver with a strong background in helping elderly clients with daily routines, personal support, and companionship.',
    specialties: ['Daily Living Support', 'Companionship', 'Bathing Assistance'],
  },
  {
    profileImage: Emily,
    name: 'Emily Davis',
    role: 'Licensed Practical Nurse (LPN)',
    location: 'San Francisco, CA',
    experience: '3 years experience',
    rating: 4.7,
    reviews: 82,
    description:
      'Dedicated LPN with a passion for providing compassionate care to patients of all ages. Skilled in medication administration and patient monitoring.',
    specialties: ['Medication Management', 'Patient Monitoring', 'Basic Life Support'],
  },
  
]

const CachedCaregivers = () => {
  return (
    <div className="space-y-5">
      {caregivers.map((caregiver) => (
        <article
          key={caregiver.name}
          className="rounded-3xl bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-[#E7EDF5]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#F0D8CB] to-[#D9B6A0] text-lg font-bold text-[#1F2937]">
                <img src={caregiver.profileImage} alt={caregiver.name} className="h-16 w-16 rounded-full object-cover" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-[#111827]">{caregiver.name}</h3>
                  <ShieldCheck className="h-5 w-5 text-[#0B8BD8]" />
                </div>
                <p className="text-base text-[#4B5563]">{caregiver.role}</p>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[#0B8BD8]" />
                    {caregiver.location}
                  </span>
                  <span>{caregiver.experience}</span>
                </div>
              </div>
            </div>

            <button className="rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0879b6] cursor-pointer">
              View profile
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#374151]">
            <div className="flex items-center gap-1 text-[#F4B740]">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-[#111827]">{caregiver.rating}</span>
            </div>
            <span>({caregiver.reviews} Reviews)</span>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4B5563]">{caregiver.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {caregiver.specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-[#D9EAFB] bg-[#F3F9FF] px-3 py-1.5 text-xs font-medium text-[#1F2937]"
              >
                {specialty}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export default CachedCaregivers
