"use client";

import React from "react";
import ProjectShowcase from "../src/components/ProjectShowcase";
import Navigation from "../src/components/Navigation";
import { useMobile } from "../src/hooks/useWindowSize";

export default function Projects() {

  const isMobile = useMobile(512);

  const projectImages = [
    { src: "/project1.png", alt: "Project 1", name: "Espriddle Branding" },
    { src: "/project2.png", alt: "Project 2", name: "KidFit Ministries" },
    { src: "/project3.png", alt: "Project 3", name: "Lava Lips" },
    { src: "/project4.png", alt: "Project 4", name: "Abstract Design" },
    { src: "/project5.png", alt: "Project 5", name: "UX/UI Design" },
    { src: "/project6.png", alt: "Project 6", name: "Museum Exhibit" },
    { src: "/project7.png", alt: "Project 7", name: "Non-Profit Branding" },
  ];

  // Desktop layout
  if (!isMobile) {
    return (
      <main className="h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#FFF4EB' }}>
        {/* Project Showcase */}
        <ProjectShowcase projects={projectImages} containerHeight="50vh" projectHeight="50vh"/>

        {/* Navigation */}
        <Navigation variant="projects" />
      </main>
    );
  }

  // Mobile layout
  return (
    <main className="h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#FFF4EB' }}>
      
    </main>
  );
}
