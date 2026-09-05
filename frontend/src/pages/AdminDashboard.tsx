import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  TrendingUp,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verifications' | 'bookings'>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarError, setAvatarError] = useState(false);

  const adminPhoto = user?.avatar || (user as any)?.profileImage;

  useEffect(() => {
    setAvatarError(false);
  }, [adminPhoto]);

  // Live users and bookings from MongoDB
  const [userList, setUserList] = useState<any[]>([]);
  const [bookingList, setBookingList] = useState<any[]>([]);

  // Fetch users and bookings from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApproveCaregiver = async (id: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id || u._id === id ? { ...u, status: 'Verified' } : u))
    );

    try {
      await fetch(`/api/auth/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Verified' }),
      });
    } catch (err) {
      console.error('Failed to update verification status in MongoDB:', err);
    }
  };

  const filteredUsers = userList.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingVerifications = userList.filter((u) => u.status === 'Pending Verification');

  const filteredBookings = bookingList.filter(
    (b) =>
      (b.bookingCode && b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.caregiverName && b.caregiverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.serviceType && b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
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
                onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-300'
                }`}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => { setActiveTab('users'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'users' ? 'bg-purple-600 text-white' : 'text-slate-300'
                }`}
              >
                <Users className="w-4.5 h-4.5" />
                <span>User Management</span>
              </button>
              <button
                onClick={() => { setActiveTab('verifications'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'verifications' ? 'bg-purple-600 text-white' : 'text-slate-300'
                }`}
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>Verifications</span>
              </button>
              <button
                onClick={() => { setActiveTab('bookings'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                  activeTab === 'bookings' ? 'bg-purple-600 text-white' : 'text-slate-300'
                }`}
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Platform Bookings</span>
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
            v2.4
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
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
            onClick={() => setActiveTab('users')}
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
            onClick={() => setActiveTab('verifications')}
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
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                {pendingVerifications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
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
                CareConnect System & Platform Oversight
              </p>
            </div>
          </div>

          {/* Right Header: User info */}
          <div className="flex items-center gap-3">
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
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{userList.length}</h3>
                <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% this month
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Caregivers</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{pendingVerifications.length}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Awaiting background check</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</p>
                <h3 className="text-2xl font-bold text-[#0686CD] mt-1">28</h3>
                <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 94% fulfillment
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0686CD] flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Revenue</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">$4,850</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Estimated gross volume</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Tab header & filter */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {activeTab === 'overview' && 'System Overview & User Directory'}
                  {activeTab === 'users' && 'Registered Users Directory'}
                  {activeTab === 'verifications' && 'Caregiver Verification Requests'}
                  {activeTab === 'bookings' && 'All Platform Care Bookings'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage platform users, credentials, roles, and authorization status
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, role..."
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Content Table */}
            {activeTab === 'bookings' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-6">Booking Code</th>
                      <th className="py-3 px-6">Caregiver</th>
                      <th className="py-3 px-6">Service Type</th>
                      <th className="py-3 px-6">Schedule</th>
                      <th className="py-3 px-6">Amount</th>
                      <th className="py-3 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                          No bookings found in MongoDB database
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
                                <img src={b.caregiverAvatar} alt={b.caregiverName} className="w-7 h-7 rounded-full object-cover" />
                              )}
                              <div>
                                <p className="font-semibold text-slate-900 text-xs">{b.caregiverName}</p>
                                <p className="text-[11px] text-slate-500">{b.caregiverRole}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-700 font-medium">
                            {b.serviceType}
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-500">
                            {b.startDate} • {b.startTime || '09:00 AM'}
                          </td>
                          <td className="py-3.5 px-6 text-xs font-bold text-slate-800">
                            Rs. {Number(b.totalPrice || 0).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                b.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : b.status === 'Scheduled'
                                  ? 'bg-sky-50 text-sky-700'
                                  : b.status === 'Cancelled'
                                  ? 'bg-rose-50 text-rose-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-6">User</th>
                      <th className="py-3 px-6">Role</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6">Joined Date</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {(activeTab === 'verifications' ? pendingVerifications : filteredUsers).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                          {activeTab === 'verifications'
                            ? 'No pending caregiver verification requests'
                            : 'No users matching your search criteria'}
                        </td>
                      </tr>
                    ) : (
                      (activeTab === 'verifications' ? pendingVerifications : filteredUsers).map((item) => (
                        <tr key={item.id || item._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center uppercase">
                                {item.name.charAt(0)}
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
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.status === 'Verified' || item.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {item.status === 'Verified' || item.status === 'Active' ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Clock className="w-3 h-3 text-amber-600" />
                              )}
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-xs text-slate-500">{item.joined}</td>
                          <td className="py-3.5 px-6 text-right">
                            {item.status === 'Pending Verification' ? (
                              <button
                                onClick={() => handleApproveCaregiver(item.id || item._id)}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 font-medium">Standard</span>
                            )}
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
