import { useState } from 'react'
import { MapPin, ShieldCheck, ShieldAlert, Star, Bookmark, UserX } from 'lucide-react'
import { Link } from 'react-router-dom'
import caregiversData from '../../../config/Caregivers'

interface CaregiverCardProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

const CaregiverCard = ({ searchQuery = "", onClearSearch }: CaregiverCardProps) => {
  const [savedIds, setSavedIds] = useState<number[]>([])

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const query = searchQuery.trim().toLowerCase()
  const filteredCaregivers = caregiversData.filter((caregiver) => {
    if (!query) return true
    return caregiver.name.toLowerCase().includes(query)
  })

  if (filteredCaregivers.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-[#E7EDF5]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F9FF] text-[#0B8BD8] mb-4">
          <UserX className="h-8 w-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#111827]">No caregivers found</h3>
        <p className="mt-2 text-sm text-[#6B7280] max-w-md mx-auto">
          We couldn't find any caregivers matching <span className="font-semibold text-[#111827]">"{searchQuery}"</span>. Try adjusting your search term or search by specialty.
        </p>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0879B6] cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {filteredCaregivers.map((caregiver) => (
        <article
          key={caregiver.id}
          className="rounded-2xl sm:rounded-4xl bg-white p-4 sm:p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-[#E7EDF5]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#F0D8CB] to-[#D9B6A0] text-lg font-bold text-[#1F2937]">
                <img src={caregiver.profileImage} alt={caregiver.name} className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">{caregiver.name}</h3>
                  {caregiver.verified ? (
                    <span title="Verified Professional">
                      <ShieldCheck className="h-5 w-5 text-[#0B8BD8]" />
                    </span>
                  ) : (
                    <span title="Verification Pending">
                      <ShieldAlert className="h-5 w-5 text-[#D97706]" />
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-[#4B5563]">{caregiver.role}</p>

                <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#4B5563]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[#0B8BD8]" />
                    {caregiver.location}
                  </span>
                  <span>{caregiver.experience}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleSave(caregiver.id)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition cursor-pointer border ${
                  savedIds.includes(caregiver.id)
                    ? 'border-[#0B8BD8] bg-[#F0F8FF] text-[#0B8BD8]'
                    : 'border-[#E2E8F0] bg-white text-[#4B5563] hover:border-[#0B8BD8] hover:text-[#0B8BD8]'
                }`}
                title={savedIds.includes(caregiver.id) ? 'Remove from saved' : 'Save caregiver'}
              >
                <Bookmark
                  className={`h-4 w-4 transition-transform ${
                    savedIds.includes(caregiver.id) ? 'fill-[#0B8BD8] text-[#0B8BD8] scale-110' : ''
                  }`}
                />
                <span>{savedIds.includes(caregiver.id) ? 'Saved' : 'Save'}</span>
              </button>

              <Link
                to={`/find-caregivers/${caregiver.id}`}
                className="w-full text-center sm:w-auto rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0879b6] cursor-pointer"
              >
                View profile
              </Link>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-[#374151]">
            <div className="flex items-center gap-1 text-[#F4B740]">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-[#111827]">{caregiver.rating}</span>
            </div>
            <span>({caregiver.reviews} Reviews)</span>
          </div>

          <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-[#4B5563]">{caregiver.description}</p>

          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
            {caregiver.specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-[#D9EAFB] bg-[#F3F9FF] px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-[#1F2937]"
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

export default CaregiverCard

