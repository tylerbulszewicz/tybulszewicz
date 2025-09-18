"use client";

import React from "react";
import { useFadeIn } from "../hooks/useIntersection";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  className?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  category,
  imageSrc,
  className = "" 
}: ProjectCardProps) {
  const { ref, isVisible } = useFadeIn();

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-[30px] overflow-hidden shadow-lg transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {/* Image with overlay */}
      <div className="relative h-128 w-full">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/0" />
        
        {/* Content overlay */}
        <div className="absolute flex flex-col bottom-0 left-0 right-0 p-6 text-white gap-2">
          {/* Category Badge */}
          <div className="mb-3">
            <span 
              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30"
              style={{ fontFamily: 'var(--font-inter-tight)' }}>
              {category}
            </span>
          </div>
          <h3 
            className="text-xl font-semibold text-white mb-3"
            style={{ fontFamily: 'var(--font-inter-tight)' }}
          >
            {title}
          </h3>
          <p 
            className="text-sm text-white/90 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter-tight)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
