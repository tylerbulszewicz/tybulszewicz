"use client";

import React from "react";
import { useFadeIn } from "../hooks/useIntersection";

interface FadeInHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInHeading({ 
  children, 
  className = "" 
}: FadeInHeadingProps) {
  const { ref, isVisible } = useFadeIn();
  return (
    <h2 
      ref={ref}
      className={`text-[#7391ab] text-2xl transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-75 translate-y-0' 
          : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ 
        fontFamily: 'var(--font-inter-tight)',
        fontWeight: 200
      }}
    >
      {children}
    </h2>
  );
}
