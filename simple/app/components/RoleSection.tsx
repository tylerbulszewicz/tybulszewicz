"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
  const [visibleItems, setVisibleItems] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsOpen(false);
    setVisibleItems(0);
    onRoleChange?.(role);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setVisibleItems(0);
      setIsClosing(false);
      // Animate items one by one (only for non-selected roles)
      const availableRoles = roles.filter(role => role !== selectedRole);
      availableRoles.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => prev + 1);
        }, index * 150);
      });
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setVisibleItems(0);
      setIsClosing(false);
    }, 200);
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
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 md:mt-6 flex gap-1 md:gap-4 z-10 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          {roles
            .filter(role => role !== selectedRole)
            .map((role, index) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={`text-sm md:text-xl font-light italic tracking-tight px-2 md:px-6 py-1 rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 text-white whitespace-nowrap ${roleColors[roles.indexOf(role)]} ${
                  index < visibleItems ? 'animate-slideDown' : 'opacity-0'
                }`}
              >
                {role}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
