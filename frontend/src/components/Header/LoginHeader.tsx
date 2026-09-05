import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/Logo.svg';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  User as UserIcon,
  Calendar,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  CheckCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import UsersData from '../../../config/User';
import type { User } from '../../../config/User';
import NotificationsData from '../../../config/Notifications';
import type { NotificationItem } from '../../../config/Notifications';
import MessagesData from '../../../config/Messages';
import type { MessageItem } from '../../../config/Messages';

export type { NotificationItem, MessageItem };

export interface LoginHeaderProps {
  user?: User;
  notifications?: NotificationItem[];
  unreadMessagesCount?: number;
  onLogout?: () => void;
}

const defaultUser: User = UsersData[0];
const defaultNotifications: NotificationItem[] = NotificationsData;
const defaultUnreadMessagesCount: number = MessagesData.filter((m) => m.unread).length;

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  user = defaultUser,
  notifications: initialNotifications = defaultNotifications,
  unreadMessagesCount = defaultUnreadMessagesCount,
  onLogout,
}) => {
  const isCaregiver = user.role === 'caregiver';
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

  const handleSectionClick = (sectionId: string) => {
    closeAllDropdowns();
    navigate('/');

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

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
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95 shrink-0"
            onClick={() => {
              closeAllDropdowns();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-[#E0EBF3] flex items-center justify-center transition-all duration-200 group-hover:shadow-md group-hover:scale-105">
              <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0D182B] group-hover:text-[#0686CD] transition-colors">
              CareConnect
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg">
            <button
              onClick={() => handleSectionClick('works')}
              className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]"
            >
              How it Works
              <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() => handleSectionClick('services')}
              className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]"
            >
              Services
              <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() => handleSectionClick('why-us')}
              className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]"
            >
              Why Us
              <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>

            <Link
              to="/find-caregivers"
              onClick={() => {
                closeAllDropdowns();
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              }}
              className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]"
            >
              Find Caregiver
              <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Caregiver Dashboard shortcut button */}
            {isCaregiver && (
              <Link
                to="/caregiver"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0686CD] hover:bg-[#0071A8] text-white text-xs font-semibold shadow-xs transition-all hover:shadow-md"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Caregiver Dashboard</span>
              </Link>
            )}

            {/* Quick Link: Messages */}
            <Link
              to={isCaregiver ? "/caregiver/messages" : "/messages"}
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
                  <span className="absolute top-1 right-1 flex h-4.5 min-w-4.5 items-center justify-center px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white shadow-xs">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown Panel */}
              {isNotificationOpen && (
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-18 sm:top-full mt-0 sm:mt-3 w-auto sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                    <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#EAF5FC] text-[#0686CD] flex items-center justify-center font-bold text-xs ring-2 ring-white uppercase">
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
                  <span className="text-[10px] text-gray-500 font-medium capitalize leading-none mt-0.5 truncate max-w-28 xl:max-w-36">
                    {user.role}
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
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-18 sm:top-full mt-0 sm:mt-3 w-auto sm:w-72 max-w-sm ml-auto bg-white rounded-2xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                        <div className="w-12 h-12 rounded-full bg-[#0686CD] text-white flex items-center justify-center font-bold text-base ring-3 ring-white shadow-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#0D182B] truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#0686CD]/10 text-[#0686CD] capitalize">
                            {user.role} account
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu Items */}
                  <div className="p-2 space-y-0.5 text-sm">
                    {isCaregiver ? (
                      <>
                        <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                          Caregiver Workspace
                        </div>

                        <Link
                          to="/caregiver"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#0686CD]" />
                          <span className="font-semibold">Caregiver Dashboard</span>
                        </Link>

                        <Link
                          to="/caregiver/schedule"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#0686CD]" />
                          <span>My Schedule</span>
                        </Link>

                        <Link
                          to="/caregiver/messages"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          <span>Messages</span>
                        </Link>

                        <Link
                          to="/caregiver/earnings"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <DollarSign className="w-4 h-4 text-amber-500" />
                          <span>Earnings & Payouts</span>
                        </Link>

                        <Link
                          to="/caregiver/verification"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-500" />
                          <span>Verification Status</span>
                        </Link>

                        <div className="my-1.5 border-t border-[#EEF4F9]" />

                        <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                          Preferences
                        </div>

                        <Link
                          to="/caregiver/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-gray-500" />
                          <span>Caregiver Profile</span>
                        </Link>

                        <Link
                          to="/caregiver/settings"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Account Settings</span>
                        </Link>
                      </>
                    ) : (
                      <>
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

                        <div className="my-1.5 border-t border-[#EEF4F9]" />

                        <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                          Preferences
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-gray-500" />
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
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => handleSectionClick('support')}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD] transition-colors cursor-pointer text-left"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      <span>Help & Support</span>
                    </button>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
