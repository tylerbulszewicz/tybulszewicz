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
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerStart?: string;
  once?: boolean;
  as?: 'div' | 'span';
}

const RevealText = ({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  ease = "expo.out",
  triggerStart = "top 80%",
  once = false,
  as = 'div'
}: RevealTextProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const initAnimation = () => {
      // Keep element hidden initially
      gsap.set(element, { opacity: 0, y: 50 });

      // Create SplitText animation
      SplitText.create(element, {
        type: "words,lines",
        linesClass: "reveal-line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          ScrollTrigger.create({
            trigger: element,
            start: triggerStart,
            onEnter: () => {
              console.log('RevealText animation triggered');
              gsap.to(self.lines, {
                y: 0,
                opacity: 1,
                duration,
                stagger,
                ease,
                delay: delay + 100,
              });
            },
            onLeave: () => {
              gsap.to(self.lines, {
                y: 50,
                opacity: 0,
                duration: 0.3,
              });
            },
            onEnterBack: () => {
              gsap.to(self.lines, {
                y: 0,
                opacity: 1,
                duration,
                stagger,
                ease,
                delay: delay + 100,
              });
            },
          });
        }
      });
    };

    // Wait for fonts to load before animating
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initAnimation);
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initAnimation, 100);
    }

    return () => {
      // Clean up ScrollTrigger for this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, stagger, ease, triggerStart, once]);

  const Element = as;
  
  return (
    <Element 
      ref={elementRef}
      className={`opacity-0 will-change-transform ${className}`}
      style={style}
    >
      {children}
    </Element>
  );
};

export default RevealText;
