"use client";

import { useState, useEffect } from "react";
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
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const handleRoleChange = (role: string) => {
    setSelectedTag(role); // Always update selectedTag to trigger reset
    if (role === "All Projects") {
      setShowAllProjects(true);
    } else {
      setShowAllProjects(false);
    }
  };

  // Sequential fade-in animation
  useEffect(() => {
    const elements = ['leaves', 'name', 'role', 'projects'];
    elements.forEach((element, index) => {
      setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element]));
      }, index * 300); // 300ms delay between each element
    });
  }, []);
  
  return (
    <div className="w-full overflow-x-hidden">
      <div className={`overflow-x-hidden transition-opacity duration-1000 ${visibleElements.has('leaves') ? 'opacity-100' : 'opacity-0'}`}>
        <LeafDecorations key={selectedTag} selectedRole={selectedTag} />
      </div>
      
      {/* First section - name and role */}
      <section className="h-screen flex flex-col justify-center items-center md:items-center pb-48 md:justify-center md:pt-0 md:pb-0  w-full max-w-2xl mx-auto relative z-10">
        <h1 className={`text-4xl md:text-6xl lg:text-6xl font-bold text-center mb-[-8px] transition-all duration-1000 ${visibleElements.has('name') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: 'Sentient, system-ui, sans-serif', fontVariationSettings: '"wght" 500' }}>
          tyler bulszewicz
        </h1>
        <div className={`transition-all duration-1000 delay-200 ${visibleElements.has('role') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RoleSection onRoleChange={handleRoleChange} />
        </div>
      </section>

      {/* Projects section - positioned after first section */}
      <section className={`px-1 md:px-32 relative z-50 w-full min-h-screen transition-all duration-1000 ${visibleElements.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <ProjectGrid 
          projects={projects} 
          selectedTag={selectedTag} 
          showAllProjects={showAllProjects} 
        />
      </section>
    </div>
  );
}
