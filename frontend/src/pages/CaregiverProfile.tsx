import { ArrowLeft, MapPin, ShieldCheck, Star } from 'lucide-react'
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
      <div className="mx-auto max-w-6xl">
        <Link
          to="/find-caregivers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0B8BD8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to caregivers
        </Link>

        <div className="overflow-hidden rounded-4xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-[#E7EDF5]">
          <div className="bg-[#0A69B4] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={caregiver.profileImage}
                  alt={caregiver.name}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{caregiver.name}</h1>
                    <ShieldCheck className="h-5 w-5 text-[#DDF3FF]" />
                  </div>
                  <p className="mt-1 text-lg text-[#D9F0FF]">{caregiver.role}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#D9F0FF]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {caregiver.location}
                    </span>
                    <span>{caregiver.experience}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-1 text-[#FFD77A]">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-lg font-bold text-white">{caregiver.rating}</span>
                </div>
                <span className="text-sm text-[#E5F4FF]">({caregiver.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.5fr_0.9fr] md:px-10">
            <div>
              <div className="rounded-2xl bg-[#F8FBFF] p-5 ring-1 ring-[#E7EDF5]">
                <h2 className="text-xl font-semibold text-[#111827]">About</h2>
                <p className="mt-3 text-base leading-7 text-[#4B5563]">{caregiver.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-[#111827]">Specialties</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {caregiver.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-[#D9EAFB] bg-[#F3F9FF] px-3 py-1.5 text-sm font-medium text-[#1F2937]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#F8FBFF] p-5 ring-1 ring-[#E7EDF5]">
                <h2 className="text-xl font-semibold text-[#111827]">Caregiver review</h2>
                <p className="mt-3 text-base italic leading-7 text-[#4B5563]">“{caregiver.reviewText}”</p>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl bg-[#F8FBFF] p-5 ring-1 ring-[#E7EDF5]">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#6B7280]">Availability</p>
                <p className="mt-3 text-2xl font-bold text-[#111827]">{caregiver.availability}</p>
                <p className="mt-1 text-sm text-[#4B5563]">Rate: {caregiver.rate}</p>
              </div>

              <div className="rounded-2xl bg-[#F8FBFF] p-5 ring-1 ring-[#E7EDF5]">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#6B7280]">Credentials</p>
                <ul className="mt-3 space-y-2 text-sm text-[#374151]">
                  {caregiver.credentials.map((credential) => (
                    <li key={credential} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0B8BD8]" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full rounded-full bg-[#0B8BD8] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#0879b6]">
                Book appointment
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaregiverProfile
