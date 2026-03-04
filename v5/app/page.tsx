import ParallaxHero from './components/ParallaxHero';
import ContentSection from './components/ContentSection';
import ScrollMask from './components/ScrollMask';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="bg-[#121212] text-white font-serif relative">
      <Navbar />
      <ScrollMask>
        <ParallaxHero />
        <ContentSection />
      </ScrollMask>
      <Footer />
    </main>
  );
}
