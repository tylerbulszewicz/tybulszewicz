'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        mixBlendMode: 'exclusion'
      }}
    >
      <div className="px-8 py-6">
        <div className="flex items-center justify-center md:justify-end space-x-6">
          {!isHomePage && (
            <Link 
              href="/"
              className="font-inter-tight font-light text-lg hover:opacity-50 transition-opacity duration-200"
              style={{ 
                color: 'white'
              }}
            >
              HOME
            </Link>
          )}
          <Link 
            href="/#projects"
            className="font-inter-tight font-light text-lg hover:opacity-50 transition-opacity duration-200"
            style={{ 
              color: 'white'
            }}
          >
            PROJECTS
          </Link>
          <Link 
            href="/#contact"
            className="font-inter-tight font-light text-lg hover:opacity-50 transition-opacity duration-200"
            style={{ 
              color: 'white'
            }}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
