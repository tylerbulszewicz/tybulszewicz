'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

interface SimpleProjectGalleryProps {
  projects?: Project[];
}

const SimpleProjectGallery = ({ projects }: SimpleProjectGalleryProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Default projects if none provided
  const defaultProjects: Project[] = [
    {
      id: 'avivemoslumo',
      title: 'Avive Moslumo',
      description: 'Brand identity and visual design system',
      image: '/gd-project-avivemoslumo.png',
      content: 'A comprehensive brand identity project that encompasses logo design, color palette development, and visual guidelines.',
      backgroundColor: '#224039'
    },
    {
      id: 'espriddle',
      title: 'Espriddle',
      description: 'Digital interface and user experience design',
      image: '/gd-project-espriddle.png',
      content: 'An innovative digital platform design focusing on user experience and interface aesthetics.',
      backgroundColor: '#E1D0BC',
      textColor: '#121212'
    },
    {
      id: 'foreveropen',
      title: 'Forever Open',
      description: 'Brand strategy and visual communication',
      image: '/gd-project-foreveropen.png',
      content: 'A brand development project that emphasizes open communication and accessibility.',
      backgroundColor: '#131313'
    },
    {
      id: 'hineni',
      title: 'Hineni',
      description: 'Cultural design and heritage visualization',
      image: '/gd-project-hineni.png',
      content: 'A culturally-inspired design project that honors tradition while embracing contemporary aesthetics.',
      backgroundColor: '#0D1819'
    },
    {
      id: 'kidfit',
      title: 'KidFit',
      description: 'Children\'s brand and playful design system',
      image: '/gd-project-kidfit.png',
      content: 'A vibrant children\'s fitness brand that combines fun, energetic design with functional communication.',
      backgroundColor: '#ffffff',
      textColor: '#121212'
    },
    {
      id: 'lavalips',
      title: 'Lava Lips',
      description: 'Bold cosmetics branding and packaging design',
      image: '/gd-project-lavalips.png',
      content: 'A daring cosmetics brand that pushes boundaries with bold typography and striking color combinations.',
      backgroundColor: '#ffffff',
      textColor: '#121212'
    },
    {
      id: 'linesoforder',
      title: 'Lines of Order',
      description: 'Minimalist design and geometric composition',
      image: '/gd-project-linesoforder.png',
      content: 'A minimalist design project that explores the beauty of simplicity and geometric precision.',
      backgroundColor: '#FEFDFA',
      textColor: '#121212'
    },
    {
      id: 'livingshorelines',
      title: 'Living Shorelines',
      description: 'Environmental design and sustainability branding',
      image: '/gd-project-livingshorelines.png',
      content: 'An environmental conservation project that communicates complex ecological concepts through accessible visual design.',
      backgroundColor: '#FFF8EB',
      textColor: '#121212'
    },
    {
      id: 'stepbystep',
      title: 'Step by Step',
      description: 'Educational design and instructional graphics',
      image: '/gd-project-stepbystep.png',
      content: 'An educational design project that transforms complex processes into clear, step-by-step visual narratives.',
      backgroundColor: '#282781'
    },
    {
      id: 'vintage',
      title: 'Vintage Collection',
      description: 'Retro design and nostalgic branding',
      image: '/gd-project-vintage.png',
      content: 'A vintage-inspired design project that captures the essence of bygone eras while maintaining contemporary relevance.',
      backgroundColor: '#747764'
    },
    {
      id: 'brochure',
      title: 'Marketing Brochure',
      description: 'Print design and layout composition',
      image: '/gd-project-brochure.png',
      content: 'A sophisticated marketing brochure design showcasing typography skills, layout composition, and visual hierarchy.',
      backgroundColor: '#121212'
    }
  ];

  const projectsToUse = projects || defaultProjects;

  const fitImage = (img: HTMLImageElement) => {
    const parent = img.parentNode as HTMLElement;
    const sx = (parent.offsetWidth - 64) / img.naturalWidth; // Account for padding
    const sy = (parent.offsetHeight - 64) / img.naturalHeight; // Account for padding
    const scale = Math.min(sx, sy); // Use min to fit within container
    const w = Math.ceil(img.naturalWidth * scale);
    const h = Math.ceil(img.naturalHeight * scale);
    
    gsap.set(img, {
      width: w,
      height: h,
      maxWidth: '100%',
      maxHeight: '100%'
    });
  };

  const goToSlide = (index: number) => {
    if (!trackRef.current || isAnimating) return;
    
    const newIndex = ((index % projectsToUse.length) + projectsToUse.length) % projectsToUse.length;
    
    // Don't animate if we're already at this slide
    if (newIndex === currentIndex) return;
    
    setCurrentIndex(newIndex);
    setIsAnimating(true);
    
    // Use GSAP to animate to the new position from current position
    gsap.to(trackRef.current, {
      x: `-${newIndex * 100}vw`,
      duration: 0.4,
      ease: "power1.out",
      onComplete: () => {
        setIsAnimating(false);
      }
    });
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Handle wheel events for trackpad scroll - moved inside useEffect to fix dependency warning

  // Handle mouse enter/leave for hover detection
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const currentSlider = sliderRef.current;
    if (!currentSlider || !trackRef.current) return;

    // Handle wheel events for trackpad scroll
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || !isHovering) return;
      
      // Check if it's a horizontal scroll (trackpad swipe)
      // Use a lower threshold for more fluid swiping
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
        // Only prevent default for horizontal swipes
        e.preventDefault();
        
        if (e.deltaX > 0) {
          // Swipe right - go to next
          nextSlide();
        } else {
          // Swipe left - go to previous
          prevSlide();
        }
      }
      // Allow vertical scrolling to continue normally (no preventDefault)
    };

    // Add wheel event listener for trackpad scrolling
    currentSlider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (currentSlider) {
        currentSlider.removeEventListener('wheel', handleWheel);
      }
    };
  }, [projectsToUse, isAnimating, isHovering, nextSlide, prevSlide]);

  // Set initial position only once
  useEffect(() => {
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: 0 });
    }
  }, []);

  // Add parallax effect to images
  useEffect(() => {
    const currentSlider = sliderRef.current;
    if (!currentSlider) return;

    const movementFactor = 0.8;
    const images = currentSlider.querySelectorAll('img');

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      
      // Run animation immediately if image is already loaded, otherwise wait for load
      const runAnimation = () => {
        fitImage(htmlImg);
        
        gsap.fromTo(htmlImg, {
          y: () => -movementFactor * 0.3 * (htmlImg.parentNode as HTMLElement).offsetHeight
        }, {
          y: () => movementFactor * 0.3 * (htmlImg.parentNode as HTMLElement).offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: currentSlider,
            start: "top bottom", 
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      };

      if (htmlImg.complete) {
        runAnimation();
      } else {
        htmlImg.addEventListener("load", runAnimation);
      }
    });

    // Handle window resize
    const handleResize = () => {
      images.forEach(img => fitImage(img as HTMLImageElement));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === currentSlider) {
          trigger.kill();
        }
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [projectsToUse]);

  return (
    <div 
      ref={sliderRef} 
      className="relative w-full h-screen overflow-hidden bg-[#111]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${projectsToUse.length * 100}vw` }}
      >
        {projectsToUse.map((project) => (
          <div 
            key={project.id}
            className="h-full flex-shrink-0 flex items-center justify-center px-8"
            style={{ width: '100vw' }}
          >
            <div 
              className="relative w-full h-5/6 rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                backgroundColor: project.backgroundColor || '#333',
                maxWidth: '90vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image 
                src={project.image} 
                alt={project.title}
                width={800}
                height={600}
                className="object-contain"
                style={{ 
                  backgroundColor: project.backgroundColor || '#333',
                  padding: '2rem',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onLoad={(e) => {
                  gsap.fromTo(e.target, 
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {projectsToUse.map((project, index) => (
          <button
            key={project.id}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleProjectGallery;
