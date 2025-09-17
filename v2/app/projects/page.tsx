"use client";

import React, { useState, useEffect } from "react";

export default function Projects() {
  const [navVisible, setNavVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Initial page load animations
  useEffect(() => {
    setTimeout(() => setNavVisible(true), 800);
  }, []);

  const projectImages = [
    { src: "/project1.png", alt: "Project 1" },
    { src: "/project2.png", alt: "Project 2" },
    { src: "/project3.png", alt: "Project 3" },
    { src: "/project4.png", alt: "Project 4" },
    { src: "/project5.png", alt: "Project 5" },
    { src: "/project6.png", alt: "Project 6" },
    { src: "/project7.png", alt: "Project 7" },
  ];

  return (
    <main className="h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#FFF4EB' }}>
      {/* Top half - Images flexbox */}
      <div className="flex w-full relative" style={{ height: '89vh' }}>
        {projectImages.map((image, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== -1 && hoveredIndex !== index;
          
          return (
            <div 
              key={index}
              className="relative cursor-pointer overflow-hidden"
              style={{ 
                height: '89vh',
                flex: isHovered ? '2' : isOtherHovered ? '0.15' : '1',
                transition: 'flex 0.3s ease-in-out'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', image.src);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log('Image loaded:', image.src)}
              />
            </div>
          );
        })}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" style={{ height: '100%' }} />
      </div>

      {/* Bottom half - Navigation bar */}
      <nav className={`absolute bottom-8 right-16 z-40 transition-all duration-1000 ease-in-out`}>
        <ul className="flex flex-row space-x-8 text-[#7C96AD]">
          <li className={`transition-all duration-1000 ease-in-out ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="/" className="hover:text-white transition-colors duration-200 cursor-pointer uppercase">
              Home
            </a>
          </li>
          <li className={`transition-all duration-1000 ease-in-out ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#services" className="hover:text-white transition-colors duration-200 cursor-pointer uppercase">
              Services
            </a>
          </li>
          <li className={`transition-all duration-1000 ease-in-out ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="/projects" className="hover:text-white transition-colors duration-200 cursor-pointer uppercase">
              Projects
            </a>
          </li>
          <li className={`transition-all duration-1000 ease-in-out ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#contact" className="hover:text-white transition-colors duration-200 cursor-pointer uppercase">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
