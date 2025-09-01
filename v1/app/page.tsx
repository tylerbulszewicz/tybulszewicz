"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const words = ["Developer",  "Software Engineer", "UX/UI Designer", "Creative"];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);
  const [developerVisible, setDeveloperVisible] = useState(false);
  const [leaf1Visible, setLeaf1Visible] = useState(false);
  const [leaf2Visible, setLeaf2Visible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Initial page load animations
  useEffect(() => {
    // Staggered fade-in sequence
    setTimeout(() => setNameVisible(true), 200);
    setTimeout(() => setDeveloperVisible(true), 700);
    setTimeout(() => setServicesVisible(true), 1200);
    setTimeout(() => setProjectsVisible(true), 1400);
    setTimeout(() => setContactVisible(true), 1600);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out completes, change word and fade in
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 400); // Reduced timing for smoother transition
    }, 2000); // Show each word for 2 seconds

    return () => clearInterval(interval);
  }, []);

  const name = "tyler bulszewicz";
  
  const getLetterStyle = (index: number) => {
    if (hoveredIndex === -1) return "text-white";
    
    if (index === hoveredIndex) {
      return "text-[#7C96AD] transition-all duration-200";
    } else if (index === hoveredIndex - 1 || index === hoveredIndex + 1) {
      return "text-[#7C96AD] opacity-100 transition-all duration-200";
    }
    return "text-white";
  };

  return (
    <main className="flex items-center justify-end h-screen relative overflow-hidden select-none pr-48">
      <div className="text-right z-50 relative">
        <h1 
          className={`font-bold transition-all duration-1000 ease-in-out text-white mix-blend-multiply ${
            nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {name.split('').map((letter, index) => (
            <span
              key={index}
              className={`cursor-pointer ${getLetterStyle(index)}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {letter}
            </span>
          ))}
        </h1>
        <h3 
          className={`text-white italic pr-8 transition-all duration-300 ease-in-out ${
            developerVisible 
              ? (isVisible ? "opacity-50 translate-y-0" : "opacity-0 translate-y-2")
              : "opacity-0 translate-y-4"
          }`}
        >
          {words[currentWordIndex]}
        </h3>
      </div>
      
      {/* Navigation bar at bottom right */}
      <nav className={`absolute bottom-8 right-16 z-40 transition-all duration-1000 ease-in-out`}>
        <ul className="flex flex-row space-x-8 text-white">
          <li className={`transition-all duration-1000 ease-in-out ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#services" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
              Services
            </a>
          </li>
          <li className={`transition-all duration-1000 ease-in-out ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="/projects" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
              Projects
            </a>
          </li>
          <li className={`transition-all duration-1000 ease-in-out ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#contact" className="hover:text-[#7C96AD] transition-colors duration-200 cursor-pointer uppercase">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
