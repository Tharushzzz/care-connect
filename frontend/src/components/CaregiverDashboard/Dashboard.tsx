import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Check,
  X
} from 'lucide-react';

export const CaregiverDashboard: React.FC = () => {
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Caregiver Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your schedule, view earnings, and respond to requests.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Upcoming Shifts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">This Week</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">4</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Upcoming shifts</div>
          </div>
        </div>

        {/* Card 2: Hours Scheduled */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">This Week</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">32</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Hours scheduled</div>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">This Month</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">Rs. 324,000</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Total earnings</div>
          </div>
        </div>

        {/* Card 4: Profile Active */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-base font-bold text-slate-900">Profile Active</div>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-3 leading-snug">
            Visible to families in your area
          </p>
          <Link
            to="/caregiver/profile"
            className="w-full py-1.5 px-3 rounded-xl border border-[#0D9488] text-[#0D9488] hover:bg-teal-50 text-xs font-semibold transition-colors block text-center"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Today's Schedule</h2>
            <Link
              to="/caregiver/schedule"
              className="text-xs font-semibold text-[#0D9488] hover:text-[#0b7970] flex items-center gap-1 hover:underline"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {/* Shift 1 */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center gap-4 hover:border-teal-200 transition-all">
              <div className="w-18 h-14 rounded-xl bg-teal-50/80 border border-teal-100 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#0D9488]">09:00</span>
                <span className="text-[10px] font-semibold text-teal-600/80">AM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900">Senior Care • John D.</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">123 Galle Road, Colombo 03</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    4 hours
                  </span>
                  <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                    In Progress
                  </span>
                </div>
              </div>
            </div>

            {/* Shift 2 */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center gap-4 hover:border-teal-200 transition-all">
              <div className="w-18 h-14 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold text-slate-700">02:00</span>
                <span className="text-[10px] font-semibold text-slate-500">PM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900">Post-Surgery • Alice S.</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">456 Peradeniya Road, Kandy</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    3 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: New Job Requests (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">New Job Requests</h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs border-l-4 border-l-[#0D9488] space-y-4">
            {requestStatus === 'pending' ? (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Dementia Care needed
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Requested by Mark T.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-[#0D9488]">Rs. 3,500/hr</div>
                    <div className="text-[11px] text-slate-400">2 km away</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2 text-xs text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Tomorrow</span>
                  <span className="text-slate-300">•</span>
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>10:00 AM - 2:00 PM</span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setRequestStatus('accepted')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer text-center"
                  >
                    Accept Request
                  </button>
                  <button
                    onClick={() => setRequestStatus('declined')}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center"
                  >
                    Decline
                  </button>
                </div>
              </>
            ) : requestStatus === 'accepted' ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Request Accepted!</h4>
                <p className="text-xs text-slate-500">
                  The shift has been added to your schedule.
                </p>
                <button
                  onClick={() => setRequestStatus('pending')}
                  className="text-xs text-[#0D9488] font-semibold hover:underline mt-2 inline-block cursor-pointer"
                >
                  Reset demo
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <X className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Request Declined</h4>
                <p className="text-xs text-slate-500">The request was removed.</p>
                <button
                  onClick={() => setRequestStatus('pending')}
                  className="text-xs text-[#0D9488] font-semibold hover:underline mt-2 inline-block cursor-pointer"
                >
                  Reset demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
