"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import RoleSection from "./components/RoleSection";
import ProjectGrid from "./components/ProjectGrid";
import LeafDecorations from "./components/LeafDecorations";

const projects = [
  { title: "Avivemos Lumo", image: "/gd-project-avivemoslumo.png", tags: ["Developer"], type: "regular" as const },
  { title: "Brochure Design", image: "/gd-project-brochure.png", tags: ["Creative"], type: "large" as const },
  { title: "Espriddle", image: "/gd-project-espriddle.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Forever Open", image: "/gd-project-foreveropen.png", tags: ["Developer"], type: "regular" as const },
  { title: "Hineni", image: "/gd-project-hineni.png", tags: ["Creative"], type: "regular" as const },
  { title: "KidFit", image: "/gd-project-kidfit.png", tags: ["UX/UI Designer"], type: "large" as const },
  { title: "LavaLips", image: "/gd-project-lavalips.png", tags: ["Developer"], type: "regular" as const },
  { title: "Lines of Order", image: "/gd-project-linesoforder.png", tags: ["Developer"], type: "regular" as const },
  { title: "Living Shorelines", image: "/gd-project-livingshorelines.png", tags: ["Creative"], type: "large" as const },
  { title: "Step by Step", image: "/gd-project-stepbystep.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Vintage Collection", image: "/gd-project-vintage.png", tags: ["Creative"], type: "regular" as const }
];

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>("All Projects");
  const [showAllProjects, setShowAllProjects] = useState<boolean>(true);
  
  // Refs for GSAP animations
  const leavesRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const handleRoleChange = (role: string) => {
    setSelectedTag(role); // Always update selectedTag to trigger reset
    if (role === "All Projects") {
      setShowAllProjects(true);
    } else {
      setShowAllProjects(false);
    }
  };

  // GSAP sequential fade-in animation
  useEffect(() => {
    console.log("GSAP useEffect running");
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      console.log("Setting up GSAP animation");
      // Set initial states for all elements - start invisible with autoAlpha
      // Don't set leaves initial state - let CSS handle it
      if (leavesRef.current) {
        console.log("Leaves will use CSS animation after GSAP timeline");
      } else {
        console.log("leavesRef.current is null during setup");
      }
      if (nameRef.current) {
        gsap.set(nameRef.current, { autoAlpha: 0, y: 30, scale: 1 });
      }
      if (roleRef.current) {
        gsap.set(roleRef.current, { autoAlpha: 0, y: 30, scale: 1 });
      }
      if (projectsRef.current) {
        gsap.set(projectsRef.current, { autoAlpha: 0, y: 30, scale: 1 });
      }

      // Create timeline with proper sequencing
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Don't animate leaves with GSAP - they'll use CSS animation
      console.log("Skipping GSAP animation for leaves - using CSS instead");
      
      // Then name with slight delay
      if (nameRef.current) {
        tl.to(nameRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
      }
      
      // Then role section
      if (roleRef.current) {
        tl.to(roleRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6");
      }
      
      // Finally projects section
      if (projectsRef.current) {
        tl.to(projectsRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6");
      }
      
      // After GSAP timeline completes, trigger CSS animation for leaves
      if (leavesRef.current) {
        const totalGSAPDuration = 0.5; // delay + name + role + projects durations
        setTimeout(() => {
          console.log("Triggering CSS fade-in for leaves");
          if (leavesRef.current) {
            leavesRef.current.style.opacity = '1';
            leavesRef.current.style.transition = 'opacity 0.9s ease-out';
          }
        }, totalGSAPDuration * 1000); // Convert to milliseconds
      }
      
    }, 200); // Longer delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full overflow-x-hidden min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div ref={leavesRef} className="overflow-x-hidden" style={{ opacity: 0 }}>
        <LeafDecorations selectedRole={selectedTag} />
      </div>
      
      {/* First section - name and role */}
      <section className="h-[120vh] flex flex-col justify-start items-center md:items-center pt-70 md:pt-90 pb-48 md:justify-start w-full max-w-2xl mx-auto relative z-10">
        <h1 
          ref={nameRef}
          className="text-4xl md:text-6xl lg:text-6xl font-bold text-center mb-[-8px]"
          style={{ fontFamily: 'Sentient, system-ui, sans-serif', fontVariationSettings: '"wght" 500', visibility: 'hidden' }}
        >
          tyler bulszewicz
        </h1>
        <div ref={roleRef} style={{ visibility: 'hidden' }}>
          <RoleSection onRoleChange={handleRoleChange} />
        </div>
      </section>

      {/* Projects section - positioned after first section */}
      <section ref={projectsRef} className="px-1 md:px-32 relative z-50 w-full min-h-screen mt-16" style={{ visibility: 'hidden' }}>
        <ProjectGrid 
          projects={projects} 
          selectedTag={selectedTag} 
          showAllProjects={showAllProjects} 
        />
      </section>
    </div>
  );
}
