import { useState, useEffect } from 'react'
import { MapPin, ShieldCheck, ShieldAlert, Star, Bookmark, UserX, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Caregiver } from '../../../config/Caregivers'
import fallbackCaregivers from '../../../config/Caregivers'

interface CaregiverCardProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  hourlyRate?: string;
  experience?: string;
  availability?: string;
  selectedSpecialty?: string;
}

const CaregiverCard = ({
  searchQuery = "",
  onClearSearch,
  hourlyRate = "Any",
  experience = "Any",
  availability = "Any",
  selectedSpecialty = "All",
}: CaregiverCardProps) => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedIds, setSavedIds] = useState<(number | string)[]>(() => {
    try {
      const saved = localStorage.getItem('careconnect_saved_caregivers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSave = (id: number | string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('careconnect_saved_caregivers', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchCaregivers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (selectedSpecialty && selectedSpecialty !== 'All') params.append('specialty', selectedSpecialty);
        if (hourlyRate && hourlyRate !== 'Any') params.append('rate', hourlyRate);
        if (experience && experience !== 'Any') params.append('experience', experience);
        if (availability && availability !== 'Any') params.append('availability', availability);

        const res = await fetch(`/api/caregivers?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch from MongoDB API');
        const data = await res.json();
        if (isMounted) {
          setCaregivers(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching caregivers from MongoDB, using fallback:', error);
        // Fallback filter
        const query = searchQuery.trim().toLowerCase();
        const filtered = fallbackCaregivers.filter((c) => {
          if (!query) return true;
          return (
            c.name.toLowerCase().includes(query) ||
            c.role.toLowerCase().includes(query) ||
            c.location.toLowerCase().includes(query)
          );
        });
        if (isMounted) {
          setCaregivers(filtered);
          setLoading(false);
        }
      }
    };

    fetchCaregivers();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedSpecialty, hourlyRate, experience, availability]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] rounded-3xl bg-white p-8 ring-1 ring-[#E7EDF5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0B8BD8] mb-3" />
        <p className="text-sm font-medium text-slate-500">Loading caregivers from database...</p>
      </div>
    );
  }

  if (caregivers.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-[#E7EDF5]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F9FF] text-[#0B8BD8] mb-4">
          <UserX className="h-8 w-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#111827]">No caregivers found</h3>
        <p className="mt-2 text-sm text-[#6B7280] max-w-md mx-auto">
          We couldn't find any caregivers matching your search criteria. Try adjusting your filters or search term.
        </p>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0879B6] cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {caregivers.map((caregiver) => {
        const cgId = caregiver.id || (caregiver as any)._id;
        const initials = caregiver.name
          ? caregiver.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : 'CG';

        return (
          <article
            key={cgId}
            className="rounded-2xl sm:rounded-4xl bg-white p-4 sm:p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-[#E7EDF5] hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0686CD] text-lg font-bold shadow-xs ring-2 ring-[#EAF5FC] overflow-hidden">
                  {caregiver.profileImage ? (
                    <img
                      src={caregiver.profileImage}
                      alt={caregiver.name}
                      className="h-full w-full rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">{caregiver.name}</h3>
                    {caregiver.verified ? (
                      <span title="Verified Professional">
                        <ShieldCheck className="h-5 w-5 text-[#0B8BD8]" />
                      </span>
                    ) : (
                      <span title="Verification Pending">
                        <ShieldAlert className="h-5 w-5 text-[#D97706]" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-[#4B5563]">{caregiver.role || 'Caregiver'}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#4B5563]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-[#0B8BD8]" />
                      {caregiver.location || 'Colombo, Sri Lanka'}
                    </span>
                    <span>{caregiver.experience || '1 year experience'}</span>
                    <span className="font-semibold text-slate-800">{caregiver.rate || 'Rs. 2,500/hr'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleSave(cgId)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition cursor-pointer border ${
                    savedIds.includes(cgId)
                      ? 'border-[#0B8BD8] bg-[#F0F8FF] text-[#0B8BD8]'
                      : 'border-[#E2E8F0] bg-white text-[#4B5563] hover:border-[#0B8BD8] hover:text-[#0B8BD8]'
                  }`}
                  title={savedIds.includes(cgId) ? 'Remove from saved' : 'Save caregiver'}
                >
                  <Bookmark
                    className={`h-4 w-4 transition-transform ${
                      savedIds.includes(cgId) ? 'fill-[#0B8BD8] text-[#0B8BD8] scale-110' : ''
                    }`}
                  />
                  <span>{savedIds.includes(cgId) ? 'Saved' : 'Save'}</span>
                </button>

                <Link
                  to={`/find-caregivers/${cgId}`}
                  className="w-full text-center sm:w-auto rounded-full bg-[#0B8BD8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0879b6] cursor-pointer"
                >
                  View profile
                </Link>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-[#374151]">
              <div className="flex items-center gap-1 text-[#F4B740]">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold text-[#111827]">{caregiver.rating || 5.0}</span>
              </div>
              <span>({caregiver.reviews || 0} Reviews)</span>
            </div>

            <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-[#4B5563]">
              {caregiver.description || `${caregiver.name} is a dedicated, certified caregiver providing compassionate and professional care.`}
            </p>

            {Array.isArray(caregiver.specialties) && caregiver.specialties.length > 0 && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {caregiver.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full border border-[#D9EAFB] bg-[#F3F9FF] px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-[#1F2937]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default CaregiverCard;
