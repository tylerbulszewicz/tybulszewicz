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
  direction?: 'left' | 'right';
}

export default function LocomotiveScroll({ 
  text, 
  className = '', 
  scrollHeight = '100vh',
  direction = 'right'
}: LocomotiveScrollProps) {
  const panelRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !textContainerRef.current || !textRef.current) return;

    const panel = panelRef.current;
    const textContainer = textContainerRef.current;
    const textElement = textRef.current;

    // Set initial position based on direction
    const containerWidth = textContainer.offsetWidth;
    const textWidth = textElement.offsetWidth;
    
    if (direction === 'right') {
      // Start from left side (off-screen) and slide to right side
      gsap.set(textElement, { x: -textWidth });
    } else {
      // Start from right side (off-screen) and slide to left side
      gsap.set(textElement, { x: containerWidth });
    }

    // Set up the scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: panel,
      start: "top top", // Start when the top of this element hits the top of the viewport
      end: "bottom top", // End when the bottom of this element hits the top of the viewport
      scrub: true,
      pin: true,
      pinSpacing: true, // This creates proper spacing to prevent overlap
      //markers: true,
      anticipatePin: 1, // Helps prevent layout shifts
      invalidateOnRefresh: true, // Recalculates on refresh
      onUpdate: (self) => {
        // Calculate the scroll progress (0 to 1)
        const progress = self.progress;
        
        // Animate the text sliding across the screen
        const containerWidth = textContainer.offsetWidth;
        const textWidth = textElement.offsetWidth;
        
        // Calculate start and end positions based on direction
        let startX, endX;
        
        if (direction === 'right') {
          // Start from left side (off-screen) and slide to right side (off-screen)
          startX = -textWidth; // Start from left edge
          endX = containerWidth; // End completely off-screen with extra margin
        } else {
          // Start from right side (off-screen) and slide to left side (off-screen)
          startX = containerWidth; // Start from right edge
          endX = -textWidth; // End completely off-screen with extra margin
        }
        
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
  }, [text, direction]);

  // Refresh ScrollTrigger when component mounts to ensure proper calculations
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <section 
      ref={panelRef}
      className={`locomotive-panel ${className}`}
      style={{ 
        height: scrollHeight, 
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 9999
      }}
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
