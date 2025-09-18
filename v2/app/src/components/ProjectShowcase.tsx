"use client";

import React, { useState } from "react";

interface ProjectImage {
  src: string;
  alt: string;
  name: string;
}

interface ProjectShowcaseProps {
  projects: ProjectImage[];
  containerHeight?: string;
  projectHeight?: string;
  className?: string;
}

export default function ProjectShowcase({ 
  projects, 
  containerHeight = '50vh',
  projectHeight = '50vh',
  className = ''
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className={`flex w-full relative ${className}`} style={{ height: containerHeight }}>
      {projects.map((image, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== -1 && hoveredIndex !== index;
        
        return (
          <div 
            key={index}
            className="relative cursor-pointer overflow-hidden"
            style={{ 
              height: projectHeight,
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
            
            {/* Dimmed overlay for default state */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                isHovered ? 'opacity-0' : 'opacity-50'
              }`}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" style={{ height: '100%' }} />
            
            {/* Vertical project name */}
            <div 
              className={`absolute bottom-0 left-0 flex items-end justify-start transition-opacity duration-300 ease-in-out ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                width: '100%',
                height: '100%',
                padding: '40px',
                backdropFilter: 'blur(50px)'
              }}
            >
              <h3 
                className="text-[#FFF4EB] uppercase opacity-75"
                style={{ 
                  letterSpacing: '0.1em',
                  writingMode: 'vertical-lr',
                  textOrientation: 'mixed',
                  rotate: '180deg',
                  fontWeight: '500',
                  fontFamily: 'var(--font-inter-tight), Arial, Helvetica, sans-serif',
                  fontSize: '1.5rem',
                  filter: 'inherit'
                }}
              >
                {image.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
