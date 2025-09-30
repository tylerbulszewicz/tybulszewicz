"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedProjectCardProps {
  title: string;
  image: string;
  tags: string[];
  type: 'regular' | 'large';
  overlayColor: string;
  selectedTag?: string;
}

export default function AnimatedProjectCard({ title, image, tags, type, overlayColor, selectedTag }: AnimatedProjectCardProps) {
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset reveal state when selectedTag changes (including "View my")
  useEffect(() => {
    setOverlayOpacity(1);
    setHasBeenRevealed(false);
  }, [selectedTag]);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current && !hasBeenRevealed) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only fade out when scrolling down, not when scrolling back up
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate what percentage of the card is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, windowHeight - 50) - Math.max(rect.top, 0);
          const cardHeight = rect.height;
          const visiblePercentage = Math.max(0, Math.min(1, visibleHeight / cardHeight));

          // Fade out based on visibility (0 = fully covered, 1 = fully revealed)
          const opacity = 1 - visiblePercentage;
          setOverlayOpacity(opacity);
          
          // Mark as revealed when fully visible
          if (opacity <= 0) {
            setHasBeenRevealed(true);
          }
        }
      }
    };

    // Throttle scroll events to reduce conflicts with ProjectGrid
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive scroll listener for better mobile performance
    const options = { passive: true };
    
    window.addEventListener('scroll', throttledHandleScroll, options);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [hasBeenRevealed]);

  return (
    <div className="group relative" ref={cardRef}>
      <div className={`${type === 'large' ? 'aspect-3/2 md:aspect-3/2' : 'aspect-3/4 md:aspect-4/3'} relative overflow-hidden rounded-4xl`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
        />
        {/* Color overlay that fades away on scroll - masked to image bounds */}
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-300 ease-out rounded-4xl"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <h3 className="text-left font-bold text-sm md:text-base group-hover:underline">
          {title}
        </h3>
        <img
          src="/arrow.svg"
          alt="arrow"
          width={16}
          height={16}
          className="w-3 h-3"
        />
      </div>
    </div>
  );
}

