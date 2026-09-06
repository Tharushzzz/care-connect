import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Calendar, MessageSquare, Star, X, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import CaregiversData from '../../../config/Caregivers';

interface BookingItem {
  id: string;
  _id?: string;
  caregiverId: number;
  caregiverName: string;
  caregiverRole: string;
  caregiverAvatar: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'Pending' | 'Completed' | 'Cancelled';
  totalPrice: number;
  days: number;
}

export const Booking: React.FC = () => {
  const navigate = useNavigate();

  // Find caregiver images from config data
  const getCaregiverAvatar = (id: number) => {
    const cg = CaregiversData.find(c => c.id === id);
    return cg ? cg.profileImage : '';
  };

  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch bookings from MongoDB API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('careconnect_token');
        const res = await fetch('/api/bookings', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          const mapped: BookingItem[] = data.map((b: any) => ({
            id: b._id || b.id || b.bookingCode,
            _id: b._id,
            caregiverId: b.caregiverId,
            caregiverName: b.caregiverName,
            caregiverRole: b.caregiverRole,
            caregiverAvatar: b.caregiverAvatar || getCaregiverAvatar(b.caregiverId),
            serviceType: b.serviceType,
            startDate: b.startDate,
            endDate: b.endDate,
            startTime: b.startTime,
            endTime: b.endTime,
            status: b.status,
            totalPrice: b.totalPrice,
            days: b.days || 1,
          }));
          setBookings(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch bookings from API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Tab Filtering
  const [activeTab, setActiveTab] = useState<'All' | 'Scheduled' | 'Pending' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<BookingItem | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Optimistic update
      setBookings(prev =>
        prev.map(b => (b.id === bookingId || b._id === bookingId) ? { ...b, status: 'Cancelled' } : b)
      );

      try {
        const booking = bookings.find(b => b.id === bookingId || b._id === bookingId);
        const targetId = booking?._id || bookingId;
        await fetch(`/api/bookings/${targetId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Cancelled' }),
        });
      } catch (err) {
        console.error('Failed to cancel booking on server:', err);
      }
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a star rating.');
      return;
    }
    // Perform review submit action (here we just switch modals)
    setSelectedBookingForReview(null);
    setShowSuccessModal(true);
    // Reset form
    setRating(0);
    setComment('');
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'All' || booking.status === activeTab;
    const matchesSearch = booking.caregiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.caregiverRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: BookingItem['status']) => {
    switch (status) {
      case 'Scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF5FC] text-[#0686CD]">
            Scheduled
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">
            Pending
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DEF7EC] text-[#03543F]">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FDE8E8] text-[#9B1C1C]">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Sub-Header & Booking trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm sm:text-base text-gray-500">
            Manage and keep track of your upcoming and past care visits.
          </p>
        </div>
        <button
          onClick={() => navigate('/book-care')}
          className="bg-[#0686CD] hover:bg-[#0071A8] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all text-sm flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          Book New Care
        </button>
      </div>

      {/* Tabs and Search Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E4EDF5] space-y-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-gray-100 lg:border-none pb-3 lg:pb-0">
            {(['All', 'Scheduled', 'Pending', 'Completed', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0D182B] text-white'
                    : 'text-[#4A5568] hover:bg-gray-50 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search caregivers, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
            />
          </div>
        </div>
      </div>

      {/* Bookings Card List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl border border-[#E4EDF5] p-12 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#0686CD] animate-spin mb-3" />
            <p className="text-sm font-medium text-gray-600">Loading bookings from database...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E4EDF5] p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0D182B] mb-1">No bookings found</h3>
            <p className="text-sm text-gray-500">There are no bookings matching your criteria.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-[#E4EDF5] hover:border-[#BCE0F5] shadow-xs p-5 transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-5">
                {/* Caregiver and Service details */}
                <div className="flex items-start gap-4">
                  <img
                    src={booking.caregiverAvatar}
                    alt={booking.caregiverName}
                    className="w-14 h-14 rounded-full object-cover shadow-xs border border-gray-100 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#0D182B] hover:text-[#0686CD] transition-colors">
                        {booking.caregiverName}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{booking.caregiverRole}</p>
                    <Link
                      to={`/find-caregivers/${booking.caregiverId}`}
                      className="text-xs font-semibold text-[#0686CD] hover:underline inline-flex items-center gap-0.5"
                    >
                      View Profile
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Booking Scheduling Details */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm bg-[#F8FAFC] p-3.5 rounded-xl border border-gray-50 flex-1 max-w-xl">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Service</span>
                    <span className="font-semibold text-gray-700">{booking.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Duration</span>
                    <span className="font-semibold text-gray-700">{booking.days} Day{booking.days > 1 ? 's' : ''}</span>
                  </div>
                  <div className="col-span-2 mt-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Schedule</span>
                    <span className="font-semibold text-gray-700">
                      {booking.startDate} • {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </div>

                {/* Price and Actions panel */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center shrink-0 gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-gray-400 block">Total Price</span>
                    <span className="text-lg font-extrabold text-[#0D182B]">${booking.totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/messages')}
                      className="px-4 py-2 border border-[#D0D5DD] hover:border-[#0686CD] hover:bg-[#F4FBFF] text-gray-700 hover:text-[#0686CD] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message
                    </button>

                    {booking.status === 'Completed' && (
                      <button
                        onClick={() => setSelectedBookingForReview(booking)}
                        className="px-4 py-2 bg-[#0686CD] hover:bg-[#0071A8] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        Review
                      </button>
                    )}

                    {(booking.status === 'Scheduled' || booking.status === 'Pending') && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RATE & REVIEW MODAL */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#0D182B]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedBookingForReview(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-[#E3EDF6]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-5">
              <h3 className="text-lg font-bold text-[#0D182B]">Rate and Review</h3>
              <button
                onClick={() => setSelectedBookingForReview(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Caregiver info */}
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={selectedBookingForReview.caregiverAvatar}
                alt={selectedBookingForReview.caregiverName}
                className="w-12 h-12 rounded-full object-cover shadow-xs border border-gray-100"
              />
              <div>
                <h4 className="font-bold text-[#0D182B] text-sm">{selectedBookingForReview.caregiverName}</h4>
                <p className="text-xs text-gray-500">{selectedBookingForReview.caregiverRole}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              {/* Star Rating Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer focus:outline-none transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'text-[#F4B740] fill-[#F4B740]'
                            : 'text-gray-200 fill-none'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea review comment */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Share your experience (Optional)
                </label>
                <textarea
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE] resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForReview(null)}
                  className="flex-1 py-3 border border-[#D0D5DD] hover:bg-gray-50 text-[#344054] text-sm font-semibold rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0686CD] hover:bg-[#0071A8] text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer text-center"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* THANK YOU SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0D182B]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowSuccessModal(false)}
          />

          <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl z-10 text-center animate-in zoom-in-95 duration-200 border border-[#E3EDF6]">
            {/* Check Icon */}
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-extrabold text-[#0D182B] mb-2">Thank You for Your Feedback!</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Your review has been successfully submitted. Your feedback helps us maintain the quality of care in our community.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-[#0686CD] hover:bg-[#0071A8] text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Back to Bookings
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/messages');
                }}
                className="w-full py-3 border border-[#D0D5DD] hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
              >
                Message Caregiver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
