import { useState } from "react"
import CaregiverCard from "../components/FineCaregiver/CaregiverCard"
import FilterSide from "../components/FineCaregiver/FilterSide"
import TitleSection from "../components/FineCaregiver/TitleSection"

const FindCaregivers = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <TitleSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="bg-[#F3F5F8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSide />
          <CaregiverCard
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>
      </div>
    </>
  )
}

export default FindCaregivers

