'use client';

import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';

interface ProjectGalleryProps {
  projects?: typeof projectsData;
}

const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  const projectsToUse = projects || projectsData;

  return (
    <div className="bg-[#121212] min-h-screen md:py-16 relative z-10">
      <div className="w-full md:max-w-7xl md:mx-auto md:px-4 md:sm:px-6 md:lg:px-8">
        <div className="flex flex-col md:gap-16">
          {projectsToUse.map((project, index) => (
            <div 
              key={project.id}
              className=""
            >
              <ProjectCard
                project={project}
                layout="image-left"
                className="w-full bg-[#121212]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
