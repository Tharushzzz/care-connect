import { Search } from "lucide-react";

const TitleSection = () => {
  return (
    <div className="flex flex-col align-self-stretch pl-20  bg-[#0384C6]">
        <div className="flex flex-col w-2/4 py-10 px-4 gap-7">
            <h1 className="text-4xl font-bold text-white">Find Your Perfect Caregiver</h1>
            <p className="text-lg text-white">
                Browse our network of verified, experienced professionals ready to provide compassionate care for your loved ones.
            </p>
            <div className="flex flex-row gap-4 bg-white rounded-xl p-2 px-4 shadow-md  justify-center items-center">
                <Search className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by name (e.g.,Saraha)"
                    className="flex-1 border-0 bg-transparent px-4 py-2 text-xl text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
                <button className="px-8 py-2 bg-[#0384C6] text-white rounded-2xl text-xl cursor-pointer hover:bg-[#0269A1] transition duration-300">
                    Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default TitleSection
