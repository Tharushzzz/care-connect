import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import logo from '../assets/logo/Logo.svg';
import sarahAvatar from '../assets/Caregiverprofile/Sarah.jpeg';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  MessageSquare,
  User as UserIcon,
  Bell,
  ShieldCheck,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const CaregiverDashboardLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadNotifications] = useState(2);

  const notificationMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setIsNotificationOpen(false);
  }, [pathname]);

  // Click outside to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
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

  const navLinks = [
    { name: 'Dashboard', path: '/caregiver', icon: LayoutDashboard, exact: true },
    { name: 'My Schedule', path: '/caregiver/schedule', icon: Calendar },
    { name: 'Earnings', path: '/caregiver/earnings', icon: DollarSign },
    { name: 'Messages', path: '/caregiver/messages', icon: MessageSquare, badge: 1 },
    { name: 'Profile', path: '/caregiver/profile', icon: UserIcon },
    { name: 'Notifications', path: '/caregiver/notifications', icon: Bell, badge: unreadNotifications },
    { name: 'Verification', path: '/caregiver/verification', icon: ShieldCheck },
    { name: 'Settings', path: '/caregiver/settings', icon: SettingsIcon },
  ];

  const isLinkActive = (path: string, exact?: boolean) => {
    if (exact) {
      return pathname === path || pathname === `${path}/`;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      {/* Desktop Sidebar (Dark Teal) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A3D37] text-white shrink-0 select-none shadow-xl border-r border-[#08332E]">
        {/* Brand */}
        <div className="h-17 px-6 flex items-center gap-3 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-teal-200 transition-colors">
              CareConnect
            </span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-teal-300/80">
            Caregiver Portal
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-2 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isLinkActive(link.path, link.exact);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#145C52] text-white shadow-inner font-semibold'
                    : 'text-teal-100/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${active ? 'text-teal-300' : 'text-teal-200/70'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && link.badge > 0 ? (
                  <span className="bg-[#10B981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-teal-200/80 hover:bg-white/10 hover:text-rose-300 font-medium transition-all text-sm cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 max-w-xs bg-[#0A3D37] text-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="h-17 px-6 flex items-center justify-between border-b border-white/10">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center">
                  <img src={logo} alt="CareConnect" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-bold text-white">CareConnect</span>
              </Link>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pt-5 pb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-300/80">
                Caregiver Portal
              </p>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isLinkActive(link.path, link.exact);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#145C52] text-white font-semibold'
                        : 'text-teal-100/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4.5 h-4.5 ${active ? 'text-teal-300' : 'text-teal-200/70'}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && link.badge > 0 ? (
                      <span className="bg-[#10B981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-teal-200/80 hover:bg-white/10 hover:text-rose-300 font-medium transition-all text-sm"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-17 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 select-none shrink-0 shadow-2xs z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-slate-400 font-medium tracking-wide">CAREGIVER PORTAL</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* "Available for shifts" Status Indicator */}
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Click to toggle availability"
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-400'
                }`}
              />
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                {isAvailable ? 'Available for shifts' : 'Unavailable'}
              </span>
            </button>

            {/* Notifications Bell */}
            <div ref={notificationMenuRef} className="relative">
              <Link
                to="/caregiver/notifications"
                className="relative p-2 rounded-xl text-slate-500 hover:text-[#0D9488] hover:bg-teal-50 transition-colors flex items-center justify-center"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </Link>
            </div>

            {/* Caregiver Avatar */}
            <Link
              to="/caregiver/profile"
              className="relative rounded-full ring-2 ring-slate-100 hover:ring-teal-500 transition-all overflow-hidden w-9 h-9 shrink-0"
              title="Sarah Jenkins Profile"
            >
              <img
                src={sarahAvatar}
                alt="Sarah Jenkins"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto min-h-0 bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CaregiverDashboardLayout;
