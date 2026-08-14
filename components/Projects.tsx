import React from 'react'
import styles from '../styles/Projects.module.css'

const projects = [
  {
    id: '01',
    title: 'MIDNIGHT MOTION',
    category: 'CINEMATIC EDIT',
    description: 'A dark cinematic visual edit focused on atmosphere, movement and storytelling.',
    href: '/demo/midnight-motion',
    thumb: '/projects/project-01.jpg'
  },
  {
    id: '02',
    title: 'ONE LAST DANCE',
    category: 'MUSIC VIDEO',
    description: 'A cinematic music-video style edit with emotional pacing and dramatic transitions.',
    href: '/demo/one-last-dance',
    thumb: '/projects/project-02.jpg'
  },
  {
    id: '03',
    title: 'URBAN NIGHTS',
    category: 'SOCIAL MEDIA',
    description: 'Fast-paced urban visuals designed for Instagram Reels and short-form content.',
    href: '/demo/urban-nights',
    thumb: '/projects/project-03.jpg'
  },
  {
    id: '04',
    title: 'AFTER DARK',
    category: 'SHORT FILM',
    description: 'A moody short-film edit combining cinematic color, sound design and storytelling.',
    href: '/demo/after-dark',
    thumb: '/projects/project-04.jpg'
  },
  {
    id: '05',
    title: 'THE JOURNEY',
    category: 'TRAVEL FILM',
    description: 'A cinematic travel edit built around smooth transitions, atmosphere and visual rhythm.',
    href: '/demo/the-journey',
    thumb: '/projects/project-05.jpg'
  }
]

const Projects: React.FC = () => {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div className={styles.label}>SELECTED WORK</div>
          <h2>PROJECTS</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article className={`${styles.card} ${index === 0 ? styles.featured : ''}`} key={project.id}>
              <div className={styles.thumb} style={{ backgroundImage: `url(${project.thumb})` }} />
              <div className={styles.meta}>
                <div className={styles.number}>{project.id}</div>
                <div className={styles.category}>{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className={styles.view} href={project.href}>
                  VIEW DEMO <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
