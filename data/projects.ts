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
    slug: 'portrait-story',
    title: 'PORTRAIT STORY',
    category: 'CINEMATIC PORTRAIT',
    description: 'A character-led edit built around quiet performance, emotional pacing and a natural cinematic finish.',
    demo: '/demo/portrait-story',
    image: '/projects/sugu.webp',
    video: '/web-videos/portrait-story.mp4',
    poster: '/projects/sugu.webp',
    linkLabel: 'PLAY FILM',
    number: '01',
    accent: '#ef8f49'
  },
  {
    slug: 'ride-in-motion',
    title: 'RIDE IN MOTION',
    category: 'AUTOMOTIVE EDIT',
    description: 'A movement-focused motorcycle edit balancing speed, texture and rhythmic cuts for a cinematic road feel.',
    demo: '/demo/ride-in-motion',
    image: '/projects/project-02.jpg',
    video: '/web-videos/ride-in-motion.mp4',
    poster: '/projects/project-02.jpg',
    linkLabel: 'PLAY FILM',
    number: '02',
    accent: '#d9533f'
  },
  {
    slug: 'skyone-brand-film',
    title: 'SKYONE',
    category: 'BRAND / COMMERCIAL',
    description: 'A clean commercial-style edit shaped around place, architecture and branded visual storytelling.',
    demo: '/demo/skyone-brand-film',
    image: '/projects/project-03.jpg',
    video: '/web-videos/skyone-brand-film.mp4',
    poster: '/projects/project-03.jpg',
    linkLabel: 'PLAY FILM',
    number: '03',
    accent: '#f1a848'
  },
  {
    slug: 'training-energy',
    title: 'TRAINING ENERGY',
    category: 'FITNESS / SOCIAL',
    description: 'A vertical social edit with energetic sequencing, performance moments and punchy short-form pacing.',
    demo: '/demo/training-energy',
    image: '/projects/project-04.jpg',
    video: '/web-videos/training-energy.mp4',
    poster: '/projects/project-04.jpg',
    linkLabel: 'PLAY FILM',
    number: '04',
    accent: '#69c8bf'
  },
  {
    slug: 'triumph-road-film',
    title: 'TRIUMPH ROAD FILM',
    category: 'AUTOMOTIVE / LIFESTYLE',
    description: 'A polished road-film edit using clean motion, measured pacing and warm cinematic grading.',
    demo: '/demo/triumph-road-film',
    image: '/projects/project-05.jpg',
    video: '/web-videos/triumph-road-film.mp4',
    poster: '/projects/project-05.jpg',
    linkLabel: 'PLAY FILM',
    number: '05',
    accent: '#d7b089'
  }
]
