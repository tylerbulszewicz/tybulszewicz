"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const roles = ["Developer", "Creative", "UX/UI Designer", "All Projects"];
const roleColors = [
  "bg-brand-primary-green hover:bg-brand-primary-green", 
  "bg-brand-purple hover:bg-brand-purple", 
  "bg-brand-orange hover:bg-brand-orange",
  "dark:bg-[#FFF4EB] dark:text-black bg-[#121212]"
];

const roleTextColors = [
  "text-brand-primary-green",
  "text-brand-purple", 
  "text-brand-orange",
  "dark:text-[#FFF4EB]"
];

interface RoleSectionProps {
  onRoleChange?: (role: string) => void;
}

export default function RoleSection({ onRoleChange }: RoleSectionProps) {
  const [selectedRole, setSelectedRole] = useState(roles[3]); // "View my" is at index 3
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsOpen(false);
    onRoleChange?.(role);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsClosing(false);
      
      // Use GSAP to animate items one by one
      const availableRoles = roles.filter(role => role !== selectedRole);
      console.log("Available roles:", availableRoles);
      console.log("Button refs:", buttonRefs.current);
      
      // Wait for DOM to update before animating
      setTimeout(() => {
        const tl = gsap.timeline();
        
        // Set initial states
        buttonRefs.current.forEach((button, index) => {
          if (button && index < availableRoles.length) {
            console.log(`Setting initial state for button ${index}:`, button);
            gsap.set(button, { autoAlpha: 0, y: 0, scale: 1 });
          }
        });
        
        // Animate items sequentially
        availableRoles.forEach((_, index) => {
          const button = buttonRefs.current[index];
          if (button) {
            console.log(`Animating button ${index}:`, button);
            tl.to(button, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "ease.in"
            }, index * 0.05);
          }
        });
      }, 10);
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    setIsClosing(true);
    
    // Use GSAP for closing animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setIsClosing(false);
      }
    });
    
    const availableRoles = roles.filter(role => role !== selectedRole);
    availableRoles.forEach((_, index) => {
      const button = buttonRefs.current[index];
      if (button) {
        tl.to(button, {
          autoAlpha: 0,
          y: -10,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.in"
        }, index * 0.05);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    const handleScroll = () => {
      closeDropdown();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center w-auto mt-3 justify-start">
        <div className="relative">
          <button
            onClick={handleOpen}
            className={`text-xl md:text-2xl font-medium italic tracking-relaxed px-1 md:px-2 bg-black/0 rounded-full hover:underline transition-all ${
              roleTextColors[roles.indexOf(selectedRole)]
            }`}
          >
            {selectedRole}
          </button>
        </div>
        <p className="text-xl md:text-2xl font-medium italic tracking-relaxed ml-0">• &nbsp;Portfolio</p>
      </div>
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 md:mt-6 flex gap-1 md:gap-4 z-10">
          {roles
            .filter(role => role !== selectedRole)
            .map((role, index) => (
              <button
                key={role}
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => handleRoleSelect(role)}
                className={`text-sm md:text-xl font-light italic tracking-tight px-2 md:px-6 py-1 rounded-2xl text-white whitespace-nowrap ${roleColors[roles.indexOf(role)]} hover:scale-105 transition-transform duration-200`}
                style={{ visibility: 'hidden' }}
              >
                {role}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
