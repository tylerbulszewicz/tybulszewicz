"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./src/components/Navigation";
import NameDisplay from "./src/components/NameDisplay";
import MobileBackgroundOnly from "./src/components/MobileBackgroundOnly";
import FadeInHeading from "./src/components/FadeInHeading";
import { useMobile, useWindowSize } from "./src/hooks/useWindowSize";
import { useScroll } from "./src/hooks/useScroll";
import MobileSection from "./src/components/MobileSection";
import ProjectCard from "./src/components/ProjectCard";
import Spacer from "./src/components/Spacer";

const words = ["Developer",  "Software Engineer", "UX/UI Designer", "Creative"];

// Project data - easily customizable from here
const projects = [
  {
    title: "Espriddle Branding",
    description: "Branding for a local coffee shop in the heart of downtown.",
    category: "Graphic Design",
    imageSrc: "/project1.png"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack web application with React and Node.js.",
    category: "Developer",
    imageSrc: "/project2.png"
  },
  {
    title: "Mobile App Design",
    description: "User experience design for a fitness tracking mobile app.",
    category: "UX/UI",
    imageSrc: "/project3.png"
  },
  {
    title: "Creative Photography",
    description: "Portfolio showcasing creative photography and visual storytelling.",
    category: "Creative",
    imageSrc: "/project4.png"
  },
  {
    title: "Web Development",
    description: "Modern responsive website with advanced animations and interactions.",
    category: "Developer",
    imageSrc: "/project5.png"
  },
  {
    title: "Brand Identity",
    description: "Complete brand identity design for a tech startup company.",
    category: "Graphic Design",
    imageSrc: "/project6.png"
  },
  {
    title: "UI/UX Design",
    description: "User interface design for a mobile banking application.",
    category: "UX/UI",
    imageSrc: "/project7.png"
  }
];

export default function Home() {
  const [nameVisible, setNameVisible] = useState(false);
  const [developerVisible, setDeveloperVisible] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);

  // Check if screen is mobile (below 512px)
  const isMobile = useMobile(512);
  const { translateY } = useScroll();
  const { height: windowHeight } = useWindowSize();


  // Initial page load animations
  useEffect(() => {
    // Staggered fade-in sequence
    setTimeout(() => setSignatureVisible(true), 100);
    setTimeout(() => setNameVisible(true), 200);
    setTimeout(() => setDeveloperVisible(true), 700);
  }, []);

  // Desktop layout
  if (!isMobile) {
    return (
      <main className="flex items-center justify-end h-screen relative overflow-hidden select-none pr-48">
        <NameDisplay 
          name="tyler bulszewicz"
          words={words}
          nameVisible={nameVisible}
          developerVisible={developerVisible}
        />
        
        {/* Navigation */}
        <Navigation variant="home" />
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#7391ab' }}>
      <MobileBackgroundOnly className=" flex flex-col items-center justify-end">
        <img src="/TylerSignature.png"  alt="Tyler Bulszewicz" className={` w-48 h-48 ml-6 object-contain transition-all duration-500 ease-in ${ signatureVisible ? 'opacity-65 translate-y-0' : 'opacity-0 translate-y-4'}`}/>
      </MobileBackgroundOnly>
      <Spacer variant="xs"/>
      <div className="z-10 rounded-t-[50px] bg-[#FFF4EB]" style={{ transform: `translateY(-${translateY}px)` }}>
        <MobileSection className="z-2 flex flex-col items-center justify-center gap-4 pt-24 pb-24">
          <FadeInHeading>Developer</FadeInHeading>
          <FadeInHeading>Software Engineer</FadeInHeading>
          <FadeInHeading>UX/UI Designer</FadeInHeading>
          <FadeInHeading>Creative</FadeInHeading>
        </MobileSection>
        <MobileSection className="z-2 flex flex-col items-center justify-center gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              category={project.category}
              imageSrc={project.imageSrc}
            />
          ))}
        </MobileSection>
        <Spacer variant="lg" className="bg-[#FFF4EB]"/>
      </div>
      
    </main>
  );
}
