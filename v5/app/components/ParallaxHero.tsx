'use client';

import { useEffect, useRef } from 'react';
import RevealTitle from './RevealTitle';

interface ParallaxLayer {
  id: string;
  depth: number;
}

const PARALLAX_LAYERS: ParallaxLayer[] = [
  { id: 'layer-1', depth: 0.5 },
  { id: 'layer-2', depth: 0.4 },
  { id: 'layer-3', depth: 0.3 },
  { id: 'layer-4', depth: 0 },
];

const ParallaxHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!heroRef.current || layersRef.current.length === 0) return;

    const hero = heroRef.current;
    
    const updateParallax = () => {
      if (!hero) return;

      const heroHeight = hero.offsetHeight;
      const heroRect = hero.getBoundingClientRect();
      const heroTopFromViewport = heroRect.top;

      // Calculate scroll progress (0 to 1) as hero scrolls through viewport
      // When hero top is at viewport top: progress = 0
      // When hero bottom is at viewport top (top = -height): progress = 1
      let scrollProgress = 0;
      
      if (heroTopFromViewport <= 0 && heroTopFromViewport >= -heroHeight) {
        // Hero is scrolling through viewport
        scrollProgress = Math.abs(heroTopFromViewport) / heroHeight;
      } else if (heroTopFromViewport < -heroHeight) {
        // Hero has scrolled past (bottom has passed viewport top)
        scrollProgress = 1;
      }

      // Apply parallax to each layer
      layersRef.current.forEach((layer) => {
        if (layer) {
          const depth = parseFloat(layer.dataset.depth || '0');
          // Calculate movement based on scroll progress and depth
          const movement = scrollProgress * heroHeight * depth;
          layer.style.transform = `translateY(${movement}px)`;
        }
      });
    };

    // Throttled scroll handler using requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial update
    updateParallax();

    // Add scroll listener (passive for better mobile performance)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile-specific optimizations
    const handleResize = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        updateParallax();
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div id="hero" ref={heroRef}>
      {PARALLAX_LAYERS.map((layer) => (
        <div
          key={layer.id}
          ref={addToRefs}
          className={`layer ${layer.id} parallax`}
          data-depth={layer.depth}
        />
      ))}
      {/* Text overlays at depth 0 (same as layer 4) */}
      <div className="absolute inset-0 flex flex-col items-center justify-start w-full px-4 max-w-[1200px] mx-auto z-20 pointer-events-none mt-20 md:mt-0 md:items-start md:justify-center">
        <RevealTitle 
          className="text-left text-[#121212]"
          style={{ 
            fontFamily: 'Sentient-Variable',
            letterSpacing: '0.05rem'
          }}
        >
          <div className="text-5xl md:text-6xl font-bold">Hi there,</div>
          <div className="text-3xl md:text-4xl italic">Welcome in...</div>
        </RevealTitle>
      </div>
    </div>
  );
};

export default ParallaxHero;
