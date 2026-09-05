import { ArrowLeft, MapPin, ShieldCheck, ShieldAlert, Star, BriefcaseBusiness, Clock3, MessageCircle, CircleCheckBig, Calendar, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import caregiversData from '../../config/Caregivers'
import type { Caregiver } from '../../config/Caregivers'

const CaregiverProfile = () => {
  const { id } = useParams<{ id: string }>()
  const [caregiver, setCaregiver] = useState<Caregiver | null>(() => {
    return caregiversData.find((item) => item.id === Number(id)) || null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (!id) return;

    let isMounted = true;
    const fetchCaregiver = async () => {
      try {
        const res = await fetch(`/api/caregivers/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setCaregiver(data);
          }
        }
      } catch (err) {
        console.error('Error fetching caregiver from MongoDB:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCaregiver();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading && !caregiver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B8BD8] mb-3" />
        <p className="text-slate-500 font-medium text-sm">Loading caregiver profile...</p>
      </div>
    );
  }

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
    <div className="bg-[#F3F5F8] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Back button */}
      <div className="mx-auto max-w-7xl">
        <Link
          to="/find-caregivers"
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0B8BD8] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to caregivers
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start">
        {/* Left side */}
        <div className="w-full lg:flex-1 space-y-6 sm:space-y-8">
          
          {/* Hero Section */}
          <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              <div className="flex justify-center shrink-0">
                <img
                  src={caregiver.profileImage}
                  alt={caregiver.name}
                  className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover shadow-sm ring-4 ring-[#EAF6FF]"
                />
              </div>

              <div className="flex flex-col w-full text-center sm:text-left gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">
                    {caregiver.name}
                  </h1>

                  {caregiver.verified ? (
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8EF4E9]/30 px-3.5 py-1.5 text-xs font-semibold text-[#006F67] self-center sm:self-start">
                      <ShieldCheck className="h-4 w-4 text-[#006F67]" />
                      <span>Background Checked</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FEF3C7] px-3.5 py-1.5 text-xs font-semibold text-[#92400E] self-center sm:self-start">
                      <ShieldAlert className="h-4 w-4 text-[#D97706]" />
                      <span>Verification Pending</span>
                    </div>
                  )}
                </div>

                <p className="text-base sm:text-lg font-medium text-[#41474E]">{caregiver.role}</p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 text-xs sm:text-sm text-[#6B7280]">
                  <div className="flex items-center gap-1.5 text-[#41474E] font-medium">
                    <Star className="h-4 w-4 text-[#F4B740] fill-current" />
                    <span>{caregiver.rating} ({caregiver.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7280]">
                    <BriefcaseBusiness className="h-4 w-4 text-[#0B8BD8]" />
                    <span>{caregiver.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7280]">
                    <MapPin className="h-4 w-4 text-[#0B8BD8]" />
                    <span>{caregiver.location}</span>
                  </div>
                </div>

                <p className="mt-1 text-sm sm:text-base leading-relaxed text-[#41474E]">{caregiver.description}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">About {caregiver.name}</h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#41474E]">{caregiver.about}</p>
              <p className="text-sm sm:text-base leading-relaxed text-[#41474E]">{caregiver.freetime}</p>
            </div>
          </div>

          {/* Specialties Section */}
          <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {caregiver.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#E5F0FF] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-[#0B8BD8]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Credentials</h2>
              <div className="flex flex-wrap gap-2">
                {caregiver.credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#E5F0FF] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-[#0B8BD8]"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Available Dates Section */}
          {caregiver.availableDates && caregiver.availableDates.length > 0 && (
            <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
              <div className="flex flex-col gap-3 sm:gap-4 w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#0B8BD8]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Available Dates</h2>
                </div>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {caregiver.availableDates.map((date, index) => (
                    <span
                      key={index}
                      className="rounded-xl border border-[#D9EAFB] bg-[#F3F9FF] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#0B8BD8] shadow-xs"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-md">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Client Reviews</h2>
              </div>

              <div className="rounded-2xl border border-[#E2ECF8] bg-[#F7FBFF] p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white text-2xl sm:text-3xl font-bold text-[#111827] shadow-sm ring-1 ring-[#E2ECF8]">
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
                    <p className="text-xs sm:text-sm font-medium text-[#1F2937]">Based on {caregiver.reviews} verified reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {caregiver.reviewsData.length > 0 ? (
                  caregiver.reviewsData.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-[#111827]">{review.reviewerName}</p>
                          <p className="text-xs font-medium text-[#6B7280]">{review.date}</p>
                        </div>

                        <div className="flex items-center gap-1 text-[#F4B740]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${index < review.rating ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm sm:text-[15px] leading-relaxed sm:leading-7 text-[#41474E]">{review.comment}</p>
                    </article>
                  ))
                ) : (
                  <article className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                    <p className="text-sm sm:text-[15px] leading-relaxed sm:leading-7 text-[#41474E]">{caregiver.reviewText}</p>
                  </article>
                )}
              </div>

              <button className="w-full sm:w-fit rounded-full bg-[#0B8BD8] cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0879B6]">
                Load more reviews
              </button>
            </div>
          </div>

        </div>

        {/* Right side */}
        <div className="w-full lg:sticky lg:top-24 lg:w-85">
          <aside className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_rgba(15,23,42,0.08)] ring-1 ring-[#E4ECF6]">
            <div className="bg-linear-to-r from-[#0B8BD8] to-[#00A7D6] p-5 sm:p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#DFF5FF]">Starting at</p>
              <p className="mt-2 text-3xl sm:text-4xl font-bold leading-none">{caregiver.rate}</p>
              <p className="mt-2 text-sm text-[#EAF8FF]">{caregiver.availability}</p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {caregiver.verified ? (
                <div className="rounded-xl border border-[#DDEAF8] bg-[#F7FBFF] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#1F2937]">
                    <ShieldCheck className="h-4 w-4 text-[#0B8BD8]" />
                    Verified Professional
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-[#4B5563]">Background checks, certifications, and references are verified by CareConnect.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#92400E]">
                    <ShieldAlert className="h-4 w-4 text-[#D97706]" />
                    Verification Pending
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-[#78350F]">Background checks and credentials are currently being processed by CareConnect.</p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#4B5563]">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#0B8BD8]" />
                    Response time
                  </span>
                  <span className="font-semibold text-[#111827]">Within 1 hour</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#4B5563]">
                  <span>Sessions completed</span>
                  <span className="font-semibold text-[#111827]">220+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#4B5563]">
                  <span>Repeat clients</span>
                  <span className="font-semibold text-[#111827]">89%</span>
                </div>
              </div>

              <div className="space-y-2 rounded-xl bg-[#F9FAFB] p-4">
                <p className="text-xs sm:text-sm font-semibold text-[#111827]">Included in service</p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]"><CircleCheckBig className="h-4 w-4 text-[#10B981] shrink-0" />Personalized daily routine</p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]"><CircleCheckBig className="h-4 w-4 text-[#10B981] shrink-0" />Medication reminders</p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]"><CircleCheckBig className="h-4 w-4 text-[#10B981] shrink-0" />Family progress updates</p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/book-care/${caregiver.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                  className="block w-full text-center rounded-full bg-[#0B8BD8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0879B6] cursor-pointer shadow-sm"
                >
                  Book Consultation
                </Link>
                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#CFE3F7] bg-white px-5 py-3 text-sm font-semibold text-[#0B8BD8] transition hover:border-[#0B8BD8] hover:bg-[#F4FAFF] cursor-pointer">
                  <MessageCircle className="h-4 w-4" />
                  Message Caregiver
                </button>
              </div>
            </div>
          </aside>
        </div>

      </div>

    </div>
  )
}

export default CaregiverProfile
