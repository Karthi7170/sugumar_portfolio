import React, { useEffect, useRef } from 'react'
import styles from '../styles/Projects.module.css'
import { projects } from '../data/projects'

const Projects: React.FC = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([])

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: [0.45, 0.6]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        if (!video) return

        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          // attempt to play when visible
          if (video.paused) {
            video.play().catch(() => {
              // autoplay might be blocked; keep it muted and ready for user interaction
            })
          }
        } else {
          if (!video.paused) video.pause()
        }
      })
    }, options)

    videoRefs.current.forEach((v) => {
      if (v) observer.observe(v)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div className={styles.label}>SELECTED WORK</div>
          <h2>PROJECTS</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article className={`${styles.card} ${index === 0 ? styles.featured : ''}`} key={project.slug}>
              {project.video ? (
                <div className={styles.media}>
                  <video
                    ref={(el) => { if (el) videoRefs.current[index] = el }}
                    className={styles.video}
                    src={project.video}
                    poster={project.poster ?? project.image}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />
                  <div className={styles.overlay} />
                  <div className={styles.playIndicator}>PLAY</div>
                </div>
              ) : (
                <div className={styles.thumb} style={{ backgroundImage: `url(${project.image})` }} />
              )}
              <div className={styles.meta}>
                <div className={styles.number}>{project.number}</div>
                <div className={styles.category}>{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className={styles.view} href={project.demo}>
                  {project.linkLabel ?? 'VIEW PROJECT'} <span aria-hidden="true">↗</span>
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
