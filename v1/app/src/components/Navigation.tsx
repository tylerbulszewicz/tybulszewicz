"use client";

import React, { useState, useEffect } from "react";

interface NavigationProps {
  variant?: 'home' | 'projects';
  className?: string;
}

interface NavigationVariant {
  textColor: string;
  hoverColor: string;
  backgroundOpacity: number;
  backgroundColor: string;
  position: {
    bottom: string;
    right: string;
  };
}

const variants: Record<string, NavigationVariant> = {
  home: {
    textColor: 'white',
    hoverColor: '#7C96AD',
    backgroundOpacity: 100,
    backgroundColor: 'transparent',
    position: {
      bottom: '2rem',
      right: '4rem'
    }
  },
  projects: {
    textColor: '#7C96AD',
    hoverColor: 'white',
    backgroundOpacity: 100,
    backgroundColor: 'transparent',
    position: {
      bottom: '2rem',
      right: '4rem'
    }
  }
};

export default function Navigation({ variant = 'home', className = '' }: NavigationProps) {
  const [navVisible, setNavVisible] = useState(false);
  const currentVariant = variants[variant];

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
      className={`absolute z-40 transition-all duration-1000 ease-in-out ${className}`}
      style={{
        bottom: currentVariant.position.bottom,
        right: currentVariant.position.right,
        backgroundColor: currentVariant.backgroundColor,
        opacity: currentVariant.backgroundOpacity
      }}
    >
      <ul className="flex flex-row space-x-8" style={{ color: currentVariant.textColor }}>
        {navItems.map((item, index) => (
          <li 
            key={item.label}
            className={`transition-all duration-1000 ease-in-out ${
              navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a 
              href={item.href} 
              className="transition-colors duration-200 cursor-pointer uppercase"
              style={{ 
                color: 'inherit',
                '--hover-color': currentVariant.hoverColor
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentVariant.hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentVariant.textColor;
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
