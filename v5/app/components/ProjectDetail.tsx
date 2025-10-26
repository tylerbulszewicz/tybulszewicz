'use client';

import Image from 'next/image';
import RevealText from './RevealText';

interface ProjectDetailProps {
  headerImage: string;
  headerImageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  projectImages: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
  headerImageHeight?: 'full' | 'half' | 'custom';
  customHeaderHeight?: string;
}

const ProjectDetail = ({
  headerImage,
  headerImageAlt,
  title,
  subtitle,
  description,
  projectImages,
  backgroundColor = '#121212',
  textColor = '#FFF4EB',
  headerImageHeight = 'full',
  customHeaderHeight
}: ProjectDetailProps) => {
  const getHeaderHeight = () => {
    if (customHeaderHeight) return customHeaderHeight;
    switch (headerImageHeight) {
      case 'half': return '50vh';
      case 'full': return '100vh';
      default: return '100vh';
    }
  };

  const containerStyle = {
    backgroundColor,
    color: textColor
  };

  return (
    <main className="w-full bg-[#121212]" style={containerStyle}>
      {/* Header Image Section */}
      <section 
        className="relative w-full overflow-hidden h-[85vh]"
      >
        <Image
          src={headerImage}
          alt={headerImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Optional overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-64 bg-[#121212]">
        <div className="max-w-[1200px] mx-auto p-4">
          <div className="space-y-8">
            {/* Title */}
            <RevealText as="div" stagger={0.1}>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: 'Sentient-Variable' }}
              >
                {title}
              </h1>
            </RevealText>

            {/* Subtitle */}
            <RevealText as="div" stagger={0.1}>
              <h2 
                className="text-xl md:text-2xl lg:text-3xl italic"
                style={{ fontFamily: 'Sentient-Variable' }}
              >
                {subtitle}
              </h2>
            </RevealText>

            {/* Description */}
            <RevealText as="div" stagger={0.1}>
              <p className="text-lg md:text-xl leading-relaxed font-inter-tight max-w-3xl">
                {description}
              </p>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Project Images Grid Section */}
      {projectImages.length > 0 && (
        <section className="w-full bg-[#121212] min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            {projectImages.map((image, index) => (
              <div key={index} className="relative w-full aspect-[4/3] overflow-hidden bg-gray-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 4}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProjectDetail;
