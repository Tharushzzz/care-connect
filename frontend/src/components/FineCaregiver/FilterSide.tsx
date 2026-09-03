import { useState } from 'react'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'

const filterGroups = [
  {
    title: 'Hourly rate',
    options: ['Any', 'Under Rs. 2,500/hr', 'Rs. 2,500 - Rs. 3,500/hr', 'Rs. 3,500+/hr'],
  },
  {
    title: 'Years of experience',
    options: ['Any', '1-3 years', '3-5 years', '5+ years'],
  },
  {
    title: 'Availability',
    options: ['Any', 'Today', 'This week', 'This month'],
  },
]

const specialties = ['Senior Care', 'Mobility Assistance', 'Medication Support', 'Companionship']

const FilterSide = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  return (
    <aside className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-[#E7EDF5]">
      <div 
        className="flex items-center justify-between cursor-pointer lg:cursor-default"
        onClick={() => setIsOpenMobile((prev) => !prev)}
      >
        <div className="flex items-center gap-3 text-[#111827]">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#EAF6FF] text-[#0B8BD8]">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold">Filters</h2>
        </div>

        <button 
          type="button"
          className="flex lg:hidden items-center gap-1 text-xs font-semibold text-[#0B8BD8] bg-[#EAF6FF] px-3 py-1.5 rounded-full"
        >
          <span>{isOpenMobile ? 'Hide' : 'Show'}</span>
          {isOpenMobile ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <div className={`${isOpenMobile ? 'block' : 'hidden'} lg:block space-y-6 mt-5 pt-4 border-t border-[#F0F4F8] lg:border-t-0 lg:pt-0 lg:mt-6`}>
        {filterGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-base sm:text-lg font-semibold text-[#111827]">{group.title}</h3>
            <div className="space-y-3 text-sm text-[#374151]">
              {group.options.map((option, index) => (
                <label key={option} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name={group.title}
                    defaultChecked={index === 0}
                    className="h-4 w-4 border-gray-300 text-[#0B8BD8] focus:ring-[#0B8BD8]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-base sm:text-lg font-semibold text-[#111827]">Specialty</h3>
          <div className="space-y-3 text-sm text-[#374151]">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#0B8BD8] focus:ring-[#0B8BD8]" />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterSide
