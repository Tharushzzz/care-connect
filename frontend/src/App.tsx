import './App.css';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Outlet } from 'react-router-dom';
import LoginHeader from './components/Header/LoginHeader.tsx';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isLoggedIn, logout } = useAuth();

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
