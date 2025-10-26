'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsProps {
  projects?: typeof projectsData;
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const projectsToUse = projects || projectsData;

  const fitImage = (img: HTMLImageElement, marginFactor: number) => {
    const parent = img.parentNode as HTMLElement;
    const parentRect = parent.getBoundingClientRect();
    const parentWidth = parentRect.width || parent.offsetWidth;
    const parentHeight = parentRect.height || parent.offsetHeight;
    
    // Ensure we have valid dimensions
    if (!parentWidth || !parentHeight || !img.naturalWidth || !img.naturalHeight) {
      return;
    }
    
    const sx = parentWidth / img.naturalWidth;
    const sy = parentHeight * (1 + Math.abs(marginFactor)) / img.naturalHeight;
    const scale = Math.max(sx, sy);
    const w = Math.ceil(img.naturalWidth * scale);
    const h = Math.ceil(img.naturalHeight * scale);
    
    gsap.set(img, {
      width: w,
      height: h,
      top: Math.ceil((parentHeight - h) / 2),
      left: Math.ceil((parentWidth - w) / 2),
      position: "absolute",
      zIndex: 1,
      transformOrigin: "center center",
      // Ensure image stays within bounds
      maxWidth: "none",
      maxHeight: "none"
    });
  };

  useEffect(() => {
    if (sectionsRef.current.length === 0) return;

    const movementFactor = 0.8;
    const backgrounds = gsap.utils.toArray("section div img.bg") as HTMLImageElement[];

    backgrounds.forEach((img, i) => {
      // Run animation immediately if image is already loaded, otherwise wait for load
      const runAnimation = () => {
        fitImage(img, movementFactor);
        
        const parent = img.parentNode as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        const parentHeight = parentRect.height || parent.offsetHeight;
        
        gsap.fromTo(img, {
          y: () => i ? -movementFactor * 0.3 * parentHeight : 0
        }, {
          y: () => movementFactor * 0.3 * parentHeight,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: () => i ? "top bottom" : "center center", 
            end: "bottom top",
            scrub: true,
          }
        });
      };

      if (img.complete) {
        runAnimation();
      } else {
        img.addEventListener("load", runAnimation);
      }
    });

    // Handle window resize and orientation change
    const handleResize = () => {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Wait for layout to settle on mobile
        setTimeout(() => {
          backgrounds.forEach(img => fitImage(img, movementFactor));
          ScrollTrigger.refresh();
        }, 100);
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [projectsToUse]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };


  return (
    <div className="bg-[#121212] min-h-screen pt-64">
      <div className="projects-container w-full">
        {projectsToUse.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`} className="block">
          <section
            ref={addToRefs}
            className="relative overflow-hidden w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
          {/* Background Image */}
          <div className="h-[20vh] relative group w-full overflow-hidden md:h-[60vh]">
            <Image
              className="bg transition-opacity duration-300"
              alt={project.title}
              src={project.image}
              fill
              style={{ 
                objectFit: 'cover',
                transform: 'translateZ(0)', // Force hardware acceleration
                willChange: 'transform', // Optimize for animations
                // Ensure proper centering
                objectPosition: 'center center'
              }}
            />
          </div>
          
          {/* Content */}
          <div 
            className="relative z-10 py-16 w-full md:py-64"
            style={{ 
              backgroundColor: project.backgroundColor 
                ? `rgba(${parseInt(project.backgroundColor.slice(1, 3), 16)}, ${parseInt(project.backgroundColor.slice(3, 5), 16)}, ${parseInt(project.backgroundColor.slice(5, 7), 16)}, 0.9)`
                : '#121212',
              color: project.textColor || '#FFF4EB'
            }}
          >
            <div className="w-full">
              <div className="px-4 sm:px-4 w-full max-w-[1200px] mx-auto">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: 'Sentient-Variable' }}
                >
                  {project.title}
                </h2>
                <p 
                  className="text-lg md:text-xl mb-8"
                  style={{ fontFamily: 'Sentient-Variable' }}
                >
                  {project.description}
                </p>
                <p 
                  className="text-base leading-relaxed"
                  style={{ fontFamily: 'Sentient-Variable' }}
                >
                  {project.content}
                </p>
              </div>
            </div>
          </div>
          </section>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Projects;
