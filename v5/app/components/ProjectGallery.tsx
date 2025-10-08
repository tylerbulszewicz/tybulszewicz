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

interface ProjectGalleryProps {
  projects?: Project[];
}

interface ScrollTriggerWithWrapping extends ScrollTrigger {
  wrapping?: boolean;
}

const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Default projects if none provided - using the same data from Projects component
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

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!galleryRef.current || !cardsRef.current) {
        console.log('Gallery or cards ref not found');
        return;
      }

      console.log('Initializing gallery animation...');

      // Gentle fade in for images
      gsap.to(galleryRef.current.querySelectorAll("img"), { opacity: 1, delay: 0.1 });

      let iteration = 0;
      const spacing = 0.1;
      const snap = gsap.utils.snap(spacing);
      const cards = gsap.utils.toArray('.cards li') as Element[];
      
      console.log('Found cards:', cards.length);
      
      if (cards.length === 0) {
        console.log('No cards found');
        return;
      }

      const seamlessLoop = buildSeamlessLoop(cards, spacing);
      
      const scrub = gsap.to(seamlessLoop, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true
      });

      const trigger = ScrollTrigger.create({
        start: 0,
        onUpdate(self: ScrollTriggerWithWrapping) {
          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
          } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
          } else {
            scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
            scrub.invalidate().restart();
            self.wrapping = false;
          }
        },
        end: "+=3000",
        pin: ".gallery"
      });

      function wrapForward(trigger: ScrollTriggerWithWrapping) {
        iteration++;
        trigger.wrapping = true;
        trigger.scroll(trigger.start + 1);
      }

      function wrapBackward(trigger: ScrollTriggerWithWrapping) {
        iteration--;
        if (iteration < 0) {
          iteration = 9;
          seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
          scrub.pause();
        }
        trigger.wrapping = true;
        trigger.scroll(trigger.end - 1);
      }

      function scrubTo(totalTime: number) {
        const progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
        if (progress > 1) {
          wrapForward(trigger);
        } else if (progress < 0) {
          wrapBackward(trigger);
        } else {
          trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
        }
      }

      // Button event listeners
      const nextButton = nextButtonRef.current;
      const prevButton = prevButtonRef.current;

      if (nextButton) {
        nextButton.addEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
      }
      if (prevButton) {
        prevButton.addEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        if (nextButton) {
          nextButton.removeEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
        }
        if (prevButton) {
          prevButton.removeEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
        }
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [projectsToUse]);

  function buildSeamlessLoop(items: Element[], spacing: number) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        if (this._time === this._dur) {
          this._tTime += this._dur - 0.01;
        }
      }
    });
    const l = items.length + overlap * 2;
    let time = 0;
    let i, index, item;

    // Set initial state of items
    gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

    // Create animations
    for (i = 0; i < l; i++) {
      index = i % items.length;
      item = items[index];
      time = i * spacing;
      rawSequence.fromTo(item, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }, 
        time
      ).fromTo(item, 
        { xPercent: 400 }, 
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false }, 
        time
      );
      if (i <= items.length) {
        seamlessLoop.add("label" + i, time);
      }
    }

    // Set up seamless looping
    rawSequence.time(startTime);
    seamlessLoop.to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none"
    }).fromTo(rawSequence, { time: overlap * spacing + 1 }, {
      time: startTime,
      duration: startTime - (overlap * spacing + 1),
      immediateRender: false,
      ease: "none"
    });

    return seamlessLoop;
  }

  return (
    <div ref={galleryRef} className="gallery relative w-full h-screen overflow-hidden bg-[#111]">
      <ul ref={cardsRef} className="cards absolute w-56 h-72 top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {projectsToUse.map((project) => (
          <li 
            key={project.id}
            className="list-none p-0 m-0 w-56 h-72 text-center leading-[18rem] text-2xl absolute top-0 left-0 rounded-lg shadow-lg"
            style={{ 
              backgroundColor: project.backgroundColor || '#333',
              color: project.textColor || '#fff'
            }}
          >
            <Image 
              src={project.image} 
              alt={project.title}
              width={500}
              height={400}
              className="max-w-[90%] opacity-0 transition-opacity duration-300"
              style={{ 
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '0.5rem',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </li>
        ))}
      </ul>
      <div className="actions absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <button 
          ref={prevButtonRef}
          className="inline-block outline-none px-6 py-3 bg-[#111] border-2 border-white text-white no-underline rounded-full font-semibold cursor-pointer leading-[18px] mx-4 hover:bg-white hover:text-[#111] transition-colors duration-200"
          style={{ fontFamily: 'Sentient-Variable' }}
        >
          Prev
        </button>
        <button 
          ref={nextButtonRef}
          className="inline-block outline-none px-6 py-3 bg-[#111] border-2 border-white text-white no-underline rounded-full font-semibold cursor-pointer leading-[18px] mx-4 hover:bg-white hover:text-[#111] transition-colors duration-200"
          style={{ fontFamily: 'Sentient-Variable' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectGallery;
