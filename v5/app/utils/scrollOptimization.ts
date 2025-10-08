import { ScrollTrigger } from 'gsap/ScrollTrigger';

let scrollOptimized = false;

export const optimizeScrollPerformance = () => {
  if (scrollOptimized || typeof window === 'undefined') return;
  
  // Configure global ScrollTrigger settings - simplified for debugging
  ScrollTrigger.config({
    ignoreMobileResize: true,
    // Remove other configs that might interfere
  });

  // Prevent scroll event conflicts
  document.addEventListener('touchstart', {}, { passive: true });
  document.addEventListener('touchmove', {}, { passive: true });
  document.addEventListener('touchend', {}, { passive: true });
  document.addEventListener('wheel', {}, { passive: true });

  scrollOptimized = true;
};

export const createSmoothScrollTrigger = (config: any) => {
  return {
    ...config,
    // Simplified for debugging - remove optimizations that might interfere
    invalidateOnRefresh: true,
  };
};
