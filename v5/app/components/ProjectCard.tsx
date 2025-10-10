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
      className={`w-full overflow-hidden shadow-lg ${className}`}
      style={cardStyle}
    >
      {/* Mobile Layout - Stacked */}
      <div className="block md:hidden">
        {/* Image Section */}
        <div className="relative h-[300px] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
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
              className="text-base leading-relaxed"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.content}
            </p>
            
            {/* Call to Action */}
            <a 
              href="#" 
              className="inline-block text-base font-medium underline hover:no-underline transition-all duration-200"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              Learn more
            </a>
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
              className="text-3xl md:text-4xl font-bold leading-tight"
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
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              {project.content}
            </p>
            
            {/* Call to Action */}
            <a 
              href="#" 
              className="inline-block text-base font-medium underline hover:no-underline transition-all duration-200"
              style={{ fontFamily: 'Sentient-Variable' }}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
