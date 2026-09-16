import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../data/projects'
import styles from '../styles/Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div><div className={styles.label}>01 / SELECTED WORK</div><h2>Stories in motion.</h2></div>
          <Link href="/projects" className={styles.view}>All projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.grid}>
          {projects.slice(0, 6).map(project => (
            <article className={styles.card} key={project.slug}>
              <Link href={project.demo} className={styles.media} aria-label={`Explore ${project.title}`}>
                <Image src={project.poster ?? project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.thumb} />
                <span className={styles.playIndicator} aria-hidden="true">EXPLORE ↗</span>
              </Link>
              <div className={styles.meta}>
                <div className={styles.category}>{project.number} / {project.category}</div>
                <h3><Link href={project.demo}>{project.title}</Link></h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
