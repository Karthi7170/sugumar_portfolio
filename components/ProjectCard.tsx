import Link from 'next/link'
import React from 'react'
import styles from '../styles/ProjectsPage.module.css'
import type { ProjectItem } from '../data/projects'

type Props = {
  project: ProjectItem
  featured?: boolean
}

const ProjectCard: React.FC<Props> = ({ project, featured }) => {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {project.video ? (
        <div className={styles.mediaWrap}>
          <video
            className={styles.video}
            src={project.video}
            poster={project.poster ?? project.image}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
          <div className={styles.videoOverlay} />
        </div>
      ) : (
        <div className={styles.thumbWrap}>
          <div
            className={styles.thumb}
            style={{
              backgroundImage: `url('${project.image}')`,
              boxShadow: `inset 0 0 0 1px ${project.accent}22`
            }}
          />
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.number}>{project.number}</div>
        <div className={styles.category}>{project.category}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <Link href={project.demo} className={styles.link}>
          {project.linkLabel ?? 'VIEW DEMO'} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
