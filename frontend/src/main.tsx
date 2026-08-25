import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx';
import FindCaregivers from './pages/FindCaregivers.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {index:true, element: <Home /> },
      {index:false, path:'/find-caregivers', element: <FindCaregivers /> }
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
