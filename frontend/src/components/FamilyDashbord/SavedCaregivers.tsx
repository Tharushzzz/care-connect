import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Search,
  Star,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  MessageSquare,
  Trash2,
  ExternalLink,
  Filter,
  CheckCircle,
  SlidersHorizontal,
  Clock,
  Loader2
} from 'lucide-react';
import CaregiversData from '../../../config/Caregivers';
import type { Caregiver } from '../../../config/Caregivers';

export const SavedCaregivers: React.FC = () => {
  // Initial state loaded with popular caregivers as saved
  const [savedCaregivers, setSavedCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchSavedCaregivers = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('careconnect_token');

    // 1. Fetch directly from MongoDB for authenticated user
    if (token) {
      try {
        const res = await fetch('/api/caregivers/saved', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSavedCaregivers(data.caregivers || []);
          if (Array.isArray(data.savedIds)) {
            localStorage.setItem('careconnect_saved_caregivers', JSON.stringify(data.savedIds));
          }
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error fetching saved caregivers from MongoDB:', err);
      }
    }

    // 2. Fallback to localStorage if no token or offline
    try {
      const stored = localStorage.getItem('careconnect_saved_caregivers');
      const savedIds: (number | string)[] = stored ? JSON.parse(stored) : [];
      if (savedIds.length > 0) {
        const res = await fetch('/api/caregivers');
        if (res.ok) {
          const allCgs: Caregiver[] = await res.json();
          const strIds = savedIds.map(String);
          setSavedCaregivers(
            allCgs.filter((c) => strIds.includes(String(c.id)) || strIds.includes(String((c as any)._id)))
          );
        } else {
          const strIds = savedIds.map(String);
          setSavedCaregivers(CaregiversData.filter((c) => strIds.includes(String(c.id))));
        }
      } else {
        setSavedCaregivers([]);
      }
    } catch (err) {
      console.error('Error retrieving fallback saved caregivers:', err);
      setSavedCaregivers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedCaregivers();
  }, []);

  // Show temporary toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Remove a caregiver from the saved list in state, localStorage, and MongoDB
  const handleRemove = async (id: number | string, name: string) => {
    const strId = String(id);

    // Optimistic UI update
    setSavedCaregivers((prev) =>
      prev.filter((cg) => String(cg.id) !== strId && String((cg as any)._id) !== strId)
    );

    try {
      const stored = localStorage.getItem('careconnect_saved_caregivers');
      const savedIds: (number | string)[] = stored ? JSON.parse(stored) : [];
      const newIds = savedIds.filter((i) => String(i) !== strId);
      localStorage.setItem('careconnect_saved_caregivers', JSON.stringify(newIds));
    } catch (e) {
      console.error(e);
    }

    const token = localStorage.getItem('careconnect_token');
    if (token) {
      try {
        await fetch(`/api/caregivers/saved/${encodeURIComponent(strId)}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Error removing saved caregiver from MongoDB:', err);
      }
    }

    showToast(`${name} was removed from your saved list`);
  };

  // Clear all saved caregivers
  const handleClearAll = async () => {
    if (savedCaregivers.length === 0) return;
    setSavedCaregivers([]);
    localStorage.removeItem('careconnect_saved_caregivers');

    const token = localStorage.getItem('careconnect_token');
    if (token) {
      try {
        await fetch('/api/caregivers/saved', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Error clearing saved caregivers from MongoDB:', err);
      }
    }

    showToast('All saved caregivers have been cleared');
  };

  // Extract all unique specialties
  const allSpecialties = ['All', ...Array.from(new Set(savedCaregivers.flatMap((c) => c.specialties || [])))];

  // Filtering & Sorting
  const filteredCaregivers = savedCaregivers
    .filter((cg) => {
      const matchesSearch =
        cg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cg.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cg.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === 'All' || cg.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience.localeCompare(a.experience);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#0D182B] text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 border border-gray-700 text-sm">
          <CheckCircle className="w-4 h-4 text-[#0B8BD8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3EDF6] shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#0B8BD8]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="p-2 rounded-xl bg-rose-50 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0D182B]">Saved Caregivers</h1>
            </div>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Easily review, compare, and book the caregivers you've bookmarked for your family.
            </p>
          </div>

          {savedCaregivers.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Quick metrics summary */}
        <div className="mt-6 pt-6 border-t border-[#EEF4F9] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F8FBFE] p-3.5 rounded-xl border border-[#E7F0F8]">
            <p className="text-xs text-gray-500 font-medium">Total Saved</p>
            <p className="text-xl font-bold text-[#0D182B] mt-0.5">{savedCaregivers.length}</p>
          </div>
          <div className="bg-[#F8FBFE] p-3.5 rounded-xl border border-[#E7F0F8]">
            <p className="text-xs text-gray-500 font-medium">Verified Profiles</p>
            <p className="text-xl font-bold text-[#0B8BD8] mt-0.5">
              {savedCaregivers.filter((c) => c.verified).length}
            </p>
          </div>
          <div className="bg-[#F8FBFE] p-3.5 rounded-xl border border-[#E7F0F8]">
            <p className="text-xs text-gray-500 font-medium">Avg. Rating</p>
            <p className="text-xl font-bold text-amber-500 mt-0.5">
              {savedCaregivers.length > 0
                ? (
                    savedCaregivers.reduce((acc, c) => acc + c.rating, 0) / savedCaregivers.length
                  ).toFixed(1)
                : '0.0'}{' '}
              ★
            </p>
          </div>
          <div className="bg-[#F8FBFE] p-3.5 rounded-xl border border-[#E7F0F8]">
            <p className="text-xs text-gray-500 font-medium">Ready to Book</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">
              {savedCaregivers.filter((c) => c.availability?.includes('today') || true).length} Available
            </p>
          </div>
        </div>
      </div>

      {/* Filters and search bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3EDF6] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E0EBF3] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/20 focus:border-[#0B8BD8] transition"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'name')}
              className="text-xs sm:text-sm font-medium text-gray-700 bg-[#F8FBFE] border border-[#E0EBF3] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0B8BD8] cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Experience</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Specialty chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <span className="text-gray-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {allSpecialties.slice(0, 7).map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-full font-medium transition shrink-0 cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-[#0B8BD8] text-white shadow-xs'
                  : 'bg-[#F2F7FA] text-gray-600 hover:bg-[#E4F0F8] hover:text-[#0B8BD8]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>
      {/* Caregiver list */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-[#E3EDF6] p-12 text-center max-w-lg mx-auto shadow-xs">
          <Loader2 className="w-8 h-8 text-[#0B8BD8] animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Loading your saved caregivers from database...</p>
        </div>
      ) : filteredCaregivers.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-[#E3EDF6] p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0D182B]">No Saved Caregivers Found</h3>
          <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
            {savedCaregivers.length === 0
              ? "You haven't saved any caregivers yet. Click the save icon on any caregiver profile to keep them for quick access."
              : 'No saved caregivers matched your current search and filter criteria.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {savedCaregivers.length > 0 ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                }}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                Reset Filters
              </button>
            ) : null}
            <Link
              to="/find-caregivers"
              className="px-5 py-2.5 rounded-xl bg-[#0B8BD8] text-white text-sm font-semibold hover:bg-[#0879B6] transition shadow-xs cursor-pointer"
            >
              Browse Caregivers
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredCaregivers.map((caregiver) => {
            const cgId = caregiver.id ?? (caregiver as any)._id;
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
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E3EDF6] shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  {/* Left profile info */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      {caregiver.profileImage ? (
                        <img
                          src={caregiver.profileImage}
                          alt={caregiver.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#EAF2F8]"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0B8BD8] to-[#065A8C] text-white flex items-center justify-center font-bold text-lg sm:text-xl ring-2 ring-[#EAF2F8]">
                          {initials}
                        </div>
                      )}
                      {caregiver.verified && (
                        <div
                          className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs"
                          title="Verified Caregiver"
                        >
                          <ShieldCheck className="w-5 h-5 text-[#0B8BD8]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0D182B] hover:text-[#0B8BD8] transition">
                          <Link to={`/find-caregivers/${cgId}`}>{caregiver.name}</Link>
                        </h3>
                        {caregiver.verified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#EAF5FC] text-[#0686CD] px-2 py-0.5 rounded-md">
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                            <ShieldAlert className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-gray-600">{caregiver.role}</p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0B8BD8]" />
                          {caregiver.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {caregiver.experience}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{caregiver.rating}</span>
                          <span className="text-gray-400 font-normal">({caregiver.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => handleRemove(cgId, caregiver.name)}
                      className="inline-flex items-center justify-center p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition cursor-pointer"
                      title="Remove from saved list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link
                      to="/messages"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E0EBF3] text-gray-700 text-sm font-semibold hover:bg-[#F2F8FD] hover:text-[#0686CD] hover:border-[#0686CD] transition cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0686CD]" />
                      <span>Message</span>
                    </Link>

                    <Link
                      to={`/book-care/${cgId}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B8BD8] text-white text-sm font-semibold hover:bg-[#0879B6] transition shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Care</span>
                    </Link>

                    <Link
                      to={`/find-caregivers/${cgId}`}
                      className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#F4F9FD] text-[#0B8BD8] hover:bg-[#E5F2FC] transition cursor-pointer"
                      title="View full profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl">
                {caregiver.description}
              </p>

              {/* Specialties and Rate */}
              <div className="mt-4 pt-4 border-t border-[#F0F5FA] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {caregiver.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F3F9FF] text-[#1F2937] border border-[#D9EAFB]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-medium">Starting from:</span>
                  <span className="text-base sm:text-lg font-bold text-[#0D182B]">
                    {caregiver.rate}
                  </span>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedCaregivers;
