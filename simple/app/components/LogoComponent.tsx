"use client";

import Image from "next/image";

export default function LogoComponent() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        className="group relative transition-all duration-300 hover:scale-110"
      >
        {/* Pill frame - slides out from behind */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-[29px] bg-black rounded-lg transition-all duration-300 group-hover:w-40 group-hover:pr-4 flex items-center justify-end">
          <span className="text-white font-medium text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
            Back to the top
          </span>
        </div>
        
        {/* Logo - gets pushed to the left as frame expands */}
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-x-32 group-hover:bg-brand-primary-green">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
      </button>
    </div>
  );
}
