import CachedCaregivers from "../components/FineCaregiver/CachedCaregivers"
import FilterSide from "../components/FineCaregiver/FilterSide"
import TitleSection from "../components/FineCaregiver/TitleSection"

const FindCaregivers = () => {
  return (
    <>
      <TitleSection />
      <div className="bg-[#F3F5F8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSide />
          <CachedCaregivers />
        </div>
      </div>
    </>
  )
}

export default FindCaregivers
