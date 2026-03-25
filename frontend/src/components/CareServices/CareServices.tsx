import ServicesItem from "./ServicesItem"

const CareServices = () => {
  return (
    <section className='flex flex-col py-10 bg-linear-to-b from-[#0284C426] to-[#A5CACA]'>
        <div className="flex flex-col justify-center pl-20 py-10 gap-5">
            <h1 className="font-bold text-4xl">Comprehensive Care Services</h1>
            <p className="text-lg text-[#0D182B99] font-medium w-2/3">Our network of professionals covers a wide range of needs, ensuring your family member receives specialized attention tailored to their condition.</p>
        </div>

        <div className="flex justify-center items-center gap-10 flex-wrap">
            <ServicesItem />
            <ServicesItem />
            <ServicesItem />
            <ServicesItem />
            <ServicesItem />
            <ServicesItem />
        </div>
    </section>
  )
}

export default CareServices
