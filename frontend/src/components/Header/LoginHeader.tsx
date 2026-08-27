import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/Logo.svg';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  Calendar,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  CheckCheck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  plan?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'booking' | 'message' | 'reminder' | 'system';
}

export interface LoginHeaderProps {
  user?: UserProfile;
  notifications?: NotificationItem[];
  unreadMessagesCount?: number;
  onLogout?: () => void;
}

const defaultUser: UserProfile = {
  name: 'Eleanor Vance',
  email: 'eleanor.vance@example.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  role: 'Family Care Manager',
  plan: 'Family Plan',
};

const defaultNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Booking Confirmed',
    description: 'Sarah Jenkins accepted your care request for Friday at 9:00 AM.',
    time: '10 min ago',
    read: false,
    type: 'booking',
  },
  {
    id: 'n2',
    title: 'New Care Message',
    description: 'Michael sent an update regarding today’s medication routine.',
    time: '45 min ago',
    read: false,
    type: 'message',
  },
  {
    id: 'n3',
    title: 'Upcoming Appointment Reminder',
    description: 'Vitals check & physical therapy scheduled for tomorrow at 2:00 PM.',
    time: '2 hours ago',
    read: true,
    type: 'reminder',
  },
];

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  user = defaultUser,
  notifications: initialNotifications = defaultNotifications,
  unreadMessagesCount = 2,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const headerRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const closeAllDropdowns = () => {
    setIsUserDropdownOpen(false);
    setIsNotificationOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close menus on route changes
  useEffect(() => {
    closeAllDropdowns();
  }, [location.pathname]);

  // Click outside and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserDropdownOpen(false);
      }

      if (notificationMenuRef.current && !notificationMenuRef.current.contains(target)) {
        setIsNotificationOpen(false);
      }

      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleLogout = () => {
    closeAllDropdowns();
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  const navLinks = [
    { label: 'Find Caregivers', path: '/find-caregivers' },
    { label: 'My Bookings', path: '/bookings' },
    { label: 'Care Plans', path: '/care-plans' },
    { label: 'Messages', path: '/messages' },
  ];

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'booking':
        return <CheckCircle2 className="w-4 h-4 text-[#0686CD]" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#0686CD]" />;
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full select-none">
      {/* Main navigation bar */}
      <div className="bg-[#F7FBFE]/95 backdrop-blur-md border-b border-[#E4EDF5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-4">
          
          {/* Left Brand & Logo */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
              onClick={closeAllDropdowns}
            >
              <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-[#E0EBF3] flex items-center justify-center transition-all duration-200 group-hover:shadow-md group-hover:scale-105">
                <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#0D182B] group-hover:text-[#0686CD] transition-colors">
                  CareConnect
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF5FC] text-[#0686CD] border border-[#CDE7F7]">
              <Sparkles className="w-3 h-3 text-[#0686CD]" />
              Member Portal
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#0686CD] bg-[#EAF5FC]/80 font-semibold'
                      : 'text-[#4A5568] hover:text-[#0686CD] hover:bg-[#F0F6FA]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0686CD] rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Link: Messages */}
            <Link
              to="/messages"
              className="relative p-2 rounded-xl text-[#4A5568] hover:text-[#0686CD] hover:bg-[#EAF5FC] transition-colors duration-200 flex items-center justify-center"
              aria-label="Direct Messages"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-[#0686CD] rounded-full ring-2 ring-white shadow-xs">
                  {unreadMessagesCount}
                </span>
              )}
            </Link>

            {/* Notifications Popover Trigger & Dropdown */}
            <div ref={notificationMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserDropdownOpen(false);
                }}
                className={`relative p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isNotificationOpen
                    ? 'bg-[#EAF5FC] text-[#0686CD]'
                    : 'text-[#4A5568] hover:text-[#0686CD] hover:bg-[#EAF5FC]'
                }`}
                aria-label="Notifications"
                aria-expanded={isNotificationOpen}
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4.5 min-w-4.5 items-center justify-center px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white shadow-xs animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header */}
                  <div className="px-4 py-3.5 bg-[#F9FBFE] border-b border-[#E9F0F6] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#0D182B]">Notifications</span>
                      {unreadNotificationsCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[#EAF5FC] text-[#0686CD] rounded-full">
                          {unreadNotificationsCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs font-medium text-[#0686CD] hover:text-[#0071A8] flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* List of notifications */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F5FA]">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center px-4">
                        <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm font-medium text-gray-600">No new notifications</p>
                        <p className="text-xs text-gray-400 mt-0.5">We'll alert you here when care updates arrive</p>
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => markNotificationAsRead(item.id)}
                          className={`p-3.5 hover:bg-[#F6FAFD] transition-colors cursor-pointer flex gap-3 items-start ${
                            !item.read ? 'bg-[#F2F8FD]/60' : ''
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-white shadow-xs border border-[#E5EEF5] shrink-0 mt-0.5">
                            {getNotificationIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <p className={`text-xs font-semibold truncate ${!item.read ? 'text-[#0D182B]' : 'text-gray-700'}`}>
                                {item.title}
                              </p>
                              <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-[#0686CD] shrink-0 mt-1.5 ring-2 ring-[#0686CD]/20" />
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-2.5 bg-[#F9FBFE] border-t border-[#E9F0F6] text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-xs font-semibold text-[#0686CD] hover:text-[#0071A8] transition-colors inline-flex items-center gap-1"
                    >
                      View all activity
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="hidden sm:block h-6 w-px bg-[#E2EAF1]" />

            {/* User Profile Pill & Dropdown */}
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setIsNotificationOpen(false);
                }}
                className={`flex items-center gap-2.5 p-1 sm:pl-1.5 sm:pr-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                  isUserDropdownOpen
                    ? 'bg-white border-[#0686CD] shadow-sm ring-2 ring-[#0686CD]/10'
                    : 'bg-white/90 border-[#E0EBF3] hover:border-[#BCE0F5] hover:bg-white'
                }`}
                aria-label="User Account Menu"
                aria-expanded={isUserDropdownOpen}
              >
                {/* Avatar with online status */}
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full object-cover ring-2 ring-white"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#EAF5FC] text-[#0686CD] flex items-center justify-center font-bold text-xs ring-2 ring-white">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                {/* User info (visible on md+) */}
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0D182B] leading-tight truncate max-w-28 xl:max-w-36">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium leading-none mt-0.5 truncate max-w-28 xl:max-w-36">
                    {user.role || 'Member'}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isUserDropdownOpen ? 'rotate-180 text-[#0686CD]' : ''
                  }`}
                />
              </button>

              {/* User Dropdown Menu Card */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Account Header */}
                  <div className="p-4 bg-gradient-to-br from-[#F5FAFE] to-[#EAF5FD] border-b border-[#E2EEF7]">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-3 ring-white shadow-xs"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#0686CD] text-white flex items-center justify-center font-bold text-base ring-3 ring-white shadow-xs">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#0D182B] truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#0686CD]/10 text-[#0686CD]">
                            {user.plan || 'Care Member'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu Items */}
                  <div className="p-2 space-y-0.5 text-sm">
                    <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Care Management
                    </div>

                    <Link
                      to="/bookings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-[#0686CD]" />
                      <span>My Bookings</span>
                    </Link>

                    <Link
                      to="/saved-caregivers"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Caregivers</span>
                    </Link>

                    <Link
                      to="/care-plans"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <span>Care Plans & Vitals</span>
                    </Link>

                    <div className="my-1.5 border-t border-[#EEF4F9]" />

                    <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Preferences
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Personal Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span>Account Settings</span>
                    </Link>

                    <Link
                      to="/support"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  {/* Sign out section */}
                  <div className="p-2 border-t border-[#EEF4F9] bg-[#FAFCFE]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-medium transition-colors cursor-pointer text-sm"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsUserDropdownOpen(false);
                setIsNotificationOpen(false);
              }}
              className="lg:hidden p-2 rounded-xl text-[#4A5568] hover:text-[#0686CD] hover:bg-[#EAF5FC] transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 top-17 bg-black/30 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-down Menu Drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2EDF7] shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* User profile banner on mobile */}
          <div className="p-3.5 bg-gradient-to-r from-[#F4FAFE] to-[#E9F4FC] rounded-2xl flex items-center justify-between gap-3 border border-[#E1EEF8]">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#0686CD] text-white flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-[#0D182B]">{user.name}</div>
                <div className="text-xs text-gray-500 truncate max-w-44">{user.email}</div>
              </div>
            </div>
            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-white text-[#0686CD] shadow-xs border border-[#D9EAF5]">
              {user.plan || 'Member'}
            </span>
          </div>

          {/* Quick shortcuts */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/messages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F6FAFD] hover:bg-[#EAF5FC] border border-[#E3EDF5] text-xs font-semibold text-[#0D182B] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#0686CD]" />
              <span>Messages ({unreadMessagesCount})</span>
            </Link>

            <Link
              to="/notifications"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F6FAFD] hover:bg-[#EAF5FC] border border-[#E3EDF5] text-xs font-semibold text-[#0D182B] transition-colors"
            >
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Alerts ({unreadNotificationsCount})</span>
            </Link>
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-1">
            <div className="px-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Main Menu
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EAF5FC] text-[#0686CD] font-semibold'
                      : 'text-gray-700 hover:bg-[#F6FAFD]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0686CD]" />}
                </Link>
              );
            })}
          </div>

          {/* Account & Care Management Links */}
          <div className="space-y-1 pt-2 border-t border-[#EEF4F9]">
            <div className="px-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Care & Settings
            </div>

            <Link
              to="/saved-caregivers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#F6FAFD] transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved Caregivers</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#F6FAFD] transition-colors"
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>Profile Information</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#F6FAFD] transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Account Settings</span>
            </Link>

            <Link
              to="/support"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#F6FAFD] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-gray-500" />
              <span>Help & Support Center</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="pt-2 border-t border-[#EEF4F9]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50/70 hover:bg-rose-100/70 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
