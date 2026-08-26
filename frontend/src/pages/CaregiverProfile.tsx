import { ArrowLeft, MapPin, ShieldCheck, Star, BriefcaseBusiness } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import caregiversData from '../../config/Caregivers'

const CaregiverProfile = () => {
  const { id } = useParams()
  const caregiver = caregiversData.find((item) => item.id === Number(id))

  if (!caregiver) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-[#111827]">Caregiver profile not found.</p>
        <Link to="/find-caregivers" className="mt-4 inline-block text-[#0B8BD8] underline">
          Back to caregivers
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#F3F5F8] px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mx-auto max-w-6xl">
        <Link
          to="/find-caregivers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0B8BD8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to caregivers
        </Link>
      </div>
        
      {/* herosection */}
          
      <div className="flex w-3/5 ml-40 gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8 ">
          <div className="flex w-1/4 justify-center ">
            <img src={caregiver.profileImage} alt={caregiver.name} className="h-40 w-40 rounded-full object-cover" />
          </div>

          <div className="flex flex-col w-3/4 justify-center gap-3">
            <h1 className="text-4xl font-semibold text-[#111827]">{caregiver.name}</h1>

            <p className="text-[18px] text-[#41474E]">{caregiver.role}</p>

            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2 text-sm text-[#41474E]">
                <Star className="h-4 w-4" />
                {caregiver.rating} ({caregiver.reviews} reviews)
              </div>  
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <BriefcaseBusiness className="h-4 w-4" />
                {caregiver.experience}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <MapPin className="h-4 w-4" />
              {caregiver.location}
            </div>

            <p className="text-[16px] max-w-full text-[#41474E]">{caregiver.description}</p>
          </div>


          <div className="flex  px-2 py-2 items-center gap-3 rounded-4xl bg-[#8EF4E9] h-fit">
              <ShieldCheck className="h-8 w-8 text-[#006F67]" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-[#006F67]">Background Checked</p>
              </div>  
          </div> 

      </div>

      {/* About Section */}
      <div className="mt-10 flex w-3/5 ml-40 gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 w-5/6">
          <h2 className="text-2xl font-bold text-[#111827]">About {caregiver.name}</h2>
          <p className=" text-[16px] text-[#41474E] align-justify">{caregiver.about}</p>
          <p className=" text-[16px] text-[#41474E] align-justify">{caregiver.freetime}</p>
        </div>  
      </div>

      {/* Specialties Section */}
      <div className="mt-10 flex w-3/5 ml-40 gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 w-5/6">
          <h2 className="text-2xl font-bold text-[#111827]">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {caregiver.specialties.map((specialty, index) => (
              <span
                key={index}
                className="rounded-full bg-[#E5F0FF] px-4 py-2 text-sm font-medium text-[#0B8BD8]"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="mt-10 flex w-3/5 ml-40 gap-10 rounded-lg bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 w-5/6">
          <h2 className="text-2xl font-bold text-[#111827]">Credentials</h2>
          <div className="flex flex-wrap gap-2">
            {caregiver.credentials.map((credential, index) => (
              <span
                key={index}
                className="rounded-full bg-[#E5F0FF] px-4 py-2 text-sm font-medium text-[#0B8BD8]"
              >
                {credential}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 w-3/5 ml-40 rounded-lg bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#111827]">Client Reviews</h2>
            <button className="rounded-full border border-[#CFE3F7] px-4 py-2 text-sm font-semibold text-[#0B8BD8] transition hover:border-[#0B8BD8] hover:bg-[#F4FAFF]">
              Write a review
            </button>
          </div>

          <div className="rounded-2xl border border-[#E2ECF8] bg-[#F7FBFF] p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-[#111827] shadow-sm ring-1 ring-[#E2ECF8]">
                {caregiver.rating}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-[#F4B740]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < Math.round(caregiver.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-[#1F2937]">Based on {caregiver.reviews} verified reviews</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {caregiver.reviewsData.length > 0 ? (
              caregiver.reviewsData.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[16px] font-semibold text-[#111827]">{review.reviewerName}</p>
                      <p className="text-xs font-medium text-[#6B7280]">{review.date}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[#F4B740]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${index < review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[15px] leading-7 text-[#41474E]">{review.comment}</p>
                </article>
              ))
            ) : (
              <article className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <p className="text-[15px] leading-7 text-[#41474E]">{caregiver.reviewText}</p>
              </article>
            )}
          </div>

          <button className="w-fit rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0879B6]">
            Load more reviews
          </button>
        </div>
      </div>

    </div>
    
  )
}
          


export default CaregiverProfile
