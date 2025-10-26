import ProjectGallery from '../components/ProjectGallery';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function ProjectsPage() {
  return (
    <main className="bg-[#121212] text-white font-serif relative">
      <Navbar />
      <div className="pt-20">
        <ProjectGallery />
      </div>
      <Footer />
    </main>
  );
}
