import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';

interface ProjectGalleryProps {
  projects?: typeof projectsData;
  variant?: 'home' | 'grid';
}

const ProjectGallery = ({ projects, variant = 'home' }: ProjectGalleryProps) => {
  const projectsToUse = projects ?? projectsData;

  // Grid variant: 2-column layout for projects page
  if (variant === 'grid') {
    return (
      <div className="bg-[#121212] min-h-screen md:py-16 relative z-10">
        <div className="w-full md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
            {projectsToUse.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="grid"
                className="h-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Home variant: original full-width vertical layout
  return (
    <div className="bg-[#121212] min-h-screen md:py-16 relative z-10">
      <div className="w-full md:max-w-7xl md:mx-auto md:px-4 md:sm:px-6 md:lg:px-8">
        <div className="flex flex-col md:gap-16">
          {projectsToUse.map((project) => (
            <div key={project.id}>
              <ProjectCard
                project={project}
                variant="home"
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
