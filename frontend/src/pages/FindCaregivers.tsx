import { useState } from "react"
import CaregiverCard from "../components/FineCaregiver/CaregiverCard"
import FilterSide from "../components/FineCaregiver/FilterSide"
import TitleSection from "../components/FineCaregiver/TitleSection"

const FindCaregivers = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [hourlyRate, setHourlyRate] = useState("Any")
  const [experience, setExperience] = useState("Any")
  const [availability, setAvailability] = useState("Any")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")

  const handleResetFilters = () => {
    setSearchQuery("")
    setHourlyRate("Any")
    setExperience("Any")
    setAvailability("Any")
    setSelectedSpecialty("All")
  }

  return (
    <>
      <TitleSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="bg-[#F3F5F8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSide
            hourlyRate={hourlyRate}
            setHourlyRate={setHourlyRate}
            experience={experience}
            setExperience={setExperience}
            availability={availability}
            setAvailability={setAvailability}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            onResetFilters={handleResetFilters}
          />
          <CaregiverCard
            searchQuery={searchQuery}
            hourlyRate={hourlyRate}
            experience={experience}
            availability={availability}
            selectedSpecialty={selectedSpecialty}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>
      </div>
    </>
  )
}

export default FindCaregivers
