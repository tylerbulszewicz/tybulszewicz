import ParallaxHero from './components/ParallaxHero';
import ContentSection from './components/ContentSection';
import Projects from './components/Projects';

export default function Home() {
  return (
    <main className="bg-white text-white font-serif relative">
      <ParallaxHero />
      {/* Layer 4 - scrolls normally with content */}
      <ContentSection />
      <Projects />
    </main>
  );
}
