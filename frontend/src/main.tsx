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

import AdminLayout from './layouts/AdminLayout.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';
import Users from './pages/admin/Users.tsx';
import Verifications from './pages/admin/Verifications.tsx';
import Transactions from './pages/admin/Transactions.tsx';
import Settings from './pages/admin/Settings.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { index: false, path: '/login', element: <Login /> },
      { index: false, path: '/find-caregivers', element: <FindCaregivers /> },
      { index: false, path: '/find-caregivers/:id', element: <CaregiverProfile /> },
      { index: false, path: '/book-care', element: <BookCare /> },
      { index: false, path: '/book-care/:id', element: <BookCare /> },
    ],
  },

    {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
      path: 'users',
      element: <Users />,
    },
     {
      path: 'verifications',
      element: <Verifications />,
    },
    {
      path: 'transactions',
      element: <Transactions />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
