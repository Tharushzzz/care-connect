import './App.css'
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Outlet } from 'react-router-dom';
import LoginHeader from './components/Header/LoginHeader.tsx';



function App() {
  return (
    <>
      <Header />
      <LoginHeader />
      <Outlet></Outlet>
      <Footer />
    </>
  )
}

export default App
