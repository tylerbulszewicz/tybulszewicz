'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface LocomotiveScrollProps {
  text: string;
  className?: string;
  scrollHeight?: string;
}

export default function LocomotiveScroll({ 
  text, 
  className = '', 
  scrollHeight = '120svh' 
}: LocomotiveScrollProps) {
  const panelRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !textContainerRef.current || !textRef.current) return;

    const panel = panelRef.current;
    const textContainer = textContainerRef.current;
    const textElement = textRef.current;

    // Set initial position off-screen to the right
    const containerWidth = textContainer.offsetWidth;
    gsap.set(textElement, { x: containerWidth });

    // Set up the scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: panel,
      start: "50% 50%", // Changed to pin when element is 50% in view
      end: "+=200%",
      scrub: true,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        // Calculate the scroll progress (0 to 1)
        const progress = self.progress;
        
        // Animate the text sliding across the screen
        const containerWidth = textContainer.offsetWidth;
        const textWidth = textElement.offsetWidth;
        
        // Start from right side (off-screen) and slide to left side (off-screen)
        const startX = containerWidth; // Start from right edge
        const endX = -textWidth; // End completely off-screen with extra margin
        const translateX = startX + (endX - startX) * progress;
        
        gsap.set(textElement, {
          x: translateX
        });
      }
    });

    // Cleanup function
    return () => {
      scrollTrigger.kill();
    };
  }, [text]);

  return (
    <section 
      ref={panelRef}
      className={`locomotive-panel ${className} bg-[#121212]`}
      style={{ height: scrollHeight, backgroundColor: '#121212' }}
    >
      <div className="locomotive-content">
        <div 
          ref={textContainerRef}
          className="text-container"
        >
          <div 
            ref={textRef}
            className="sliding-text"
          >
            {text}
          </div>
        </div>
      </div>
    </section>
  );
}
