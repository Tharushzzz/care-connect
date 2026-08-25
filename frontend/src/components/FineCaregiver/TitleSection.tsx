

const TitleSection = () => {
  return (
    <div className="flex flex-col align-self-stretch pl-20  bg-[#0384C6]">
        <div className="flex flex-col w-2/4 py-15 px-4 gap-7">
            <h1 className="text-4xl font-bold text-white">Find Your Perfect Caregiver</h1>
            <p className="text-lg text-white">
                Browse our network of verified, experienced professionals ready to provide compassionate care for your loved ones.
            </p>
            <div className="flex flex-row gap-4 bg-white rounded-xl p-2 px-4 shadow-md ">
                
                <input
                    type="text"
                    placeholder="Search by name (e.g.,Saraha)"
                    className="flex-1 px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
