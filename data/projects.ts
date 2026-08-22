export type ProjectItem = {
  slug: string
  title: string
  category: string
  description: string
  demo: string
  image: string
  video?: string
  poster?: string
  linkLabel?: string
  number: string
  accent: string
}

export const projects: ProjectItem[] = [
  {
    slug: 'cinematic-edit',
    title: 'Cinematic Edit',
    category: 'Video Editing',
    description: 'A cinematic visual edit showcasing creative storytelling and editing.',
    demo: '/demo/cinematic-edit',
    image: '/projects/project-01.jpg',
    video: '/videos/Sugu_bike.MP4',
    poster: '/website-assets/ezgif-frame-003_cinematic_bw_2140p.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '01',
    accent: '#b8b8b8'
  },
  {
    slug: 'creative-visual',
    title: 'Creative Visual',
    category: 'Video Editing',
    description: 'A creative visual edit focusing on transitions and cinematic styling.',
    demo: '/demo/creative-visual',
    image: '/projects/project-02.jpg',
    video: '/videos/Triumph.MP4',
    poster: '/projects/project-02.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '02',
    accent: '#d1d1d1'
  },
  {
    slug: 'music-video',
    title: 'Music Video',
    category: 'Video Editing',
    description: 'An emotion-driven music video edit with rhythmic cuts and pace.',
    demo: '/demo/music-video',
    image: '/projects/project-03.jpg',
    video: '/videos/IMG_6606.MP4',
    poster: '/projects/project-03.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '03',
    accent: '#c9c9c9'
  },
  {
    slug: 'social-media-edit',
    title: 'Social Media Edit',
    category: 'Video Editing',
    description: 'Short-form social media edits optimised for engagement.',
    demo: '/demo/social-media-edit',
    image: '/projects/project-04.jpg',
    video: '/videos/IMG_7269.MOV',
    poster: '/projects/project-04.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '04',
    accent: '#e3e3e3'
  },
  {
    slug: 'visual-story',
    title: 'Visual Story',
    category: 'Video Editing',
    description: 'A visual story combining mood, color grading and narrative edits.',
    demo: '/demo/visual-story',
    image: '/projects/project-05.jpg',
    video: '/videos/sugu.MOV',
    poster: '/projects/project-05.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '05',
    accent: '#f0f0f0'
  }
]
