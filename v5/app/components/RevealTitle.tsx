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
    let splitInstance: SplitText | null = null;
    let animation: gsap.core.Tween | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let unmounted = false;

    const initTextAnimation = () => {
      if (unmounted || !textRef.current) return;

      gsap.set(textRef.current, { opacity: 1 });

      splitInstance = SplitText.create(textRef.current, {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          animation = gsap.from(self.lines, {
            duration,
            yPercent: 100,
            opacity: 0,
            stagger,
            ease,
            delay
          });
          return animation;
        }
      });
    };

    // Wait for fonts to load before animating
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initTextAnimation();
      });
    } else {
      // Fallback for browsers without font loading API
      fallbackTimer = setTimeout(initTextAnimation, 100);
    }

    return () => {
      unmounted = true;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      animation?.kill();
      splitInstance?.revert();
    };
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
