export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  
  // Detail page specific properties
  headerImage: string;
  headerImageAlt: string;
  subtitle: string;
  projectImages: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  headerImageHeight?: 'full' | 'half' | 'custom';
  customHeaderHeight?: string;
}

export const projectsData: Project[] = [
  {
    id: 'livingshorelines',
    slug: 'livingshorelines',
    title: 'Living Shorelines',
    description: 'Environmental design and sustainability branding',
    image: '/gd-project-livingshorelines.png',
    content: 'An environmental conservation project that communicates complex ecological concepts through accessible visual design. This project demonstrates the ability to create designs that serve both aesthetic and educational purposes, bridging the gap between scientific knowledge and public understanding of coastal restoration efforts.',
    backgroundColor: '#FFF8EB',
    textColor: '#121212',
    headerImage: '/gd-project-livingshorelines.png',
    headerImageAlt: 'Living Shorelines environmental conservation project header',
    subtitle: 'Environmental design and sustainability branding',
    projectImages: [
      {
        src: '/gd-project-livingshorelines.png',
        alt: 'Living Shorelines main brand identity',
        caption: 'Main brand identity showcasing coastal restoration themes'
      },
      {
        src: '/gd-project-brochure.png',
        alt: 'Educational brochure design',
        caption: 'Educational brochure explaining shoreline restoration benefits'
      },
      {
        src: '/gd-project-linesoforder.png',
        alt: 'Infographic design system',
        caption: 'Infographic system for complex ecological data visualization'
      },
      {
        src: '/gd-project-stepbystep.png',
        alt: 'Process documentation design',
        caption: 'Step-by-step process documentation for restoration procedures'
      },
      {
        src: '/gd-project-foreveropen.png',
        alt: 'Community engagement materials',
        caption: 'Community engagement materials promoting public participation'
      },
      {
        src: '/gd-project-vintage.png',
        alt: 'Historical context design',
        caption: 'Historical context design showing shoreline changes over time'
      }
    ],
    headerImageHeight: 'full'
  },
  {
    id: 'project-1',
    slug: 'project-1',
    title: 'Project One',
    description: 'A beautiful design project',
    image: '/project1.png',
    content: 'This is a detailed description of Project One. It showcases innovative design principles and creative problem-solving approaches.',
    backgroundColor: '#FEFDFA',
    textColor: '#121212',
    headerImage: '/project1.png',
    headerImageAlt: 'Project 1 Header Image',
    subtitle: 'A beautiful design project',
    projectImages: [
      {
        src: '/project1.png',
        alt: 'Project 1 Detail 1',
        caption: 'Main interface design'
      },
      {
        src: '/project2.png',
        alt: 'Project 1 Detail 2',
        caption: 'User interaction flow'
      },
      {
        src: '/project3.png',
        alt: 'Project 1 Detail 3',
        caption: 'Final implementation'
      },
      {
        src: '/project4.png',
        alt: 'Project 1 Detail 4',
        caption: 'Mobile responsive design'
      }
    ],
    headerImageHeight: 'full'
  },
  {
    id: 'project-2',
    slug: 'project-2',
    title: 'Project Two',
    description: 'Another amazing creation',
    image: '/project2.png',
    content: 'Project Two represents a different approach to design challenges. It focuses on minimalism and clean aesthetics.',
    headerImage: '/project2.png',
    headerImageAlt: 'Project 2 Header Image',
    subtitle: 'Another amazing creation',
    projectImages: [
      {
        src: '/project5.png',
        alt: 'Project 2 Detail 1',
        caption: 'Initial concept sketches'
      },
      {
        src: '/project6.png',
        alt: 'Project 2 Detail 2',
        caption: 'Development process'
      },
      {
        src: '/project7.png',
        alt: 'Project 2 Detail 3',
        caption: 'Final product showcase'
      }
    ],
    headerImageHeight: 'half'
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: 'Project Three',
    description: 'Innovation meets tradition',
    image: '/project3.png',
    content: 'This project combines traditional design principles with modern technology.',
    backgroundColor: '#FFF5F5',
    textColor: '#121212',
    headerImage: '/project3.png',
    headerImageAlt: 'Project 3 Header Image',
    subtitle: 'Innovation meets tradition',
    projectImages: [
      {
        src: '/project1.png',
        alt: 'Project 3 Detail 1',
        caption: 'Traditional elements integration'
      },
      {
        src: '/project2.png',
        alt: 'Project 3 Detail 2',
        caption: 'Modern technology application'
      }
    ],
    headerImageHeight: 'full'
  }
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug);
}

// Helper function to get all project slugs
export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => project.slug);
}
