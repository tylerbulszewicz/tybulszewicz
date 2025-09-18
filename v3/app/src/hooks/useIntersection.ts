"use client";

import { useState, useEffect, useRef } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersection(options: UseIntersectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -20% 0px'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// Convenience hook for fade-in animations
export function useFadeIn() {
  return useIntersection();
}

// Convenience hook for background changes - triggers when scrolled past
export function useBackgroundTrigger() {
  return useIntersection({
    threshold: 0,
    rootMargin: '0px 0px -50% 0px' // Trigger when element is 50% past the viewport
  });
}
