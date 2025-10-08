'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealTitle from './RevealTitle';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayer {
  id: string;
  depth: number;
  image: string;
  className?: string;
}

const ParallaxHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  const layers: ParallaxLayer[] = [
    { id: 'layer-1', depth: 0.1, image: '/layer1.svg' },
    { id: 'layer-2', depth: 0.2, image: '/layer2.svg' },
    { id: 'layer-3', depth: 0.3, image: '/layer3.svg' },
    { id: 'layer-4', depth: 0, image: '/layer4.svg' },
  ];

  useEffect(() => {
    if (!heroRef.current || layersRef.current.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    layersRef.current.forEach((layer) => {
      if (layer) {
        const depth = parseFloat(layer.dataset.depth || '0');
        const movement = layer.offsetHeight * depth;
        tl.to(layer, { y: movement, ease: 'none' }, 0);
      }
    });

    // Add mobile-specific optimizations
    const handleResize = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);


  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div id="hero" ref={heroRef}>
      {layers.map((layer) => (
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
          <div className="text-3xl md:text-4xl font-normal">Welcome in...</div>
        </RevealTitle>
      </div>
    </div>
  );
};

export default ParallaxHero;
