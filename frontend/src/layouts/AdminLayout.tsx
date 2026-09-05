import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';
import '../admin.css';

const navItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'User Management',
    path: '/admin/users',
    icon: Users,
  },
  {
    name: 'Verifications',
    path: '/admin/verifications',
    icon: ShieldCheck,
  },
  {
    name: 'Transactions',
    path: '/admin/transactions',
    icon: CreditCard,
  },
  {
    name: 'Platform Settings',
    path: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
         <div className="admin-logo">
  <span className="admin-logo-icon">
    <ShieldCheck size={19} />
  </span>
  <span>Admin Panel</span>
</div>

          <nav className="admin-nav">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `admin-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <button className="admin-signout">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        <header className="admin-header">
          <div></div>
          <div className="admin-header-right">
            <button className="admin-notification">
              <Bell size={20} />
            </button>

            <div className="admin-avatar">AD</div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}