import ProjectDetail from '../../components/ProjectDetail';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getProjectBySlug } from '../../data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.slug;
  
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return (
      <main className="min-h-screen bg-[#121212] text-[#FFF4EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sentient-Variable' }}>
            Project Not Found
          </h1>
          <p className="text-lg font-inter-tight">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-[#121212]">
      <Navbar />
      <ProjectDetail 
        headerImage={project.headerImage}
        headerImageAlt={project.headerImageAlt}
        title={project.title}
        subtitle={project.subtitle}
        description={project.content}
        projectImages={project.projectImages}
        backgroundColor={project.backgroundColor || '#121212'}
        textColor={project.textColor || '#FFF4EB'}
        headerImageHeight={project.headerImageHeight}
        customHeaderHeight={project.customHeaderHeight}
      />
      <Footer />
    </div>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  const { getAllProjectSlugs } = await import('../../data/projects');
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { getProjectBySlug } = await import('../../data/projects');
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | tybulszewicz`,
    description: project.content,
  };
}
