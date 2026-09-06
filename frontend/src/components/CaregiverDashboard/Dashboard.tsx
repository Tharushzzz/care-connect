import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Check,
  X,
  Loader2,
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

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

export const CaregiverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const isPendingVerification = user?.role === 'caregiver' && user?.status !== 'Verified';

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
      console.error('Error fetching caregiver bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: string, newStatus: 'Scheduled' | 'Declined' | 'Completed') => {
    // Optimistic UI update
    setBookings((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
    );

    const label = newStatus === 'Scheduled' ? 'accepted' : newStatus === 'Declined' ? 'declined' : 'completed';
    setActionMessage(`Booking has been ${label}!`);
    setTimeout(() => setActionMessage(null), 3500);

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
      console.error('Error updating booking status:', err);
    }
  };

  const pendingRequests = bookings.filter((b) => b.status === 'Pending');
  const scheduledShifts = bookings.filter(
    (b) => b.status === 'Scheduled' || b.status === 'Accepted'
  );
  const completedShifts = bookings.filter((b) => b.status === 'Completed');

  // Compute metrics
  const totalEarnings = completedShifts.reduce((acc, b) => acc + (b.totalPrice || 0), 0) +
    scheduledShifts.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700 text-sm">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Caregiver Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your schedule, respond to booking requests, and view earnings.
        </p>
      </div>

      {/* Verification Notice Banner if Pending */}
      {isPendingVerification && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-amber-900 flex items-center gap-2">
                <span>Account Verification Under Review</span>
                <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                  Pending Admin Approval
                </span>
              </h2>
              <p className="text-xs text-amber-800/85 mt-1 max-w-2xl leading-relaxed">
                Your caregiver account is currently awaiting administrator review. Once verified, your profile will be published to the client directory and available for booking requests.
              </p>
            </div>
          </div>
          <Link
            to="/caregiver/verification"
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            Check Status
          </Link>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Upcoming Shifts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Scheduled</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? '...' : scheduledShifts.length}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Upcoming shifts</div>
          </div>
        </div>

        {/* Card 2: Pending Requests */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-600 font-bold">Action Needed</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? '...' : pendingRequests.length}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">New requests</div>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Total</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isLoading ? '...' : `Rs. ${totalEarnings.toLocaleString()}`}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Estimated earnings</div>
          </div>
        </div>

        {/* Card 4: Verification / Profile Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-sm transition-shadow">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
              !isPendingVerification ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
            }`}
          >
            {!isPendingVerification ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div className="text-base font-bold text-slate-900">
            {!isPendingVerification ? 'Profile Active' : 'Under Review'}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-3 leading-snug">
            {!isPendingVerification ? 'Available for family bookings' : 'Awaiting admin approval'}
          </p>
          <Link
            to={!isPendingVerification ? '/caregiver/profile' : '/caregiver/verification'}
            className="w-full py-1.5 px-3 rounded-xl border border-[#0D9488] text-[#0D9488] hover:bg-teal-50 text-xs font-semibold transition-colors block text-center"
          >
            {!isPendingVerification ? 'Edit Profile' : 'View Verification'}
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Today & Upcoming Schedule</h2>
            <Link
              to="/caregiver/schedule"
              className="text-xs font-semibold text-[#0D9488] hover:text-[#0b7970] flex items-center gap-1 hover:underline"
            >
              <span>Full Schedule ({scheduledShifts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center">
              <Loader2 className="w-6 h-6 text-teal-600 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Loading schedule...</p>
            </div>
          ) : scheduledShifts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No scheduled shifts</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Accepted booking requests from families will appear here on your schedule.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scheduledShifts.map((shift) => (
                <div
                  key={shift._id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center gap-4 hover:border-teal-200 transition-all"
                >
                  <div className="w-18 h-14 rounded-xl bg-teal-50/80 border border-teal-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#0D9488] truncate max-w-16 px-1">
                      {shift.startDate.split(' ')[0] || shift.startDate}
                    </span>
                    <span className="text-[10px] font-semibold text-teal-600/80">
                      {shift.startTime?.split(' ')[0] || '09:00'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">
                        {shift.serviceType} • {shift.userName || 'Family Client'}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {shift.location || shift.notes || 'Home Visit'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {shift.startTime} - {shift.endTime}
                      </span>
                      <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                        {shift.status}
                      </span>
                      <span className="text-[11px] font-bold text-teal-700 ml-auto">
                        Rs. {shift.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: New Job Requests (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">New Job Requests</h2>
            {pendingRequests.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {pendingRequests.length} Pending
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center">
              <Loader2 className="w-6 h-6 text-teal-600 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Checking for new requests...</p>
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-2 border-l-4 border-l-slate-300">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No Pending Requests</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                When a family books your care services, their booking request will appear here for your review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs border-l-4 border-l-[#0D9488] space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {req.serviceType}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Requested by {req.userName || 'Family Member'}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-[#0D9488]">
                        Rs. {req.totalPrice?.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400">{req.days || 1} day</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{req.startDate} {req.endDate && req.endDate !== req.startDate ? `to ${req.endDate}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{req.startTime} - {req.endTime}</span>
                    </div>
                    {req.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{req.location}</span>
                      </div>
                    )}
                    {req.notes && (
                      <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                        Note: {req.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(req._id, 'Scheduled')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Request</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(req._id, 'Declined')}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
