

const Support = () => {
  return (
    <div className="flex items-center justify-center pt-10 lg:h-158 px-3 md:px-0">

      <div className="flex flex-col relative gap-2 md:gap-5 p-10 md:p-20 items-center justify-between lg:w-250 lg:h-100 h-fit rounded-[50px] shadow-[0_20px_80px_rgba(2,132,199,0.4)] bg-[radial-gradient(circle_at_center,#4fd1ff_0%,#0284c7_50%,#075985_100%)]">

        <div className="md:text-[45px] text-2xl text-white font-semibold">
            Your loved one deserves the best care.
        </div>
        <div className="md:text-[20px] text-white text-center lg:px-20 font-normal">
            Join thousands of families who trust CareConnect for safe, reliable, and professional caregiving services.
        </div>
        <div className="flex justify-center items-center md:py-2 px-8 border-2 border-white rounded-3xl shadow-2xl">
            <span className="text-xl text-white font-medium">Contact Support </span>
        </div>
        <div className="w-40 h-40 bg-white/10 rounded-full absolute -top-8 -left-8"></div>
        <div className="w-40 h-40 bg-white/10 rounded-full absolute -bottom-8 -right-8 hidden lg:block"></div>
      </div>
    </div>
  )
}

export default Support
