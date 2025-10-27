'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContentSection1Props {
  title: string;
  body: string;
  className?: string;
}

const ContentSection1: React.FC<ContentSection1Props> = ({ title, body, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !bodyRef.current) return;

    // Fade in the title
    gsap.fromTo(titleRef.current, 
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "40% 80%",
          end: "top 50%",
          scrub: true,
          markers: false
        }
      }
    );

    // Fade in the body
    gsap.fromTo(bodyRef.current,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "40% 70%",
          end: "top 40%",
          scrub: true,
          markers: false
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={`flex flex-col content-section py-16 gap-4 ${className}`} style={{ backgroundColor: 'transparent', marginTop: '-30vh', marginBottom: '20vh', position: 'relative', zIndex: 10 }}>
      <h2 ref={titleRef} className="text-3xl font-regular" style={{ visibility: 'hidden', fontFamily: 'Baskerville, serif' }}>{title}</h2>
      <p ref={bodyRef} className="text-md leading-relaxed font-light" style={{ visibility: 'hidden', fontFamily: 'Inter, sans-serif' }}>{body}</p>
    </div>
  );
};

export default ContentSection1;
