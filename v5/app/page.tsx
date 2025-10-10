'use client';

import ParallaxHero from './components/ParallaxHero';
import ContentSection from './components/ContentSection';
import ProjectGallery from './components/ProjectGallery';
import LocomotiveScroll from './components/LocomotiveScroll';
import ScrollMask from './components/ScrollMask';

export default function Home() {
  return (
    <main className="bg-white text-white font-serif relative">
      <ScrollMask>
        <ParallaxHero />
        <ContentSection />
        <LocomotiveScroll text="Here are my Favorite Projects" />
      </ScrollMask>
      <ProjectGallery />
    </main>
  );
}
