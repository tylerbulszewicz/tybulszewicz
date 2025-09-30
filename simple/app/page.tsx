"use client";

import { useState, useEffect } from "react";
import RoleSection from "./components/RoleSection";
import ProjectGrid from "./components/ProjectGrid";
import LeafDecorations from "./components/LeafDecorations";

const projects = [
  { title: "E-Commerce Platform", image: "/project1.png", tags: ["Developer"], type: "regular" as const },
  { title: "Brand Identity Design", image: "/project2.png", tags: ["Creative"], type: "large" as const },
  { title: "Mobile App UX", image: "/project3.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Web Dashboard", image: "/project4.png", tags: ["Developer"], type: "regular" as const },
  { title: "Logo Collection", image: "/project5.png", tags: ["Creative"], type: "regular" as const },
  { title: "User Research Study", image: "/project6.png", tags: ["UX/UI Designer"], type: "large" as const },
  { title: "API Integration", image: "/project7.png", tags: ["Developer"], type: "regular" as const },
  { title: "React Component Library", image: "/project1.png", tags: ["Developer"], type: "regular" as const },
  { title: "Full-Stack Application", image: "/project2.png", tags: ["Developer"], type: "large" as const },
  { title: "Illustration Series", image: "/project3.png", tags: ["Creative"], type: "regular" as const },
  { title: "Design System", image: "/project4.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Database Optimization", image: "/project5.png", tags: ["Developer"], type: "regular" as const },
  { title: "Photography Portfolio", image: "/project6.png", tags: ["Creative"], type: "large" as const },
  { title: "User Interface Design", image: "/project7.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Cloud Infrastructure", image: "/project1.png", tags: ["Developer"], type: "regular" as const },
  { title: "Typography Project", image: "/project2.png", tags: ["Creative"], type: "regular" as const },
  { title: "Wireframe Toolkit", image: "/project3.png", tags: ["UX/UI Designer"], type: "large" as const },
  { title: "Microservices API", image: "/project4.png", tags: ["Developer"], type: "regular" as const },
  { title: "Print Design Collection", image: "/project5.png", tags: ["Creative"], type: "regular" as const },
  { title: "User Journey Mapping", image: "/project6.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Real-time Chat App", image: "/project7.png", tags: ["Developer"], type: "large" as const },
  { title: "Motion Graphics", image: "/project1.png", tags: ["Creative"], type: "regular" as const },
  { title: "Prototype Testing", image: "/project2.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "Machine Learning Model", image: "/project3.png", tags: ["Developer"], type: "regular" as const },
  { title: "Brand Guidelines", image: "/project4.png", tags: ["Creative"], type: "large" as const },
  { title: "Accessibility Audit", image: "/project5.png", tags: ["UX/UI Designer"], type: "regular" as const },
  { title: "DevOps Pipeline", image: "/project6.png", tags: ["Developer"], type: "regular" as const },
  { title: "3D Visualization", image: "/project7.png", tags: ["Creative"], type: "regular" as const },
  { title: "Usability Testing", image: "/project1.png", tags: ["UX/UI Designer"], type: "large" as const },
  { title: "Blockchain Integration", image: "/project2.png", tags: ["Developer"], type: "regular" as const }
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
