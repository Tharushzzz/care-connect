import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Navigation,
  MessageSquare,
  Loader2,
  Calendar,
  Check,
  X
} from 'lucide-react';

interface BookingItem {
  _id: string;
  id?: string;
  bookingCode?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  caregiverName: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location?: string;
  status: 'Scheduled' | 'Pending' | 'Completed' | 'Cancelled' | 'Accepted' | 'Declined';
  totalPrice: number;
  days?: number;
  notes?: string;
}

export const CaregiverSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Requests' | 'Cancelled'>('Upcoming');
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('careconnect_token');
      const res = await fetch('/api/bookings', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data || []);
      }
    } catch (err) {
      console.error('Error fetching caregiver schedule:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: string, newStatus: 'Scheduled' | 'Declined' | 'Completed') => {
    setBookings((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
    );

    const label = newStatus === 'Scheduled' ? 'Shift accepted!' : newStatus === 'Declined' ? 'Shift declined' : 'Shift marked as completed!';
    setToastMessage(label);
    setTimeout(() => setToastMessage(null), 3500);

    try {
      const token = localStorage.getItem('careconnect_token');
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const upcomingBookings = bookings.filter((b) => b.status === 'Scheduled' || b.status === 'Accepted');
  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const requestBookings = bookings.filter((b) => b.status === 'Pending');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled' || b.status === 'Declined');

  const parseDateParts = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const day = d.getDate().toString();
        return { month, day };
      }
    } catch {}
    const parts = dateStr.split(' ');
    return {
      month: parts[0]?.slice(0, 3).toUpperCase() || 'OCT',
      day: parts[1]?.replace(/\D/g, '') || '24',
    };
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700 text-sm">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          My Schedule
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View your upcoming shifts, respond to job requests, and complete visits.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-2xs inline-flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('Upcoming')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Upcoming'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Requests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'Requests'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Requests</span>
          {requestBookings.length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {requestBookings.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Completed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Completed'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Completed ({completedBookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Cancelled')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Cancelled'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Cancelled ({cancelledBookings.length})
        </button>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading schedule from database...</p>
          </div>
        ) : activeTab === 'Upcoming' ? (
          upcomingBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No upcoming shifts</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Accepted bookings from families will appear here. Check the Requests tab for new bookings.
              </p>
            </div>
          ) : (
            upcomingBookings.map((b) => {
              const { month, day } = parseDateParts(b.startDate);
              return (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
                    {/* Left: Date + Main Info */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#E6F4F1] border border-teal-100 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold tracking-wider text-teal-800 uppercase">
                          {month}
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-teal-900 leading-tight">
                          {day}
                        </span>
                      </div>

                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            {b.serviceType} • {b.userName || 'Family Client'}
                          </h2>
                          <span className="bg-[#EBF5FF] text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {b.status}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>
                              {b.startTime} - {b.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{b.location || 'Location provided in notes'}</span>
                          </div>
                        </div>

                        {b.notes && (
                          <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                            Requirements: {b.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Amount */}
                    <div className="text-left lg:text-right shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                      <div className="text-lg sm:text-xl font-bold text-slate-900">
                        Rs. {b.totalPrice?.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">Total Est.</div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {b.location && (
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(b.location)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                        >
                          <Navigation className="w-3.5 h-3.5 text-slate-500" />
                          <span>Get Directions</span>
                        </a>
                      )}
                      <Link
                        to="/caregiver/messages"
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Message Family</span>
                      </Link>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(b._id, 'Completed')}
                        className="w-full sm:w-auto px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer bg-[#0D9488] hover:bg-[#0b7970] text-white shadow-xs"
                      >
                        Complete Shift
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )
        ) : activeTab === 'Requests' ? (
          requestBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No pending requests</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You're all caught up! When a family books you, requests will appear here.
              </p>
            </div>
          ) : (
            requestBookings.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs border-l-4 border-l-[#0D9488] space-y-3"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                      Pending Request
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      {req.serviceType} • {req.userName || 'Family Member'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {req.startDate} • {req.startTime} - {req.endTime} ({req.days || 1} day)
                    </p>
                    {req.location && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.location}</span>
                      </p>
                    )}
                    {req.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl mt-2">
                        Requirements: {req.notes}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#0D9488]">
                      Rs. {req.totalPrice?.toLocaleString()}
                    </span>
                    <p className="text-xs text-slate-400">Total Booking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(req._id, 'Scheduled')}
                    className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept Shift</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(req._id, 'Declined')}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))
          )
        ) : activeTab === 'Completed' ? (
          completedBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center text-slate-400 text-xs font-medium">
              No completed shifts yet.
            </div>
          ) : (
            completedBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-sm font-bold text-slate-900">{b.serviceType} • {b.userName || 'Family Client'}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{b.startDate} • {b.startTime} - {b.endTime}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-700">+Rs. {b.totalPrice?.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400">Completed</p>
                </div>
              </div>
            ))
          )
        ) : (
          cancelledBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center text-slate-400 text-xs font-medium">
              No cancelled shifts.
            </div>
          ) : (
            cancelledBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4 opacity-75"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500" />
                    <h4 className="text-sm font-bold text-slate-900">{b.serviceType} • {b.userName || 'Family Client'}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{b.startDate} • {b.status}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-600 font-semibold">{b.status}</span>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default CaregiverSchedule;
