"use client";

import React, { useState, useEffect } from "react";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [navVisible, setNavVisible] = useState(false);

  // Initial page load animations
  useEffect(() => {
    setTimeout(() => setNavVisible(true), 800);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav 
      className={`hidden md:block absolute z-40 transition-all duration-1000 ease-in-out ${className}`}
      style={{
        bottom: '2rem',
        right: '4rem',
        backgroundColor: 'transparent'
      }}
    >
      <ul className="flex flex-row space-x-8" style={{ color: '#FFF4EB' }}>
        {navItems.map((item, index) => (
          <li 
            key={item.label}
            className={`transition-all duration-2000 ease-in-out ${
              navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a 
              href={item.href} 
              className="transition-colors duration-200 cursor-pointer uppercase"
              style={{ 
                color: 'inherit'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7C96AD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#FFF4EB';
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
