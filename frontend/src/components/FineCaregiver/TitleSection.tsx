import { Search } from "lucide-react";

const TitleSection = () => {
  return (
    <div className="bg-[#0384C6] px-4 py-8 sm:px-8 lg:px-20">
      <div className="mx-auto flex flex-col w-full max-w-4xl py-4 sm:py-8 gap-5 sm:gap-7">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          Find Your Perfect Caregiver
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl">
          Browse our network of verified, experienced professionals ready to provide compassionate care for your loved ones.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white rounded-2xl p-2 px-3 sm:px-4 shadow-md items-stretch sm:items-center">
          <div className="flex flex-1 items-center gap-2 px-2 py-1">
            <Search className="h-5 w-5 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search by name (e.g., Sarah)"
              className="w-full border-0 bg-transparent py-1 text-sm sm:text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button className="px-6 py-2.5 bg-[#0384C6] text-white rounded-xl text-sm sm:text-base font-semibold cursor-pointer hover:bg-[#0269A1] transition duration-300 w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default TitleSection
