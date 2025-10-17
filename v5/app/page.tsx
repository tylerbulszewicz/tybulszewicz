'use client';

import ParallaxHero from './components/ParallaxHero';
import ContentSection from './components/ContentSection';
import ProjectGallery from './components/ProjectGallery';
import LocomotiveScroll from './components/LocomotiveScroll';
import ScrollMask from './components/ScrollMask';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-[#121212] text-white font-serif relative">
      <ScrollMask>
        <ParallaxHero />
        <ContentSection />
        <LocomotiveScroll text="The Work In Question..." direction="left" />
      </ScrollMask>
      <div className="relative z-20">
        <ProjectGallery />
      </div>
      <LocomotiveScroll text="So what do you think?" direction="left" />
      <Footer />
    </main>
  );
}
