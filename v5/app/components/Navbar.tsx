'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const linkClassName = "font-inter-tight font-light text-lg text-white hover:opacity-50 transition-opacity duration-200";

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Set blend mode only on desktop
    const updateBlendMode = () => {
      if (window.innerWidth >= 768) {
        nav.style.mixBlendMode = 'exclusion';
      } else {
        nav.style.mixBlendMode = 'normal';
      }
    };

    updateBlendMode();
    window.addEventListener('resize', updateBlendMode);

    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          const isMobile = window.innerWidth < 768;
          
          // Always show navbar at the very top/bottom
          if (currentScrollY < 10) {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
          } else if (currentScrollY > lastScrollY) {
            // Scrolling down
            if (isMobile) {
              // Mobile: fade out and translate down (since nav is at bottom)
              nav.style.opacity = '0';
              nav.style.transform = 'translateY(20px)';
            } else {
              // Desktop: fade out and translate up (since nav is at top)
              nav.style.opacity = '0';
              nav.style.transform = 'translateY(-20px)';
            }
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - fade in
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBlendMode);
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed bottom-0 md:top-0 left-0 right-0 transition-all duration-300 ease-in-out pointer-events-none"
      style={{
        opacity: '1',
        transform: 'translateY(0)',
        zIndex: 99999
      }}
    >
      <div className="px-8 py-4 md:py-6 pointer-events-auto">
        <div className="flex items-center justify-center md:justify-end space-x-6">
          {/* Pill container with buttons inside */}
          <div className="flex items-center bg-[#121212] border-2 border-[#ffffff20] rounded-full px-6 py-1 space-x-6 md:bg-transparent md:rounded-none md:px-0 md:py-0 md:border-0">
            {!isHomePage && (
              <Link 
                href="/"
                className={linkClassName}
              >
                HOME
              </Link>
            )}
            <Link 
              href="/#contact"
              className={linkClassName}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
