import whyus from "../../assets/whyus.png";

const WhyUs = () => {
  return (
    <section className="flex gap-3 items-center justify-center bg-linear-to-b from-[#F4FEFF] to-[#d0eeee] h-[91vh]">
        <div className="flex w-1/2 h-full items-center justify-end pr-10">
            <img src={whyus} alt="Why Us" className="object-cover h-[90%]" >
              
            </img>
        </div>


        <div className="flex w-1/2 h-full border-2"></div>
    </section>
  )
}

export default WhyUs
