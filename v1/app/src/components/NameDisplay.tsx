"use client";

import React, { useState, useEffect } from "react";

interface NameDisplayProps {
  name?: string;
  words?: string[];
  className?: string;
  nameVisible?: boolean;
  developerVisible?: boolean;
  onNameVisibleChange?: (visible: boolean) => void;
  onDeveloperVisibleChange?: (visible: boolean) => void;
}

export default function NameDisplay({ 
  name = "tyler bulszewicz",
  words = ["Developer", "Software Engineer", "UX/UI Designer", "Creative"],
  className = "",
  nameVisible = false,
  developerVisible = false,
  onNameVisibleChange,
  onDeveloperVisibleChange
}: NameDisplayProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Handle external visibility changes
  useEffect(() => {
    if (onNameVisibleChange) {
      onNameVisibleChange(nameVisible);
    }
  }, [nameVisible, onNameVisibleChange]);

  useEffect(() => {
    if (onDeveloperVisibleChange) {
      onDeveloperVisibleChange(developerVisible);
    }
  }, [developerVisible, onDeveloperVisibleChange]);

  // Word rotation effect
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
  }, [words.length]);

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
    <div className={`text-right z-50 relative ${className}`}>
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
  );
}
