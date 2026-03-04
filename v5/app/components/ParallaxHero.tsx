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
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
      layersRef.current.forEach((layer) => {
        if (layer) {
          layer.style.transform = 'translate3d(0, 0, 0)';
        }
      });
      return;
    }

    let heroTop = 0;
    let heroHeight = 1;
    let lastProgress = -1;

    const recalculateBounds = () => {
      heroTop = hero.offsetTop;
      heroHeight = Math.max(hero.offsetHeight, 1);
    };

    const updateParallax = () => {
      const rawProgress = (window.scrollY - heroTop) / heroHeight;
      const scrollProgress = Math.min(Math.max(rawProgress, 0), 1);

      if (Math.abs(scrollProgress - lastProgress) < 0.001) {
        return;
      }
      lastProgress = scrollProgress;

      layersRef.current.forEach((layer) => {
        if (layer) {
          const depth = parseFloat(layer.dataset.depth || '0');
          const movement = scrollProgress * heroHeight * depth;
          layer.style.transform = `translate3d(0, ${movement.toFixed(2)}px, 0)`;
        }
      });
    };

    // Throttled scroll handler using requestAnimationFrame
    let ticking = false;
    const queueUpdate = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      recalculateBounds();
      queueUpdate();
    };

    recalculateBounds();
    queueUpdate();

    // Add scroll listener (passive for better mobile performance)
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', queueUpdate);
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
          <div className="text-7xl md:text-8xl font-bold">Hi</div>
        </RevealTitle>
      </div>
    </div>
  );
};

export default ParallaxHero;
