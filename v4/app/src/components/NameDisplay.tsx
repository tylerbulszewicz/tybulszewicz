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
  const [isNameBlue, setIsNameBlue] = useState(false);
  const [animationOrigin, setAnimationOrigin] = useState<number | null>(null);
  const [animatedLetters, setAnimatedLetters] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleLetterClick = (index: number) => {
    if (isAnimating) return; // Prevent clicks during animation
    
    if (isNameBlue) {
      // Reverse wave animation - turn letters back to normal from the clicked point
      setIsAnimating(true);
      setAnimationOrigin(index);
      
      // Calculate distances from clicked letter to all other letters
      const distances = name.split('').map((_, i) => Math.abs(i - index));
      const maxDistance = Math.max(...distances);
      
      // Animate letters back to normal with reverse staggered timing
      distances.forEach((distance, letterIndex) => {
        const delay = (distance / maxDistance) * 800; // Total reverse animation duration: 800ms (same as forward)
        setTimeout(() => {
          setAnimatedLetters(prev => {
            const newSet = new Set(prev);
            newSet.delete(letterIndex);
            return newSet;
          });
        }, delay);
      });
      
      // After animation completes, reset state
      setTimeout(() => {
        setIsNameBlue(false);
        setAnimatedLetters(new Set());
        setAnimationOrigin(null);
        setIsAnimating(false);
      }, 800);
    } else {
      // Start expanding animation
      setIsAnimating(true);
      setAnimationOrigin(index);
      setIsNameBlue(true);
      
      // Calculate distances from clicked letter to all other letters
      const distances = name.split('').map((_, i) => Math.abs(i - index));
      const maxDistance = Math.max(...distances);
      
      // Animate letters outward with staggered timing
      distances.forEach((distance, letterIndex) => {
        const delay = (distance / maxDistance) * 800; // Total animation duration: 800ms
        setTimeout(() => {
          setAnimatedLetters(prev => new Set([...prev, letterIndex]));
        }, delay);
      });
      
      // Mark animation as complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };

  const getLetterStyle = (index: number) => {
    const isHovered = hoveredIndex === index;
    const isAdjacent = hoveredIndex !== -1 && (index === hoveredIndex - 1 || index === hoveredIndex + 1);
    const isAnimated = animatedLetters.has(index);
    
    // If name is in blue state
    if (isNameBlue) {
      if (isAnimated) {
        if (isHovered) {
          return "text-[#FFF4EB] transition-all duration-200"; // Opposite color on hover
        }
        return "text-purple-500 transition-all duration-300"; // Blue when animated
      }
      // Letters that haven't been animated yet
      if (isHovered) {
        return "text-purple-900 transition-all duration-200";
      } else if (isAdjacent) {
        return "text-purple-700 opacity-100 transition-all duration-200";
      }
      return "text-white";
    }
    
    // Normal hover behavior when name is not blue
    if (hoveredIndex === -1) return "text-[#FFF4EB]";
    
    if (isHovered) {
      return "text-purple-900 transition-all duration-200";
    } else if (isAdjacent) {
      return "text-purple-500 opacity-100 transition-all duration-200";
    }
    return "text-white";
  };

  return (
    <div className={`text-left z-50 absolute top-24 left-4 md:static md:top-auto md:left-auto ${className}`}>
      <h1 
        className={`font-bold transition-all duration-1000 ease-in-out text-white mix-blend-multiply ${
          nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="md:inline">
          {name.split(' ')[0].split('').map((letter, index) => (
            <span
              key={index}
              className={`cursor-pointer ${getLetterStyle(index)}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => handleLetterClick(index)}
            >
              {letter}
            </span>
          ))}
        </div>
        <span className="hidden md:inline"> </span>
        <div className="md:inline">
          {name.split(' ')[1] && name.split(' ')[1].split('').map((letter, index) => {
            const adjustedIndex = name.split(' ')[0].length + 1 + index; // +1 for space
            return (
              <span
                key={adjustedIndex}
                className={`cursor-pointer ${getLetterStyle(adjustedIndex)}`}
                onMouseEnter={() => setHoveredIndex(adjustedIndex)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => handleLetterClick(adjustedIndex)}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </h1>
      <h3 
        className={`text-[#FFF4EB] italic md:pl-16 pl-0 transition-all duration-300 ease-in-out ${
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
