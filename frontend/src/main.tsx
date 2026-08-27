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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
