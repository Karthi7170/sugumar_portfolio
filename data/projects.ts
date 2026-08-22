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
    slug: 'midnight-motion',
    title: 'MIDNIGHT MOTION',
    category: 'CINEMATIC EDIT',
    description: 'A dark cinematic visual edit focused on atmosphere, movement and storytelling.',
    demo: '/demo/midnight-motion',
    image: '/projects/project-01.jpg',
    number: '01',
    accent: '#b8b8b8'
  },
  {
    slug: 'one-last-dance',
    title: 'ONE LAST DANCE',
    category: 'MUSIC VIDEO',
    description: 'A cinematic music-video style edit with emotional pacing and dramatic transitions.',
    demo: '/demo/one-last-dance',
    image: '/projects/project-02.jpg',
    number: '02',
    accent: '#d1d1d1'
  },
  {
    slug: 'urban-nights',
    title: 'URBAN NIGHTS',
    category: 'SOCIAL MEDIA',
    description: 'Fast-paced urban visuals designed for Instagram Reels and short-form content.',
    demo: '/demo/urban-nights',
    image: '/projects/project-03.jpg',
    number: '03',
    accent: '#c9c9c9'
  },
  {
    slug: 'after-dark',
    title: 'AFTER DARK',
    category: 'SHORT FILM',
    description: 'A moody short-film edit combining cinematic color, sound design and storytelling.',
    demo: '/demo/after-dark',
    image: '/projects/project-04.jpg',
    number: '04',
    accent: '#e3e3e3'
  },
  {
    slug: 'the-journey',
    title: 'THE JOURNEY',
    category: 'TRAVEL FILM',
    description: 'A cinematic travel edit built around smooth transitions, atmosphere and visual rhythm.',
    demo: '/demo/the-journey',
    image: '/projects/project-05.jpg',
    number: '05',
    accent: '#f0f0f0'
  },
  {
    slug: 'cinematic-edit',
    title: 'CINEMATIC EDIT',
    category: 'VIDEO EDITING',
    description: 'A cinematic video edit showcasing storytelling, pacing, transitions, color grading and visual effects.',
    demo: '/demo/cinematic-edit',
    image: '/projects/project-01.jpg',
    video: '/videos/Sugu_bike.MP4',
    poster: '/website-assets/ezgif-frame-003_cinematic_bw_2140p.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '06',
    accent: '#f0f0f0'
  },
  {
    slug: 'triumph',
    title: 'TRIUMPH',
    category: 'VIDEO EDITING',
    description: 'A cinematic commercial edit showcasing pacing, transitions and polished color grading.',
    demo: '/demo/triumph',
    image: '/projects/project-02.jpg',
    video: '/videos/Triumph.MP4',
    poster: '/website-assets/ezgif-frame-004_cinematic_bw_2140p.jpg',
    linkLabel: 'VIEW PROJECT',
    number: '07',
    accent: '#d8d8d8'
  }
]
