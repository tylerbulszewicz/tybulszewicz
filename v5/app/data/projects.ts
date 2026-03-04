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
}

export const projectsData: Project[] = [
  // New projects backed by images placed in public/project-*/ folders
  // You can change the `image` field to pick a different card cover per project
  {
    id: 'project-espriddle',
    slug: 'project-espriddle',
    title: 'Espriddle',
    description: 'Brand/process visuals for Espriddle.',
    image: '/project-espriddle/page1.webp',
    content: 'A visual process and brand exploration for Espriddle.',
    backgroundColor: '#121212',
    textColor: '#FFF4EB',
    headerImage: '/project-espriddle/page1.webp',
    headerImageAlt: 'Espriddle header image',
    subtitle: 'Process and brand exploration',
    projectImages: Array.from({ length: 24 }, (_, i) => {
      const n = i + 1;
      return {
        src: `/project-espriddle/page${n}.webp`,
        alt: `Espriddle page ${n}`
      };
    })
  },
  {
    id: 'project-kidfit',
    slug: 'project-kidfit',
    title: 'KidFit Rebrand',
    description: 'Rebrand process book visuals for KidFit.',
    image: '/project-kidfit/ReBrandProcessBookFinal-1.webp',
    content: 'A comprehensive rebrand process showcasing KidFit visual identity.',
    backgroundColor: '#121212',
    textColor: '#FFF4EB',
    headerImage: '/project-kidfit/ReBrandProcessBookFinal-1.webp',
    headerImageAlt: 'KidFit rebrand header image',
    subtitle: 'Rebrand process book',
    projectImages: Array.from({ length: 52 }, (_, i) => {
      const n = i + 1;
      return {
        src: `/project-kidfit/ReBrandProcessBookFinal-${n}.webp`,
        alt: `KidFit Rebrand page ${n}`
      };
    })
  },
  {
    id: 'project-lavalips',
    slug: 'project-lavalips',
    title: 'Lava Lips',
    description: 'Behance series: Lava Lips visuals.',
    image: '/project-lavalips/Lava Lips Behance_05-1.webp',
    content: 'A poster/visual series exploring the Lava Lips concept.',
    backgroundColor: '#121212',
    textColor: '#FFF4EB',
    headerImage: '/project-lavalips/Lava Lips Behance_05-1.webp',
    headerImageAlt: 'Lava Lips header image',
    subtitle: 'Visual series',
    projectImages: Array.from({ length: 17 }, (_, i) => {
      const n = i + 1;
      return {
        src: `/project-lavalips/Lava Lips Behance_05-${n}.webp`,
        alt: `Lava Lips image ${n}`
      };
    })
  },
  {
    id: 'project-linesoforder',
    slug: 'project-linesoforder',
    title: 'Lines of Order',
    description: 'Museum poster/visuals series.',
    image: '/project-linesoforder/Bulszewicz_Museum_ARTS371_1.webp',
    content: 'Lines of Order visual exploration series.',
    backgroundColor: '#121212',
    textColor: '#FFF4EB',
    headerImage: '/project-linesoforder/Bulszewicz_Museum_ARTS371_1.webp',
    headerImageAlt: 'Lines of Order header image',
    subtitle: 'Visual exploration',
    projectImages: Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      return {
        src: `/project-linesoforder/Bulszewicz_Museum_ARTS371_${n}.webp`,
        alt: `Lines of Order image ${n}`
      };
    })
  },
  {
    id: 'project-socialgood',
    slug: 'project-socialgood',
    title: 'Social Good',
    description: 'Poster/visuals for social good.',
    image: '/project-socialgood/Bulszewicz_SocialGood_ARTS371_1.webp',
    content: 'A series centered on social good messaging.',
    backgroundColor: '#121212',
    textColor: '#FFF4EB',
    headerImage: '/project-socialgood/Bulszewicz_SocialGood_ARTS371_1.webp',
    headerImageAlt: 'Social Good header image',
    subtitle: 'Poster series',
    projectImages: Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      return {
        src: `/project-socialgood/Bulszewicz_SocialGood_ARTS371_${n}.webp`,
        alt: `Social Good image ${n}`
      };
    })
  },
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
    ]
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
    ]
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
    ]
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
    ]
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
