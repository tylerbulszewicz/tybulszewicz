'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerStart?: string;
  triggerEnd?: string;
  triggerActions?: string;
}

const RevealOnScroll = ({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  ease = "expo.out",
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
  triggerActions = "play none none reverse"
}: RevealOnScrollProps) => {
  useEffect(() => {
    // Find all elements with the reveal class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (revealElements.length === 0) return;

    const initAnimations = () => {
      revealElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Keep element hidden initially - it will be revealed by ScrollTrigger
        gsap.set(htmlElement, { opacity: 0 });

        // Create SplitText animation
        SplitText.create(htmlElement, {
          type: "words,lines",
          linesClass: "reveal-line",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            gsap.fromTo(self.lines, {
              yPercent: 100,
              opacity: 0,
            }, {
              yPercent: 0,
              opacity: 1,
              duration,
              stagger,
              ease,
              delay,
              scrollTrigger: createSmoothScrollTrigger({
                trigger: htmlElement,
                start: triggerStart,
                end: triggerEnd,
                toggleActions: "play none none none",
                once: true,
              })
            });
          }
        });
      });
    };

    // Wait for fonts to load before animating
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initAnimations);
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initAnimations, 100);
    }

    return () => {
      // Clean up ScrollTriggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger && 
            Array.from(revealElements).includes(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, stagger, ease, triggerStart, triggerEnd, triggerActions]);

  return (
    <div 
      className={`reveal-on-scroll opacity-0 will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// CSS classes for styling
export const revealStyles = `
  .reveal-on-scroll {
    opacity: 0;
  }
  
  .reveal-line {
    overflow: hidden;
  }
`;

export default RevealOnScroll;
