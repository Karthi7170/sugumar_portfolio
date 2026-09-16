import Image from 'next/image'
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
      <Link href={project.demo} className={styles.thumbWrap} aria-label={`Explore ${project.title}`} style={{ position: 'relative', display: 'block' }}>
        <Image src={project.poster ?? project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
      </Link>
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
