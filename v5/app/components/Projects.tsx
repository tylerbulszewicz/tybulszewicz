'use client';

import { useEffect, useRef, useState } from 'react';
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
}

interface ProjectsProps {
  projects?: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Default projects if none provided
  const defaultProjects: Project[] = [
    {
      id: 'avivemoslumo',
      title: 'Avive Moslumo',
      description: 'Brand identity and visual design system',
      image: '/gd-project-avivemoslumo.png',
      content: 'A comprehensive brand identity project that encompasses logo design, color palette development, and visual guidelines. This project demonstrates expertise in creating cohesive brand experiences that resonate with target audiences.'
    },
    {
      id: 'brochure',
      title: 'Marketing Brochure',
      description: 'Print design and layout composition',
      image: '/gd-project-brochure.png',
      content: 'A sophisticated marketing brochure design showcasing typography skills, layout composition, and visual hierarchy. This project highlights the ability to create compelling print materials that effectively communicate brand messages.'
    },
    {
      id: 'espriddle',
      title: 'Espriddle',
      description: 'Digital interface and user experience design',
      image: '/gd-project-espriddle.png',
      content: 'An innovative digital platform design focusing on user experience and interface aesthetics. This project demonstrates proficiency in modern UI/UX principles and digital design workflows.'
    },
    {
      id: 'foreveropen',
      title: 'Forever Open',
      description: 'Brand strategy and visual communication',
      image: '/gd-project-foreveropen.png',
      content: 'A brand development project that emphasizes open communication and accessibility. This work showcases skills in brand positioning, visual storytelling, and creating meaningful connections through design.'
    },
    {
      id: 'hineni',
      title: 'Hineni',
      description: 'Cultural design and heritage visualization',
      image: '/gd-project-hineni.png',
      content: 'A culturally-inspired design project that honors tradition while embracing contemporary aesthetics. This project demonstrates sensitivity to cultural context and the ability to create designs that bridge past and present.'
    },
    {
      id: 'kidfit',
      title: 'KidFit',
      description: 'Children\'s brand and playful design system',
      image: '/gd-project-kidfit.png',
      content: 'A vibrant children\'s fitness brand that combines fun, energetic design with functional communication. This project showcases expertise in creating engaging designs for younger audiences while maintaining professional quality.'
    },
    {
      id: 'lavalips',
      title: 'Lava Lips',
      description: 'Bold cosmetics branding and packaging design',
      image: '/gd-project-lavalips.png',
      content: 'A daring cosmetics brand that pushes boundaries with bold typography and striking color combinations. This project demonstrates the ability to create memorable brand experiences in competitive markets.'
    },
    {
      id: 'linesoforder',
      title: 'Lines of Order',
      description: 'Minimalist design and geometric composition',
      image: '/gd-project-linesoforder.png',
      content: 'A minimalist design project that explores the beauty of simplicity and geometric precision. This work showcases mastery of negative space, typography, and the power of restrained design.'
    },
    {
      id: 'livingshorelines',
      title: 'Living Shorelines',
      description: 'Environmental design and sustainability branding',
      image: '/gd-project-livingshorelines.png',
      content: 'An environmental conservation project that communicates complex ecological concepts through accessible visual design. This project demonstrates the ability to create designs that serve both aesthetic and educational purposes.'
    },
    {
      id: 'stepbystep',
      title: 'Step by Step',
      description: 'Educational design and instructional graphics',
      image: '/gd-project-stepbystep.png',
      content: 'An educational design project that transforms complex processes into clear, step-by-step visual narratives. This work highlights expertise in information design and creating user-friendly learning materials.'
    },
    {
      id: 'vintage',
      title: 'Vintage Collection',
      description: 'Retro design and nostalgic branding',
      image: '/gd-project-vintage.png',
      content: 'A vintage-inspired design project that captures the essence of bygone eras while maintaining contemporary relevance. This project showcases the ability to research, interpret, and modernize historical design aesthetics.'
    }
  ];

  const projectsToUse = projects || defaultProjects;

  const fitImage = (img: HTMLImageElement, marginFactor: number) => {
    const parent = img.parentNode as HTMLElement;
    const sx = parent.offsetWidth / img.naturalWidth;
    const sy = parent.offsetHeight * (1 + Math.abs(marginFactor)) / img.naturalHeight;
    const scale = Math.max(sx, sy);
    const w = Math.ceil(img.naturalWidth * scale);
    const h = Math.ceil(img.naturalHeight * scale);
    
    gsap.set(img, {
      width: w,
      height: h,
      top: Math.ceil((parent.offsetHeight - h) / 2),
      left: Math.ceil((parent.offsetWidth - w) / 2),
      position: "absolute",
      zIndex: 1
    });
  };

  useEffect(() => {
    if (sectionsRef.current.length === 0) return;

    const movementFactor = 0.8;
    const backgrounds = gsap.utils.toArray("section img.bg") as HTMLImageElement[];

    backgrounds.forEach((img, i) => {
      // Run animation immediately if image is already loaded, otherwise wait for load
      const runAnimation = () => {
        fitImage(img, movementFactor);
        
        gsap.fromTo(img, {
          y: () => i ? -movementFactor * 0.5 * (img.parentNode as HTMLElement).offsetHeight : 0
        }, {
          y: () => movementFactor * 0.5 * (img.parentNode as HTMLElement).offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentNode as HTMLElement,
            start: () => i ? "top bottom" : "center center", 
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      };

      if (img.complete) {
        runAnimation();
      } else {
        img.addEventListener("load", runAnimation);
      }
    });

    // Handle window resize
    const handleResize = () => {
      backgrounds.forEach(img => fitImage(img, movementFactor));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, [projectsToUse]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="bg-[#121212] min-h-screen py-32">
      <div className="projects-container flex flex-col ">
        {projectsToUse.map((project, index) => (
        <section
          key={project.id}
          ref={addToRefs}
          className="relative overflow-hidden cursor-pointer"
          onClick={() => toggleProject(project.id)}
        >
          {/* Background Image */}
          <div className="h-[75vh] relative group w-full">
            <img
              className="bg transition-opacity duration-300 group-hover:opacity-70 w-full h-full object-cover"
              alt={project.title}
              src={project.image}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
          
          {/* Expandable Content */}
          <div 
            className={`bg-[#121212] text-[#FFF4EB] transition-all duration-500 relative z-10 ${
              expandedProject === project.id ? 'max-h-screen' : 'max-h-0 overflow-hidden'
            }`}
          >
            <div className="py-8">
              <div className="px-8 max-w-[1200px] mx-auto">
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
