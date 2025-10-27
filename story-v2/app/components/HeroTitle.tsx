'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroTitleProps {
  className?: string;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
  opacities?: number[];
}

const HeroTitle: React.FC<HeroTitleProps> = ({ className = '', triggerRef, opacities = [1, 1] }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const shepherdRef = useRef<HTMLSpanElement>(null);
  const titleElements = useRef<HTMLSpanElement[]>([]);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !titleElements.current.includes(el)) {
      titleElements.current.push(el);
    }
  };

  useEffect(() => {
    if (!titleRef.current || !triggerRef?.current || titleElements.current.length === 0) return;

    const tl = gsap.timeline({ delay: 0.1 });

    // Set initial positions and animate each span individually
    titleElements.current.forEach((el, index) => {
      const finalOpacity = opacities[index] !== undefined ? opacities[index] : 1;
      
      // Check if element has inline transform style (for "the")
      const hasInlineTransform = el.style.transform && el.style.transform !== '';
      
      if (hasInlineTransform) {
        // Animate with y position while keeping inline transform
        gsap.set(el, {
          autoAlpha: 0,
          y: 40
        });

        tl.to(el, {
          autoAlpha: finalOpacity,
          y: 20,
          duration: 0.9,
          ease: "power2.out"
        }, index * 0.5);
      } else {
        // Normal animation with y translation
        gsap.set(el, {
          autoAlpha: 0,
          y: 20
        });

        tl.to(el, {
          autoAlpha: finalOpacity,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, index * 0.5);
      }
    });

    // Fade out on scroll
    gsap.fromTo(titleRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top", 
          end: "60% center",
          scrub: true,  
          markers: false
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [triggerRef, opacities]);

  return (
    <div className={`absolute top-25 left-0 w-full py-16 z-50 pointer-events-none ${className}`}>
      <h1 ref={titleRef} className="text-4xl font-normal">
        <span ref={(el) => { theRef.current = el; addToRefs(el); }} style={{ fontFamily: 'Baskerville, serif', transform: 'translate(30px, 20px)', visibility: 'hidden' }}>the</span> <br />
        <span ref={(el) => { shepherdRef.current = el; addToRefs(el); }} style={{ fontFamily: 'Baskerville SC, serif', visibility: 'hidden' }}>
          <span style={{ fontSize: '1.4em' }}>S</span>HEPHERD
        </span>
      </h1>
    </div>
  );
};

export default HeroTitle;
