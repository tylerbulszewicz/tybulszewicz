'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

interface UseRevealOnScrollOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerStart?: string;
  triggerEnd?: string;
  triggerActions?: string;
  once?: boolean;
}

export const useRevealOnScroll = ({
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  ease = "expo.out",
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
  triggerActions = "play none none reverse",
  once = false
}: UseRevealOnScrollOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const initAnimation = () => {
      // Keep element hidden initially - it will be revealed by ScrollTrigger
      gsap.set(element, { opacity: 0 });

      // Create SplitText animation
      SplitText.create(element, {
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
              trigger: element,
              start: triggerStart,
              end: triggerEnd,
              toggleActions: "play none none none",
              once: true,
            })
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
  }, [delay, duration, stagger, ease, triggerStart, triggerEnd, triggerActions, once]);

  return {
    ref: elementRef,
    className: "opacity-0 will-change-transform"
  };
};
