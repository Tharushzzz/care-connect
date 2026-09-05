import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Navigation,
  MessageSquare
} from 'lucide-react';

interface Shift {
  id: string;
  month: string;
  day: string;
  title: string;
  family: string;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  time: string;
  duration: string;
  location: string;
  totalEst: string;
  isStarted?: boolean;
}

export const CaregiverSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Requests' | 'Cancelled'>('Upcoming');
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      month: 'OCT',
      day: '24',
      title: 'Senior Care',
      family: 'John Doe Family',
      status: 'Confirmed',
      time: '09:00 AM - 01:00 PM',
      duration: '4 hrs',
      location: '123 Galle Road, Colombo 03, Sri Lanka',
      totalEst: 'Rs. 14,000.00',
      isStarted: false
    },
    {
      id: '2',
      month: 'OCT',
      day: '26',
      title: 'Post-Surgery Support',
      family: 'Alice Smith Family',
      status: 'Confirmed',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hrs',
      location: '456 Peradeniya Road, Kandy, Sri Lanka',
      totalEst: 'Rs. 10,500.00',
      isStarted: false
    }
  ]);

  const toggleStartShift = (id: string) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isStarted: !s.isStarted } : s))
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          My Schedule
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View your upcoming shifts and past jobs.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-2xs inline-flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveTab('Upcoming')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Upcoming'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('Completed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Completed'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('Requests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'Requests'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Requests</span>
          <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
            1
          </span>
        </button>
        <button
          onClick={() => setActiveTab('Cancelled')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'Cancelled'
              ? 'bg-[#0A3D37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {activeTab === 'Upcoming' && (
          <>
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
                  {/* Left: Date + Main Info */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    {/* Date Block */}
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#E6F4F1] border border-teal-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold tracking-wider text-teal-800 uppercase">
                        {shift.month}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-teal-900 leading-tight">
                        {shift.day}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                          {shift.title} • {shift.family}
                        </h2>
                        <span className="bg-[#EBF5FF] text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {shift.status}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>
                            {shift.time} ({shift.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{shift.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Est Amount */}
                  <div className="text-left lg:text-right shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    <div className="text-lg sm:text-xl font-bold text-slate-900">
                      {shift.totalEst}
                    </div>
                    <div className="text-xs text-slate-400">Total Est.</div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(shift.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-slate-500" />
                      <span>Get Directions</span>
                    </a>
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
                      onClick={() => toggleStartShift(shift.id)}
                      className={`w-full sm:w-auto px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        shift.isStarted
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'bg-[#0D9488] hover:bg-[#0b7970] text-white shadow-xs'
                      }`}
                    >
                      {shift.isStarted ? 'End Shift' : 'Start Shift'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'Completed' && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">4 Completed Shifts this month</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All previous shift logs and notes have been verified and payouts are processed.
            </p>
          </div>
        )}

        {activeTab === 'Requests' && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs border-l-4 border-l-[#0D9488] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                  Pending Request
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Dementia Care • Mark T. Family
                </h3>
                <p className="text-xs text-slate-500 mt-1">Tomorrow • 10:00 AM - 2:00 PM (4 hrs)</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-[#0D9488]">Rs. 14,000.00</span>
                <p className="text-xs text-slate-400">Rs. 3,500/hr</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button className="px-5 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold">
                Accept Shift
              </button>
              <button className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold">
                Decline
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Cancelled' && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center text-slate-400 text-xs font-medium">
            No cancelled shifts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CaregiverSchedule;
