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
      
  // Debug logging
  console.log('ProjectGrid Debug:', {
    showAllProjects,
    selectedTag,
    totalProjects: projects.length,
    filteredProjects: filteredProjects.length,
    filteredProjectTitles: filteredProjects.map(p => p.title)
  });

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

  // Distribute projects with middle column having 2 more than left/right columns
  const distributeProjects = (projects: Project[]) => {
    // Determine number of columns based on screen size
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: 2 columns with equal distribution
      const numColumns = 2;
      const columns: Project[][] = Array.from({ length: numColumns }, () => []);
      
      projects.forEach((project, index) => {
        const columnIndex = index % numColumns;
        columns[columnIndex].push(project);
      });
      
      return columns;
    }
    
    // Desktop: 3 columns with middle column having 2 more projects
    const numColumns = 3;
    const columns: Project[][] = Array.from({ length: numColumns }, () => []);
    
    if (projects.length === 0) {
      return columns;
    }
    
    // Calculate how many projects each column should have
    const totalProjects = projects.length;
    const baseProjectsPerColumn = Math.floor((totalProjects - 2) / 3); // Subtract 2 for middle column bonus
    const middleColumnCount = baseProjectsPerColumn + 2;
    const sideColumnCount = baseProjectsPerColumn;
    
    // Distribute projects
    let projectIndex = 0;
    
    // Left column
    for (let i = 0; i < sideColumnCount && projectIndex < projects.length; i++) {
      columns[0].push(projects[projectIndex]);
      projectIndex++;
    }
    
    // Middle column
    for (let i = 0; i < middleColumnCount && projectIndex < projects.length; i++) {
      columns[1].push(projects[projectIndex]);
      projectIndex++;
    }
    
    // Right column
    for (let i = 0; i < sideColumnCount && projectIndex < projects.length; i++) {
      columns[2].push(projects[projectIndex]);
      projectIndex++;
    }
    
    // Handle remaining projects by distributing them evenly
    while (projectIndex < projects.length) {
      const columnIndex = (projectIndex - sideColumnCount - middleColumnCount) % 3;
      columns[columnIndex].push(projects[projectIndex]);
      projectIndex++;
    }
    
    return columns;
  };

  const distributedColumns = distributeProjects(filteredProjects);
  
  // Debug column distribution
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  console.log('Column Distribution:', {
    left: distributedColumns[0]?.length || 0,
    middle: isMobile ? 'N/A' : (distributedColumns[1]?.length || 0),
    right: distributedColumns[isMobile ? 1 : 2]?.length || 0,
    total: filteredProjects.length,
    layout: isMobile ? '2-column mobile' : '3-column desktop'
  });

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
          <div key={columnIndex} className="flex flex-col gap-6 project-column">
            {column.map((project, projectIndex) => {
              // Calculate upward movement based on scroll position
              // Reduced multiplier for smoother mobile experience
              const scrollMultiplier = 0.1; // Reduced from 0.2 for smoother movement
              const upwardMovement = scrollY * scrollMultiplier;
              
              // Mobile-specific adjustments - less aggressive transforms
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const baseOffset = isMobile ? -64 : -128; // Smaller offset on mobile
              const movementMultiplier = isMobile ? 1.8 : 2.8; // Less movement on mobile
              
              const style = isMobile ? {
                // Mobile: 2 columns, alternating transforms
                transform: `translate3d(0, ${columnIndex === 0 ? baseOffset/3 : baseOffset/2 - upwardMovement * 0.6}px, 0)`,
                willChange: 'transform'
              } : columnIndex === 0 ? { 
                // Desktop: Left column
                transform: `translate3d(0, ${baseOffset/2 - upwardMovement * 0.8}px, 0)`,
                willChange: 'transform'
              } : columnIndex === 2 ? { 
                // Desktop: Right column
                transform: `translate3d(0, ${baseOffset/2 - upwardMovement * 0.8}px, 0)`,
                willChange: 'transform'
              } : {
                // Desktop: Middle column
                transform: `translate3d(0, ${baseOffset - upwardMovement * movementMultiplier}px, 0)`,
                willChange: 'transform'
              };
              
              // Get color for this project based on column and project index
              const colorIndex = (columnIndex + projectIndex) % brandColors.length;
              const overlayColor = brandColors[colorIndex];

              return (
                <div 
                  key={`${columnIndex}-${projectIndex}`} 
                  style={style}
                  className=""
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
