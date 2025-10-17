'use client';

import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

interface ProjectCardProps {
  project: Project;
  layout: 'image-left' | 'text-left';
  className?: string;
}

const ProjectCard = ({ project, layout, className = '' }: ProjectCardProps) => {
  const isImageLeft = layout === 'image-left';
  
  const cardStyle = {
    backgroundColor: project.backgroundColor || '#FEFDFA',
    color: project.textColor || '#121212'
  };

  return (
    <div 
      className={`w-full overflow-hidden shadow-lg hover:rounded-4xl hover:scale-[0.99] hover:opacity-90 transition-all duration-200 ease-in-out cursor-pointer ${className}`}
      style={cardStyle}
    >
      {/* Mobile Layout - Full Viewport */}
      <div className="block md:hidden h-[100dvh] flex flex-col">
        {/* Image Section - Natural Aspect Ratio */}
        <div className="relative w-full">
          <Image
            src={project.image}
            alt={project.title}
            width={0}
            height={0}
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>

        {/* Content Section - Fills Remaining Height */}
        <div className="flex-1 p-6 bg-inherit flex flex-col justify-start">
          <div className="space-y-3">
            {/* Header */}
            <h2 
              className="text-2xl font-bold leading-tight"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.title}
            </h2>
            
            {/* Subheader */}
            <p 
              className="text-lg italic"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.description}
            </p>
            
            {/* Description */}
            <p 
              className="text-base leading-relaxed font-inter-tight"
            >
              {project.content}
            </p>
            
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden md:grid grid-cols-2 gap-0 h-[400px]">
        {/* Image Section */}
        <div className={`relative ${isImageLeft ? 'order-1' : 'order-2'}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Content Section */}
        <div className={`${isImageLeft ? 'order-2' : 'order-1'} p-8 md:px-16 flex flex-col justify-center`}>
          <div className="space-y-4">
            {/* Header */}
            <h2 
              className="mb-0 text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.title}
            </h2>
            
            {/* Subheader */}
            <p 
              className="text-lg md:text-xl italic"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.description}
            </p>
            
            {/* Description */}
            <p 
              className="text-base md:text-lg leading-relaxed font-inter-tight"
            >
              {project.content}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
