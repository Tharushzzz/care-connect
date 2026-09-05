import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx';
import FindCaregivers from './pages/FindCaregivers.tsx';
import CaregiverProfile from './pages/CaregiverProfile.tsx';
import Login from './pages/Login.tsx';
import BookCare from './pages/BookCare.tsx';

import ClientDashboardLayout from './pages/ClientDashboard.tsx';
import Booking from './components/ClientDashboard/Booking.tsx';
import Message from './components/ClientDashboard/Message.tsx';
import Profile from './components/ClientDashboard/Profile.tsx';
import Settings from './components/ClientDashboard/Settings.tsx';

import CaregiverDashboardLayout from './pages/CaregiverDashboard.tsx';
import CaregiverDashboard from './components/CaregiverDashboard/Dashboard.tsx';
import CaregiverSchedule from './components/CaregiverDashboard/Schedule.tsx';
import CaregiverEarnings from './components/CaregiverDashboard/Earnings.tsx';
import CaregiverMessages from './components/CaregiverDashboard/Messages.tsx';
import CaregiverProfileSettings from './components/CaregiverDashboard/Profile.tsx';
import CaregiverVerification from './components/CaregiverDashboard/Verification.tsx';
import CaregiverNotifications from './components/CaregiverDashboard/Notifications.tsx';
import CaregiverSettings from './components/CaregiverDashboard/Settings.tsx';

import DashboardLayout from './pages/FamilyDashbord.tsx';
import FamilyBooking from './components/FamilyDashbord/Booking.tsx';
import FamilyMessage from './components/FamilyDashbord/Message.tsx';
import FamilyProfile from './components/FamilyDashbord/Profile.tsx';
import FamilySettings from './components/FamilyDashbord/Settings.tsx';
import SavedCaregivers from './components/FamilyDashbord/SavedCaregivers.tsx';
import Signup from './pages/Signup.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/find-caregivers', element: <FindCaregivers /> },
      { path: '/find-caregivers/:id', element: <CaregiverProfile /> },
      { path: '/book-care', element: <BookCare /> },
      { path: '/book-care/:id', element: <BookCare /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forgot-password', element: <ResetPassword /> },
      {
        element: <ClientDashboardLayout />,
        children: [
          { path: '/bookings', element: <Booking /> },
          { path: '/saved-caregivers', element: <SavedCaregivers /> },
          { path: '/messages', element: <Message /> },
          { path: '/profile', element: <Profile /> },
          { path: '/settings', element: <Settings /> },
        ],
      },

      {
        path: '/family',
        element: <DashboardLayout />,
        children: [
          { path: 'bookings', element: <FamilyBooking /> },
          { path: 'messages', element: <FamilyMessage /> },
          { path: 'profile', element: <FamilyProfile /> },
          { path: 'settings', element: <FamilySettings /> },
        ],
      },

      {
        path: '/caregiver',
        element: <CaregiverDashboardLayout />,
        children: [
          { index: true, element: <CaregiverDashboard /> },
          { path: 'schedule', element: <CaregiverSchedule /> },
          { path: 'earnings', element: <CaregiverEarnings /> },
          { path: 'messages', element: <CaregiverMessages /> },
          { path: 'profile', element: <CaregiverProfileSettings /> },
          { path: 'verification', element: <CaregiverVerification /> },
          { path: 'notifications', element: <CaregiverNotifications /> },
          { path: 'settings', element: <CaregiverSettings /> },
        ],
      },
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/users',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/verifications',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/bookings',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/transactions',
        element: <AdminDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)