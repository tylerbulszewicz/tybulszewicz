"use client";

import { useState, useEffect } from "react";
import AnimatedProjectCard from "./AnimatedProjectCard";

interface Project {
  title: string;
  image: string;
  tags: string[];
  type?: 'regular' | 'large';
  description?: string;
}

interface ProjectGridProps {
  projects: Project[];
  selectedTag?: string;
  showAllProjects?: boolean;
}

export default function ProjectGrid({ projects, selectedTag, showAllProjects }: ProjectGridProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Filter projects based on selected tag or show all projects
  const filteredProjects = showAllProjects 
    ? projects 
    : selectedTag 
      ? projects.filter(project => project.tags.includes(selectedTag))
      : projects;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Trigger visibility when projects section comes into view
      const projectsSection = document.querySelector('[data-projects-section]');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    // More aggressive throttling for mobile performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive scroll listener for better mobile performance
    const options = { passive: true };
    
    // Initial check
    handleScroll();
    window.addEventListener('scroll', throttledHandleScroll, options);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  // Distribute projects evenly across columns with height consideration
  const distributeProjects = (projects: Project[]) => {
    const numColumns = 3;
    const columns: Project[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights: number[] = Array(numColumns).fill(0);
    
    projects.forEach((project) => {
      // Calculate height weight (large cards count as 2, regular as 1)
      const heightWeight = project.type === 'large' ? 2 : 1;
      
      // Find the column with the least height
      const shortestColumnIndex = columnHeights.reduce((shortest, height, i) => 
        height < columnHeights[shortest] ? i : shortest, 0
      );
      
      columns[shortestColumnIndex].push(project);
      columnHeights[shortestColumnIndex] += heightWeight;
    });
    
    return columns;
  };

  const distributedColumns = distributeProjects(filteredProjects);

  // Brand colors for overlays based on selected role
  const getBrandColors = (selectedTag?: string) => {
    switch (selectedTag) {
      case 'Developer':
        return ['#10B981']; // green
      case 'Creative':
        return ['#8B5CF6']; // purple
      case 'UX/UI Designer':
        return ['#F59E0B']; // orange
      case 'All Projects':
      default:
        return ['#10B981', '#8B5CF6', '#F59E0B']; // all colors
    }
  };

  const brandColors = getBrandColors(selectedTag);

  return (
    <div className="w-full max-w-full mx-auto px-4 relative z-50 scroll-container" data-projects-section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-full relative z-50">
        {distributedColumns.map((column, columnIndex) => (
          <div key={columnIndex} className={`flex flex-col gap-6 project-column ${columnIndex === 2 ? 'hidden md:flex' : ''}`}>
            {column.map((project, projectIndex) => {
              // Calculate upward movement based on scroll position
              // Reduced multiplier for smoother mobile experience
              const scrollMultiplier = 0.1; // Reduced from 0.2 for smoother movement
              const upwardMovement = scrollY * scrollMultiplier;
              
              // Mobile-specific adjustments - less aggressive transforms
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const baseOffset = isMobile ? -64 : -128; // Smaller offset on mobile
              const movementMultiplier = isMobile ? 0.8 : 1.2; // Less movement on mobile
              
              // Apply different vertical positioning for left and right columns
              const style = columnIndex === 0 ? { 
                           transform: `translate3d(0, ${baseOffset/2 - upwardMovement * 0.8}px, 0)`,
                           willChange: 'transform'
                         } : // Left column - shift up and continue moving up with scroll
                         columnIndex === 2 ? { 
                           transform: `translate3d(0, ${baseOffset/2 - upwardMovement * 0.8}px, 0)`,
                           willChange: 'transform'
                         } : // Right column - shift up and continue moving up with scroll
                         {
                          transform: `translate3d(0, ${baseOffset - upwardMovement * movementMultiplier}px, 0)`,
                          willChange: 'transform'
                         }; // Middle column - smaller shift
              
              // Get color for this project based on column and project index
              const colorIndex = (columnIndex + projectIndex) % brandColors.length;
              const overlayColor = brandColors[colorIndex];

              return (
                <div 
                  key={`${columnIndex}-${projectIndex}`} 
                  style={style}
                  className={`${project.type === 'large' ? 'md:row-span-2' : ''}`}
                >
                  <AnimatedProjectCard
                    title={project.title}
                    image={project.image}
                    tags={project.tags}
                    type={project.type || 'regular'}
                    overlayColor={overlayColor}
                    selectedTag={selectedTag}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {!showAllProjects && selectedTag && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No projects found for the "{selectedTag}" tag.
          </p>
        </div>
      )}
    </div>
  );
}
