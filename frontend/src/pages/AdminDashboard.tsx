import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo/Logo.svg';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Calendar,
  DollarSign,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search,
  Menu,
  X,
  Trash2,
  Eye,
  AlertTriangle,
  UserCheck,
  UserX,
  RefreshCw,
  Check,
  Phone,
  Mail,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verifications' | 'bookings'>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'caregiver' | 'family' | 'admin'>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [avatarError, setAvatarError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Feedback
  const [selectedUserModal, setSelectedUserModal] = useState<any | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionLabel: string;
    isDangerous?: boolean;
    onConfirm: () => void;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const adminPhoto = user?.avatar || (user as any)?.profileImage;

  useEffect(() => {
    setAvatarError(false);
  }, [adminPhoto]);

  // Synchronize activeTab with URL route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/users')) {
      setActiveTab('users');
    } else if (path.includes('/admin/verifications')) {
      setActiveTab('verifications');
    } else if (path.includes('/admin/bookings')) {
      setActiveTab('bookings');
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'overview' | 'users' | 'verifications' | 'bookings') => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
    if (tab === 'overview') navigate('/admin');
    else navigate(`/admin/${tab}`);
  };

  // Live users and bookings from MongoDB
  const [userList, setUserList] = useState<any[]>([]);
  const [bookingList, setBookingList] = useState<any[]>([]);

  // Fetch users and bookings from backend API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [usersRes, bookingsRes] = await Promise.all([
        fetch('/api/auth/users'),
        fetch('/api/bookings'),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUserList(usersData);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookingList(bookingsData);
      }
    } catch (err) {
      console.error('Error fetching admin data from MongoDB:', err);
      showToast('Failed to load live data from database', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Approve Caregiver
  const handleApproveCaregiver = async (id: string, name?: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id || u._id === id ? { ...u, status: 'Verified' } : u))
    );

    try {
      const res = await fetch(`/api/auth/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Verified' }),
      });

      if (!res.ok) throw new Error('Update failed');
      showToast(`${name || 'Caregiver'} approved! Their profile is now live for bookings.`, 'success');
    } catch (err) {
      console.error('Failed to update verification status in MongoDB:', err);
      showToast('Failed to approve caregiver in database', 'error');
      fetchData();
    }
  };

  // Reject Caregiver
  const handleRejectCaregiver = async (id: string, name?: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id || u._id === id ? { ...u, status: 'Rejected' } : u))
    );

    try {
      const res = await fetch(`/api/auth/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' }),
      });

      if (!res.ok) throw new Error('Update failed');
      showToast(`${name || 'Caregiver'} verification request rejected.`, 'info');
    } catch (err) {
      console.error('Failed to reject caregiver in MongoDB:', err);
      showToast('Failed to update status in database', 'error');
      fetchData();
    }
  };

  // Revoke / Reset to Pending
  const handleRevokeCaregiver = async (id: string, name?: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id || u._id === id ? { ...u, status: 'Pending Verification' } : u))
    );

    try {
      const res = await fetch(`/api/auth/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Pending Verification' }),
      });

      if (!res.ok) throw new Error('Update failed');
      showToast(`Verification revoked for ${name || 'Caregiver'}. Account set to Pending.`, 'info');
    } catch (err) {
      console.error('Failed to revoke verification:', err);
      showToast('Failed to revoke verification', 'error');
      fetchData();
    }
  };

  // Delete User
  const confirmDeleteUser = (id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete User Account',
      message: `Are you sure you want to permanently delete "${name}"? If this user is a registered caregiver, their public profile and listings will also be removed.`,
      actionLabel: 'Delete User',
      isDangerous: true,
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          setUserList((prev) => prev.filter((u) => u.id !== id && u._id !== id));
          showToast(`User "${name}" has been permanently deleted.`, 'success');
        } catch (err) {
          console.error('Failed to delete user:', err);
          showToast('Failed to delete user from database', 'error');
        }
      },
    });
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    setBookingList((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
    );

    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      showToast(`Booking marked as ${newStatus}`, 'success');
    } catch (err) {
      console.error('Failed to update booking status:', err);
      showToast('Failed to update booking in database', 'error');
      fetchData();
    }
  };

  // Delete Booking
  const confirmDeleteBooking = (bookingId: string, code: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Booking Record',
      message: `Are you sure you want to remove booking "${code || bookingId}" from the platform records?`,
      actionLabel: 'Delete Booking',
      isDangerous: true,
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          setBookingList((prev) => prev.filter((b) => b._id !== bookingId));
          showToast(`Booking record deleted successfully.`, 'success');
        } catch (err) {
          console.error('Failed to delete booking:', err);
          showToast('Failed to delete booking', 'error');
        }
      },
    });
  };

  // Access check: Only admin
  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
          <p className="text-sm text-slate-600">
            You do not have administrative permissions to view this portal. Please sign in with an Administrator account.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/"
              className="w-full py-2.5 px-4 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Users
  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Pending Caregiver Verifications
  const pendingVerifications = userList.filter(
    (u) => u.role === 'caregiver' && (u.status === 'Pending Verification' || !u.status)
  );

  // Filtered Bookings
  const filteredBookings = bookingList.filter((b) => {
    const matchesSearch =
      (b.bookingCode && b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.caregiverName && b.caregiverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.userName && b.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.serviceType && b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate live platform gross volume
  const totalGrossRevenue = bookingList.reduce(
    (sum, b) => sum + (Number(b.totalPrice) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700 text-sm">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.isDangerous ? 'bg-rose-50 text-rose-600' : 'bg-purple-50 text-purple-600'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{confirmModal.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{confirmModal.message}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer ${
                  confirmModal.isDangerous
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Inspection Modal */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 font-bold text-base flex items-center justify-center uppercase overflow-hidden">
                  {selectedUserModal.avatar ? (
                    <img src={selectedUserModal.avatar} alt={selectedUserModal.name} className="w-full h-full object-cover" />
                  ) : (
                    selectedUserModal.name?.charAt(0) || 'U'
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedUserModal.name}</h3>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mt-0.5 ${
                      selectedUserModal.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : selectedUserModal.role === 'caregiver'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-sky-50 text-sky-700'
                    }`}
                  >
                    {selectedUserModal.role}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-medium">Email Address</span>
                  <span className="font-semibold text-slate-800 break-all">{selectedUserModal.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Phone</span>
                  <span className="font-semibold text-slate-800">{selectedUserModal.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Status</span>
                  <span
                    className={`font-semibold inline-flex items-center gap-1 mt-0.5 ${
                      selectedUserModal.status === 'Verified' || selectedUserModal.status === 'Active'
                        ? 'text-emerald-700'
                        : selectedUserModal.status === 'Rejected'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {selectedUserModal.status || 'Active'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Joined Date</span>
                  <span className="font-semibold text-slate-800">{selectedUserModal.joined}</span>
                </div>
              </div>

              {selectedUserModal.role === 'caregiver' && (
                <div className="space-y-2 pt-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                    Caregiver Credentials
                  </h4>
                  <div className="bg-teal-50/50 border border-teal-100 p-3 rounded-xl space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Professional Title:</span>
                      <span className="font-semibold text-slate-900">{selectedUserModal.title || 'Caregiver'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hourly Rate:</span>
                      <span className="font-semibold text-[#0D9488]">
                        Rs. {Number(selectedUserModal.hourlyRate || 2500).toLocaleString()}/hr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedUserModal.experience ? `${selectedUserModal.experience} years` : '1+ year'}
                      </span>
                    </div>
                    {selectedUserModal.bio && (
                      <div className="pt-2 border-t border-teal-100/60">
                        <span className="text-slate-500 block mb-0.5">Bio / Statement:</span>
                        <p className="text-slate-700 italic leading-relaxed">{selectedUserModal.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {selectedUserModal.role === 'caregiver' && selectedUserModal.status === 'Pending Verification' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleApproveCaregiver(selectedUserModal.id || selectedUserModal._id, selectedUserModal.name);
                      setSelectedUserModal(null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Caregiver
                  </button>
                  <button
                    onClick={() => {
                      handleRejectCaregiver(selectedUserModal.id || selectedUserModal._id, selectedUserModal.name);
                      setSelectedUserModal(null);
                    }}
                    className="px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-[#0F172A] text-white select-none shadow-2xl z-10">
            <div className="h-17 px-6 flex items-center justify-between border-b border-white/10">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white p-1">
                  <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold text-white">CareConnect</span>
              </Link>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
              <button
                onClick={() => handleTabChange('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => handleTabChange('users')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'users' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4.5 h-4.5" />
                  <span>User Management</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  {userList.length}
                </span>
              </button>
              <button
                onClick={() => handleTabChange('verifications')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'verifications' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Verifications</span>
                </div>
                {pendingVerifications.length > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {pendingVerifications.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('bookings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'bookings' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Platform Bookings</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  {bookingList.length}
                </span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (Royal Indigo / Slate) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0F172A] text-white shrink-0 select-none shadow-xl border-r border-[#1E293B]">
        {/* Brand */}
        <div className="h-17 px-6 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              CareConnect
            </span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Admin Console
          </p>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
            Super Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => handleTabChange('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => handleTabChange('users')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4.5 h-4.5" />
              <span>User Management</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
              {userList.length}
            </span>
          </button>

          <button
            onClick={() => handleTabChange('verifications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'verifications'
                ? 'bg-purple-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Verifications</span>
            </div>
            {pendingVerifications.length > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-4.5 text-center animate-pulse">
                {pendingVerifications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabChange('bookings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-purple-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4.5 h-4.5" />
              <span>Platform Bookings</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
              {bookingList.length}
            </span>
          </button>

          <div className="pt-4 pb-2">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Quick Links
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-purple-400" />
            <span>Return to Site</span>
          </Link>
        </nav>

        {/* Sign Out Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-rose-400 font-medium transition-all text-sm cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-17 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Admin Management Portal</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Super Admin
                </span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Caregiver Verification, User Management & System Oversight
              </p>
            </div>
          </div>

          {/* Right Header: User info & Refresh */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              title="Refresh Data"
              className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors border border-slate-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-purple-600' : ''}`} />
            </button>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full ring-2 ring-purple-200 overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-sm uppercase">
                {adminPhoto && !avatarError ? (
                  <img
                    src={adminPhoto}
                    alt={user?.name || 'Administrator'}
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name ? user.name.charAt(0) : 'A'}</span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-purple-600 font-semibold">{user?.email || 'admin@admin.com'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => handleTabChange('users')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-purple-300 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{userList.length}</h3>
                <p className="text-xs text-purple-600 font-medium mt-0.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Manage registered accounts
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div
              onClick={() => handleTabChange('verifications')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-amber-300 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Caregivers</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{pendingVerifications.length}</h3>
                <p className="text-xs text-amber-600 font-medium mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Awaiting admin approval
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div
              onClick={() => handleTabChange('bookings')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-sky-300 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</p>
                <h3 className="text-2xl font-bold text-[#0686CD] mt-1">{bookingList.length}</h3>
                <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active bookings in MongoDB
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0686CD] flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Gross Volume</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                  Rs. {totalGrossRevenue.toLocaleString()}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Calculated total care bookings</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Main Tab Content Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Tab header & filter */}
            <div className="p-4 sm:p-6 border-b border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {activeTab === 'overview' && 'System Overview & User Directory'}
                    {activeTab === 'users' && 'User Management & Role Directory'}
                    {activeTab === 'verifications' && 'Caregiver Verification Requests'}
                    {activeTab === 'bookings' && 'All Platform Care Bookings'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeTab === 'verifications'
                      ? 'Review newly registered caregivers, verify credentials, and approve their public listings'
                      : 'Manage accounts, review credentials, oversee schedules, and monitor platform operations'}
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, email, role, phone..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Sub-Filters for Users Tab */}
              {(activeTab === 'users' || activeTab === 'overview') && (
                <div className="flex items-center gap-2 overflow-x-auto pt-2 text-xs">
                  <span className="text-slate-400 font-medium mr-1">Filter Role:</span>
                  {(['all', 'caregiver', 'family', 'admin'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setUserRoleFilter(r)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer capitalize ${
                        userRoleFilter === r
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r === 'all' ? `All (${userList.length})` : `${r}s (${userList.filter((u) => u.role === r).length})`}
                    </button>
                  ))}
                </div>
              )}

              {/* Sub-Filters for Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="flex items-center gap-2 overflow-x-auto pt-2 text-xs">
                  <span className="text-slate-400 font-medium mr-1">Filter Status:</span>
                  {['all', 'Pending', 'Scheduled', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer capitalize ${
                        bookingStatusFilter === st
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'all'
                        ? `All (${bookingList.length})`
                        : `${st} (${bookingList.filter((b) => b.status === st).length})`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TAB: VERIFICATIONS (Caregiver Approval Center) */}
            {activeTab === 'verifications' ? (
              <div className="p-4 sm:p-6 space-y-4">
                {pendingVerifications.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">All Caregiver Approvals Clear</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      There are currently no caregivers waiting for admin verification. When new caregivers sign up, their applications will appear here for review.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {pendingVerifications.map((cg) => (
                      <div
                        key={cg.id || cg._id}
                        className="bg-white rounded-2xl border-2 border-amber-200/80 p-5 shadow-sm space-y-4 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          {/* Caregiver Info */}
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#0D9488] font-bold text-base flex items-center justify-center uppercase shrink-0 overflow-hidden ring-2 ring-teal-200">
                              {cg.avatar ? (
                                <img src={cg.avatar} alt={cg.name} className="w-full h-full object-cover" />
                              ) : (
                                cg.name?.charAt(0) || 'C'
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-bold text-slate-900">{cg.name}</h3>
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Needs Approval
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">{cg.title || 'Professional Caregiver'}</p>
                              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                                  {cg.email}
                                </span>
                                {cg.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    {cg.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Rate & Experience */}
                          <div className="flex items-center gap-6 self-stretch md:self-auto bg-slate-50 p-3 rounded-xl border border-slate-100 shrink-0">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Rate</span>
                              <span className="text-sm font-bold text-[#0D9488]">
                                Rs. {Number(cg.hourlyRate || 2500).toLocaleString()}/hr
                              </span>
                            </div>
                            <div className="border-l border-slate-200 pl-4">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Experience</span>
                              <span className="text-sm font-bold text-slate-800">
                                {cg.experience ? `${cg.experience} yrs` : '1 yr'}
                              </span>
                            </div>
                            <div className="border-l border-slate-200 pl-4">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Joined</span>
                              <span className="text-xs font-semibold text-slate-600">{cg.joined}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bio & Credentials */}
                        {cg.bio && (
                          <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-100/60 text-xs text-slate-700">
                            <span className="font-semibold text-amber-900 block mb-0.5">Professional Statement:</span>
                            <p className="italic leading-relaxed">{cg.bio}</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedUserModal(cg)}
                            className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Full Application</span>
                          </button>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleRejectCaregiver(cg.id || cg._id, cg.name)}
                              className="px-4 py-2 rounded-xl border border-slate-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApproveCaregiver(cg.id || cg._id, cg.name)}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Approve & Verify Listing</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'bookings' ? (
              /* TAB: BOOKINGS */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-6">Booking Code</th>
                      <th className="py-3 px-6">Caregiver</th>
                      <th className="py-3 px-6">Client</th>
                      <th className="py-3 px-6">Service & Schedule</th>
                      <th className="py-3 px-6">Amount</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                          No bookings matching criteria
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b._id || b.bookingCode} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6 font-mono text-xs font-semibold text-purple-700">
                            {b.bookingCode || 'BK_001'}
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-2.5">
                              {b.caregiverAvatar && (
                                <img
                                  src={b.caregiverAvatar}
                                  alt={b.caregiverName}
                                  className="w-7 h-7 rounded-full object-cover shrink-0"
                                />
                              )}
                              <div>
                                <p className="font-semibold text-slate-900 text-xs">{b.caregiverName}</p>
                                <p className="text-[11px] text-slate-500">{b.caregiverRole}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-700 font-medium">
                            {b.userName || 'Family Member'}
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-500">
                            <p className="font-medium text-slate-800">{b.serviceType}</p>
                            <p className="text-[11px]">
                              {b.startDate} • {b.startTime || '09:00 AM'}
                            </p>
                          </td>
                          <td className="py-3.5 px-6 text-xs font-bold text-slate-800">
                            Rs. {Number(b.totalPrice || 0).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                b.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : b.status === 'Scheduled' || b.status === 'Accepted'
                                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                  : b.status === 'Cancelled' || b.status === 'Declined'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {b.status !== 'Completed' && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBookingStatus(b._id, 'Completed')}
                                  title="Mark Completed"
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {b.status !== 'Cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBookingStatus(b._id, 'Cancelled')}
                                  title="Cancel Booking"
                                  className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => confirmDeleteBooking(b._id, b.bookingCode || 'booking')}
                                title="Delete Booking Record"
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* TAB: USERS & OVERVIEW DIRECTORY */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-6">User</th>
                      <th className="py-3 px-6">Role</th>
                      <th className="py-3 px-6">Approval / Status</th>
                      <th className="py-3 px-6">Phone</th>
                      <th className="py-3 px-6">Joined Date</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                          No users matching your search criteria
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((item) => (
                        <tr key={item.id || item._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center uppercase shrink-0 overflow-hidden">
                                {item.avatar ? (
                                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  item.name?.charAt(0) || 'U'
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-xs">{item.name}</p>
                                <p className="text-[11px] text-slate-500">{item.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                item.role === 'admin'
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                  : item.role === 'caregiver'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-sky-50 text-sky-700 border border-sky-200'
                              }`}
                            >
                              {item.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                item.status === 'Verified' || (item.role !== 'caregiver' && item.status === 'Active')
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : item.status === 'Rejected'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {item.status === 'Verified' || (item.role !== 'caregiver' && item.status === 'Active') ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : item.status === 'Rejected' ? (
                                <X className="w-3.5 h-3.5 text-rose-600" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                              )}
                              {item.status || 'Active'}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-600">{item.phone || '—'}</td>
                          <td className="py-3.5 px-6 text-xs text-slate-500">{item.joined}</td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Details */}
                              <button
                                type="button"
                                onClick={() => setSelectedUserModal(item)}
                                title="Inspect Details"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Quick Approve if Pending */}
                              {item.role === 'caregiver' && item.status === 'Pending Verification' && (
                                <button
                                  type="button"
                                  onClick={() => handleApproveCaregiver(item.id || item._id, item.name)}
                                  title="Approve Caregiver"
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {/* Revoke if Verified */}
                              {item.role === 'caregiver' && item.status === 'Verified' && (
                                <button
                                  type="button"
                                  onClick={() => handleRevokeCaregiver(item.id || item._id, item.name)}
                                  title="Revoke Verification"
                                  className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                                >
                                  <UserX className="w-4 h-4" />
                                </button>
                              )}

                              {/* Delete User */}
                              {item.role !== 'admin' && (
                                <button
                                  type="button"
                                  onClick={() => confirmDeleteUser(item.id || item._id, item.name)}
                                  title="Delete User"
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
