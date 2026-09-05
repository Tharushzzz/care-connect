import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import logo from '../assets/logo/Logo.svg';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  User as UserIcon,
  Calendar,
  Settings as SettingsIcon,
  LogOut,
  CheckCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Heart
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CaregiversData from '../../config/Caregivers';
import UsersData from '../../config/User';
import type { User } from '../../config/User';
import NotificationsData from '../../config/Notifications';
import type { NotificationItem } from '../../config/Notifications';
import MessagesData from '../../config/Messages';

const defaultUser: User = UsersData[0];
const defaultNotifications: NotificationItem[] = NotificationsData;
const defaultUnreadMessagesCount: number = MessagesData.filter((m) => m.unread).length;

export const DashboardLayout: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(defaultNotifications);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const user = {
    name: authUser?.name || defaultUser.name,
    email: authUser?.email || defaultUser.email,
    role: authUser?.role || defaultUser.role,
    avatar: authUser !== null && authUser !== undefined
      ? (authUser.avatar || (authUser as any)?.profileImage || '')
      : '',
  };

  let photoUrl = user.avatar;
  if (!photoUrl) {
    const matchedCaregiver = CaregiversData.find(
      (c) => c.name.toLowerCase() === user.name.toLowerCase()
    );
    if (matchedCaregiver?.profileImage) {
      photoUrl = matchedCaregiver.profileImage;
    }
  }

  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [photoUrl]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const unreadMessagesCount = defaultUnreadMessagesCount;

  // Close menus on path changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setIsUserDropdownOpen(false);
    setIsNotificationOpen(false);
  }, [pathname]);

  // Click outside listener
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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

  const getPageTitle = () => {
    if (pathname.startsWith('/bookings')) return 'My Bookings';
    if (pathname.startsWith('/saved-caregivers')) return 'Saved Caregivers';
    if (pathname.startsWith('/messages')) return 'Messages';
    if (pathname.startsWith('/profile')) return 'Profile Settings';
    if (pathname.startsWith('/settings')) return 'Account Settings';
    return 'Dashboard';
  };

  const sidebarLinks = [
    { name: 'My Bookings', path: '/bookings', icon: Calendar },
    { name: 'Saved Caregivers', path: '/saved-caregivers', icon: Heart },
    { name: 'Messages', path: '/messages', icon: MessageSquare, badge: unreadMessagesCount },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E4EDF5] shrink-0">
        {/* Brand */}
        <div className="h-17 px-6 border-b border-[#E4EDF5] flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-[#E0EBF3] flex items-center justify-center transition-all group-hover:scale-105">
              <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0D182B] group-hover:text-[#0686CD] transition-colors">
              CareConnect
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.path === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#EAF5FC] text-[#0686CD] font-semibold'
                    : 'text-[#4A5568] hover:bg-[#F2F8FD] hover:text-[#0686CD]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0686CD]' : 'text-[#718096]'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && link.badge > 0 ? (
                  <span className="bg-[#0686CD] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile or Signout */}
        <div className="p-4 border-t border-[#EEF4F9]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 font-medium transition-all cursor-pointer text-sm"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-white h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="h-17 px-6 border-b border-[#E4EDF5] flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-xs border border-[#E0EBF3] flex items-center justify-center">
                  <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-bold text-[#0D182B]">CareConnect</span>
              </Link>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 py-4 px-3 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.path === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#EAF5FC] text-[#0686CD] font-semibold'
                        : 'text-[#4A5568] hover:bg-[#F2F8FD] hover:text-[#0686CD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#0686CD]' : 'text-[#718096]'}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && link.badge > 0 ? (
                      <span className="bg-[#0686CD] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-[#EEF4F9]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-medium transition-all text-sm"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-17 bg-[#F7FBFE]/95 border-b border-[#E4EDF5] flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none shrink-0">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0D182B] leading-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Link: Messages */}
            <Link
              to="/messages"
              className="relative p-2 rounded-xl text-[#4A5568] hover:text-[#0686CD] hover:bg-[#EAF5FC] transition-all flex items-center justify-center"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-[#0686CD] rounded-full ring-2 ring-white shadow-xs">
                  {unreadMessagesCount}
                </span>
              )}
            </Link>

            {/* Notifications Panel */}
            <div ref={notificationMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserDropdownOpen(false);
                }}
                className={`relative p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  isNotificationOpen
                    ? 'bg-[#EAF5FC] text-[#0686CD]'
                    : 'text-[#4A5568] hover:text-[#0686CD] hover:bg-[#EAF5FC]'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4.5 min-w-4.5 items-center justify-center px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white shadow-xs">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                        Mark as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F5FA]">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center px-4">
                        <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm font-medium text-gray-600">No new notifications</p>
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
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-[#E2EAF1]" />

            {/* Profile Menu Pill */}
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setIsNotificationOpen(false);
                }}
                className={`flex items-center gap-2 p-1 pr-2 rounded-full border transition-all cursor-pointer ${
                  isUserDropdownOpen
                    ? 'bg-white border-[#0686CD] ring-2 ring-[#0686CD]/10'
                    : 'bg-white border-[#E0EBF3] hover:border-[#BCE0F5]'
                }`}
              >
                {photoUrl && !avatarError ? (
                  <img
                    src={photoUrl}
                    alt={user.name}
                    onError={() => setAvatarError(true)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF5FC] text-[#0686CD] flex items-center justify-center font-bold text-xs ring-2 ring-white uppercase">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-bold text-[#0D182B] leading-none truncate max-w-20">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-2xl border border-[#E3EDF6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-[#E2EEF7] bg-[#F5FAFE] flex items-center gap-2.5">
                    {photoUrl && !avatarError ? (
                      <img
                        src={photoUrl}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#0686CD] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white uppercase">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#0D182B] truncate">{user.name}</h4>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="p-1.5 space-y-0.5 text-xs">
                    <Link
                      to="/saved-caregivers"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD]"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Caregivers</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD]"
                    >
                      <UserIcon className="w-4 h-4 text-gray-500" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#F2F8FD] hover:text-[#0686CD]"
                    >
                      <SettingsIcon className="w-4 h-4 text-gray-500" />
                      <span>Account Settings</span>
                    </Link>
                  </div>
                  <div className="p-1 border-t border-[#EEF4F9] bg-[#FAFCFE]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-all text-left text-xs"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Panel Area */}
        <main className="flex-1 overflow-y-auto min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
