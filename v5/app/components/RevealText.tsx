'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  as?: 'div' | 'span';
}

const RevealText = ({
  children,
  className = 'text-[#FFF4EB]',
  style = {},
  stagger = 0.1,
  as = 'div'
}: RevealTextProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let splitInstance: SplitText | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let unmounted = false;

    const initAnimation = () => {
      if (unmounted) return;

      // Set element to be visible initially (like in the example)
      gsap.set(element, { opacity: 1 });

      // Create SplitText animation
      splitInstance = SplitText.create(element, {
        type: "words,lines",
        mask: "lines",
        linesClass: "reveal-line",
        autoSplit: true,
        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            yPercent: 120,
            stagger: stagger,
            scrollTrigger: {
              trigger: element,
              start: "clamp(top bottom)",
              end: "clamp(bottom center)",
              scrub: true
            }
          });
        }
      });
    };

    // Wait for fonts to load before animating
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initAnimation();
      });
    } else {
      // Fallback for browsers without font loading API
      fallbackTimer = setTimeout(initAnimation, 100);
    }


    return () => {
      unmounted = true;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      splitInstance?.revert();

      // Clean up ScrollTrigger for this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [stagger]);

  const Element = as;
  
  return (
    <Element 
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </Element>
  );
};

export default RevealText;
