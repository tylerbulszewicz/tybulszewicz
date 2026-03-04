'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
}

const ProjectDetail = ({
  headerImage,
  headerImageAlt,
  title,
  subtitle,
  description,
  projectImages,
  backgroundColor = '#121212',
  textColor = '#FFF4EB'
}: ProjectDetailProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [indicatorOpacity, setIndicatorOpacity] = useState(0);

  useEffect(() => {
    let hasHiddenIndicator = false;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    // Show scroll indicator after 1 second
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
      // Use requestAnimationFrame to ensure opacity transition triggers
      requestAnimationFrame(() => {
        setIndicatorOpacity(1);
      });
    }, 1000);

    // Hide scroll indicator when user scrolls down
    const handleScroll = () => {
      if (!hasHiddenIndicator && window.scrollY > 50) {
        hasHiddenIndicator = true;
        setIndicatorOpacity(0);
        // Remove from DOM after fade out completes
        hideTimer = setTimeout(() => {
          setShowScrollIndicator(false);
        }, 500); // Match transition duration
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  const containerStyle = {
    backgroundColor,
    color: textColor
  };

  const imagesToRender = projectImages.slice(1);

  return (
    <main className="w-full bg-[#121212] relative" style={containerStyle}>
      {/* Scroll Down Indicator */}
      {showScrollIndicator && (
        <div 
          className="fixed left-1/2 transform -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-500"
          style={{ top: '90vh', opacity: indicatorOpacity }}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg 
              className="w-6 h-6 text-white/50 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M22 13l-10 10m0 0-10-10" 
              />
            </svg>
          </div>
        </div>
      )}

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
      {imagesToRender.length > 0 && (
        <section className="w-full bg-[#121212] min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-0 md:gap-0 lg:gap-0">
            {imagesToRender.map((image, index) => (
              <div key={index} className="relative w-full overflow-hidden bg-gray-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={0}
                  height={0}
                  className="w-full h-auto object-contain"
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
