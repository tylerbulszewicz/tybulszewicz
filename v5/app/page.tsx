'use client';

import ParallaxHero from './components/ParallaxHero';
import ContentSection from './components/ContentSection';
import ProjectGallery from './components/ProjectGallery';
import LocomotiveScroll from './components/LocomotiveScroll';

export default function Home() {
  return (
    <main className="bg-white text-white font-serif relative">
      <ParallaxHero />
      <ContentSection />
      <LocomotiveScroll text="Here are my Favorite Projects" />
      <ProjectGallery />
      
    </main>
  );
}
