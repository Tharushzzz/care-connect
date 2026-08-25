import { Filter } from 'lucide-react'

const filterGroups = [
  {
    title: 'Hourly rate',
    options: ['Any', 'Under $20/hr', '$20 - $30/hr', '$30+/hr'],
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
  return (
    <aside className="rounded-3xl bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-[#E7EDF5]">
      <div className="mb-6 flex items-center gap-3 text-[#111827]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FF] text-[#0B8BD8]">
          <Filter className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-lg font-semibold text-[#111827]">{group.title}</h3>
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
          <h3 className="mb-3 text-lg font-semibold text-[#111827]">Specialty</h3>
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
