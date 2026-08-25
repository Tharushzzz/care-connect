import CachedCaregivers from "../components/FineCaregiver/CachedCaregivers"
import FilterSide from "../components/FineCaregiver/FilterSide"
import TitleSection from "../components/FineCaregiver/TitleSection"


const FindCaregivers = () => {
  return (
    <>
      <TitleSection />
      <div>
        <FilterSide />
        <CachedCaregivers />
      </div>
    </>
  )
}

export default FindCaregivers
