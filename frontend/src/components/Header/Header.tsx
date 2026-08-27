import React from 'react'
import logo from '../../assets/logo/Logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on route change
  React.useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close menu on outside click and Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Close menu on screen resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    closeMenu();
    navigate('/');

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header ref={headerRef} className='sticky top-0 z-30 h-15.5'>
        <nav className="flex bg-[#F7FBFE] p-2.5 items-center justify-between drop-shadow-lg relative z-30">
            <Link to={'/'} onClick={closeMenu} className="flex items-center gap-2 pl-3">
                <div className="w-9 h-9">     
                    <img src={logo} alt="Logo" className="rounded-lg" />
                </div>
                <div className="text-lg font-semibold select-none text-[#0D182B]">
                  CareConnect
                </div>
            </Link>

            {/* desktop menu */}
              <div className="items-center justify-center gap-10 text-lg select-none hidden lg:flex">
                <button onClick={() => handleSectionClick('works')} className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]">
                  How it Works
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </button>
                <button onClick={() => handleSectionClick('services')} className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]">
                  Services
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </button>
                <button onClick={() => handleSectionClick('why-us')} className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]">
                  Why Us
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </button>
                <Link
                  to={'/find-caregivers'}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                  className="group relative cursor-pointer text-black/75 transition-colors ease-in-out delay-100 hover:text-[#0686CD]"
                >
                  Find Caregiver
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#0686CD] transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </Link>
              </div>

              <div className="items-center justify-center gap-4 pb-0.5 pr-3 select-none hidden sm:flex">
                <Link to="/login" className="bg-[#E2F1FF] p-1.5 px-4 rounded-xl text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0686CD] transition-colors ease-in-out">
                  Log In
                </Link>

                <Link to="#get-started" className="bg-[#0686CD] p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75">
                  Get Started
                </Link>

              </div>
            
            {/* menu icon */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="w-9 h-9 mr-3 lg:hidden cursor-pointer flex items-center justify-center p-1 rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6"><path fill="rgb(160, 164, 165)" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6"><path fill="rgb(160, 164, 165)" d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
              )}
            </button>

        </nav>

        {/* backdrop overlay */}
        <div
          className={`fixed inset-0 top-15.5 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* mobile menu */}
        <div
          className={
            `lg:hidden flex flex-col z-20 w-full items-start py-5 px-5 justify-center gap-3 text-lg text-[#5E656A] select-none bg-white absolute top-full left-0 drop-shadow-lg rounded-bl-lg rounded-br-lg overflow-hidden transition-all ease-in-out duration-300 ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`
          }
          style={{maxHeight: isMenuOpen ? '500px' : '0px'}}
        >
          
          <button onClick={() => handleSectionClick('works')} className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3 text-left cursor-pointer transition-colors"> How it Works </button>
          <button onClick={() => handleSectionClick('services')} className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3 text-left cursor-pointer transition-colors"> Services </button>
          <button onClick={() => handleSectionClick('why-us')} className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3 text-left cursor-pointer transition-colors"> Why Us </button>
          <Link
            to={'/find-caregivers'}
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
            className="hover:bg-[#f9fafc] hover:rounded-lg w-full py-2 pl-3 transition-colors"
          >
            Find Caregiver
          </Link>

          <div className="sm:hidden flex flex-col gap-3 w-full pt-2 border-t border-[#F0F4F8]">
            <Link 
              to="/login" 
              onClick={closeMenu}
              className="bg-white border border-[#0686CD] w-full text-center p-1.5 px-4 rounded-xl text-[#5E656A] cursor-pointer text-lg hover:bg-[#B5D8EB] hover:text-[#0687cd] transition-colors ease-in-out"
            >
              Log In
            </Link>

            <Link 
              to="#get-started" 
              onClick={closeMenu}
              className="bg-[#0686CD] w-full text-center p-1.5 px-4 rounded-xl text-[#E2F1FF] cursor-pointer text-lg hover:bg-[#0071A8] hover:shadow-lg transition-all ease-in-out delay-75"
            >
              Get Started
            </Link>
          </div>
          

                
        </div>
    </header>
    

    
  )
}

export default Header
