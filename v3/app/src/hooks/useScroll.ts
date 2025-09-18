"use client";

import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate different scroll-based values
  const gradientPosition = Math.min(scrollY * 0.1, 100); // Max 100% movement
  const translateY = Math.min(scrollY * 0.3, 200); // Max 200px upward movement

  return { 
    scrollY, 
    gradientPosition, 
    translateY 
  };
}
