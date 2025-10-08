'use client';

import { useEffect, useRef } from 'react';
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

interface ProjectsProps {
  projects?: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Default projects if none provided
  const defaultProjects: Project[] = [
    {
      id: 'avivemoslumo',
      title: 'Avive Moslumo',
      description: 'Brand identity and visual design system',
      image: '/gd-project-avivemoslumo.png',
      content: 'A comprehensive brand identity project that encompasses logo design, color palette development, and visual guidelines. This project demonstrates expertise in creating cohesive brand experiences that resonate with target audiences.',
      backgroundColor: '#224039'
    },
    {
      id: 'espriddle',
      title: 'Espriddle',
      description: 'Digital interface and user experience design',
      image: '/gd-project-espriddle.png',
      content: 'An innovative digital platform design focusing on user experience and interface aesthetics. This project demonstrates proficiency in modern UI/UX principles and digital design workflows.',
      backgroundColor: '#E1D0BC',
      textColor: '#121212'
    },
    {
      id: 'foreveropen',
      title: 'Forever Open',
      description: 'Brand strategy and visual communication',
      image: '/gd-project-foreveropen.png',
      content: 'A brand development project that emphasizes open communication and accessibility. This work showcases skills in brand positioning, visual storytelling, and creating meaningful connections through design.',
      backgroundColor: '#131313'
    },
    {
      id: 'hineni',
      title: 'Hineni',
      description: 'Cultural design and heritage visualization',
      image: '/gd-project-hineni.png',
      content: 'A culturally-inspired design project that honors tradition while embracing contemporary aesthetics. This project demonstrates sensitivity to cultural context and the ability to create designs that bridge past and present.',
      backgroundColor: '#0D1819'
    },
    {
      id: 'kidfit',
      title: 'KidFit',
      description: 'Children\'s brand and playful design system',
      image: '/gd-project-kidfit.png',
      content: 'A vibrant children\'s fitness brand that combines fun, energetic design with functional communication. This project showcases expertise in creating engaging designs for younger audiences while maintaining professional quality.',
      backgroundColor: '#ffffff',
      textColor: '#121212'
    },
    {
      id: 'lavalips',
      title: 'Lava Lips',
      description: 'Bold cosmetics branding and packaging design',
      image: '/gd-project-lavalips.png',
      content: 'A daring cosmetics brand that pushes boundaries with bold typography and striking color combinations. This project demonstrates the ability to create memorable brand experiences in competitive markets.',
      backgroundColor: '#ffffff',
      textColor: '#121212'
    },
    {
      id: 'linesoforder',
      title: 'Lines of Order',
      description: 'Minimalist design and geometric composition',
      image: '/gd-project-linesoforder.png',
      content: 'A minimalist design project that explores the beauty of simplicity and geometric precision. This work showcases mastery of negative space, typography, and the power of restrained design.',
      backgroundColor: '#FEFDFA',
      textColor: '#121212'
    },
    {
      id: 'livingshorelines',
      title: 'Living Shorelines',
      description: 'Environmental design and sustainability branding',
      image: '/gd-project-livingshorelines.png',
      content: 'An environmental conservation project that communicates complex ecological concepts through accessible visual design. This project demonstrates the ability to create designs that serve both aesthetic and educational purposes.',
      backgroundColor: '#FFF8EB',
      textColor: '#121212'
    },
    {
      id: 'stepbystep',
      title: 'Step by Step',
      description: 'Educational design and instructional graphics',
      image: '/gd-project-stepbystep.png',
      content: 'An educational design project that transforms complex processes into clear, step-by-step visual narratives. This work highlights expertise in information design and creating user-friendly learning materials.',
      backgroundColor: '#282781'
    },
    {
      id: 'vintage',
      title: 'Vintage Collection',
      description: 'Retro design and nostalgic branding',
      image: '/gd-project-vintage.png',
      content: 'A vintage-inspired design project that captures the essence of bygone eras while maintaining contemporary relevance. This project showcases the ability to research, interpret, and modernize historical design aesthetics.',
      backgroundColor: '#747764'
    },
    {
      id: 'brochure',
      title: 'Marketing Brochure',
      description: 'Print design and layout composition',
      image: '/gd-project-brochure.png',
      content: 'A sophisticated marketing brochure design showcasing typography skills, layout composition, and visual hierarchy. This project highlights the ability to create compelling print materials that effectively communicate brand messages.',
      backgroundColor: '#121212'
    }
  ];

  const projectsToUse = projects || defaultProjects;

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
        <section
          key={project.id}
          ref={addToRefs}
          className="relative overflow-hidden w-full"
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
      ))}
      </div>
    </div>
  );
};

export default Projects;
