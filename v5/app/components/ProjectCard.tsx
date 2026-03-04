import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'home' | 'grid';
  className?: string;
}

const ProjectCard = ({ project, variant = 'home', className = '' }: ProjectCardProps) => {
  // Grid variant: compact horizontal card (image left, content right) for 2-column grid
  if (variant === 'grid') {
    const gridCardStyle = {
      backgroundColor: project.backgroundColor || '#FEFDFA',
      color: project.textColor || '#121212'
    };

    return (
      <Link 
        href={`/projects/${project.slug}`} 
        className="block group cursor-pointer relative z-0 h-full"
      >
        <div 
          className={`w-full h-full overflow-hidden relative shadow-lg rounded-none group-hover:rounded-3xl group-hover:scale-[0.98] transition-all duration-200 ease-in-out ${className}`}
          style={gridCardStyle}
        >
          {/* Desktop Layout - Side by Side */}
          <div className="hidden md:grid grid-cols-2 gap-0 h-[250px]">
            {/* Image Section */}
            <div className="relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-center">
              <div className="space-y-2">
                {/* Header */}
                <h2 
                  className="text-xl font-bold leading-tight"
                  style={{ fontFamily: 'Sentient-Variable' }}
                >
                  {project.title}
                </h2>
                
                {/* Subheader */}
                <p 
                  className="text-base italic"
                  style={{ fontFamily: 'Sentient-Variable' }}
                >
                  {project.description}
                </p>
                
                {/* Description */}
                <p 
                  className="text-sm leading-relaxed font-inter-tight line-clamp-3"
                >
                  {project.content}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Vertical Stack */}
          <div className="block md:hidden h-screen flex flex-col">
            {/* Image Section */}
            <div className="relative w-full h-48 flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Content Section */}
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
                  className="text-base leading-relaxed font-inter-tight line-clamp-3"
                >
                  {project.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Home variant: original full-width horizontal layout
  
  const cardStyle = {
    backgroundColor: project.backgroundColor || '#FEFDFA',
    color: project.textColor || '#121212'
  };

  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="block group cursor-pointer relative z-0"
    >
      <div 
        className={`w-full overflow-hidden relative shadow-lg rounded-none group-hover:rounded-3xl group-hover:scale-[0.98] transition-all duration-200 ease-in-out ${className}`}
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
        <div className="relative order-1">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Content Section */}
        <div className="order-2 p-8 md:px-16 flex flex-col justify-center">
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
    </Link>
  );
};

export default ProjectCard;
