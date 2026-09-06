import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles?: Array<'family' | 'caregiver' | 'admin'>;
  publicOnly?: boolean;
  unauthenticatedRedirect?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  publicOnly = false,
  unauthenticatedRedirect,
  children,
}) => {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" />
      </div>
    );
  }

  // 1. If this route is public-only (e.g. /login, /signup), authenticated users should be redirected to their role area
  if (publicOnly && isLoggedIn && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === 'caregiver') {
      return <Navigate to="/caregiver" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // 2. If this route requires authentication and the user is not logged in, redirect to login or custom target (e.g. signup)
  if (!publicOnly && (!isLoggedIn || !user)) {
    const target = unauthenticatedRedirect || '/login';
    return (
      <Navigate
        to={target}
        state={{
          from: location,
          redirect: location.pathname,
          role: target === '/signup' ? 'family' : undefined,
        }}
        replace
      />
    );
  }

  // 3. If this route requires specific roles, ensure user.role is authorized
  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      // Forbidden: redirect to their own rightful dashboard to prevent URL-changing breaches
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      }
      if (user.role === 'caregiver') {
        return <Navigate to="/caregiver" replace />;
      }
      return <Navigate to="/bookings" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
