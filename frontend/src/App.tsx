import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import LoginHeader from './components/Header/LoginHeader.tsx';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isLoggedIn, logout } = useAuth();
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const noHeaderFooterRoutes = ['/login', '/signup', '/bookings', '/saved-caregivers', '/messages', '/profile', '/settings'];
  const hideHeaderFooter = noHeaderFooterRoutes.some(route => pathname.startsWith(route));

  if (hideHeaderFooter) {
    return <Outlet />;
  }

  return (
    <>
      {isLoggedIn ? (
        <LoginHeader onLogout={logout} />
      ) : (
        <Header />
      )}
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
