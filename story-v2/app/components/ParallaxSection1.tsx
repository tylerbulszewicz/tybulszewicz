'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

interface ParallaxSection1Props {
  layers: ParallaxLayer[];
  className?: string;
}

const ParallaxSection1: React.FC<ParallaxSection1Props> = ({ layers, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || layersRef.current.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const parallaxElements = gsap.utils.toArray<HTMLElement>(".parallax");
    parallaxElements.forEach((element) => {
      const depth = element.dataset.depth;
      const movement = -(element.offsetHeight * parseFloat(depth || '0'));
      tl.to(element, { y: movement, ease: "none" }, 0);
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div 
      ref={sectionRef} 
      className={`parallax-section h-screen w-screen relative overflow-hidden -mx-4 ${className}`}
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.id}
          ref={addToRefs}
          className={`parallax-layer parallax ${layer.className || ''}`}
          data-depth={layer.depth}
          style={{
            backgroundImage: `url(${layer.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: layers.length - index
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxSection1;
