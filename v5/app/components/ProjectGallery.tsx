'use client';

import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

interface ProjectGalleryProps {
  projects?: Project[];
}

const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  // Default projects if none provided
  const defaultProjects: Project[] = [
    {
      id: 'livingshorelines',
      title: 'Living Shorelines',
      description: 'Graphic Design',
      image: '/gd-project-livingshorelines.png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      backgroundColor: '#E7E1D5',
      textColor: '#121212'
    },
    {
      id: 'linesoforder',
      title: 'Lines of Order',
      description: 'Graphic Design',
      image: '/gd-project-linesoforder.png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      backgroundColor: '#E6E5E3',
      textColor: '#121212'
    },
    {
      id: 'avivemoslumo',
      title: 'Avive Moslumo',
      description: 'Brand Identity',
      image: '/gd-project-avivemoslumo.png',
      content: 'A comprehensive brand identity project that encompasses logo design, color palette development, and visual guidelines. This project demonstrates expertise in creating cohesive brand experiences.',
      backgroundColor: '#203B35',
      textColor: '#FFF4EB'
    },
    {
      id: 'espriddle',
      title: 'Espriddle',
      description: 'Digital Interface',
      image: '/gd-project-espriddle.png',
      content: 'An innovative digital platform design focusing on user experience and interface aesthetics. This project demonstrates proficiency in modern UI/UX principles and digital design workflows.',
      backgroundColor: '#CCBDAB',
      textColor: '#121212'
    }
  ];

  const projectsToUse = projects || defaultProjects;

  return (
    <div className="bg-[#121212] min-h-screen py-16">
      <div className="w-full md:max-w-7xl md:mx-auto md:px-4 md:sm:px-6 md:lg:px-8">
        <div className="flex flex-col gap-64">
          {projectsToUse.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={index % 2 === 0 ? 'image-left' : 'text-left'}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
