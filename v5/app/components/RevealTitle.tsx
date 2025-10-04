'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

interface RevealTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
}

const RevealTitle = ({ 
  children, 
  className = '', 
  style = {},
  delay = 0.3,
  duration = 0.8,
  stagger = 0.2,
  ease = "expo.out"
}: RevealTitleProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const initTextAnimation = () => {
      gsap.set(textRef.current, { opacity: 1 });

      let split: gsap.core.Tween;
      
      SplitText.create(textRef.current, {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          split = gsap.from(self.lines, {
            duration,
            yPercent: 100,
            opacity: 0,
            stagger,
            ease,
            delay
          });
          return split;
        }
      });
    };

    // Wait for fonts to load before animating
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initTextAnimation);
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initTextAnimation, 100);
    }
  }, [delay, duration, stagger, ease]);

  return (
    <div 
      ref={textRef}
      className={`split opacity-0 will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default RevealTitle;
