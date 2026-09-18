import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../data/projects'
import styles from '../styles/Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div>
            <div className={styles.label}>01 / SELECTED WORK</div>
            <h2>Five films.<br /><em>Five different energies.</em></h2>
          </div>
          <div className={styles.headingSide}>
            <p>Client work across cinematic portraits, automotive, brand and social content.</p>
            <Link href="/projects" className={styles.view}>View project library <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article className={styles.card + (index === 0 ? ' ' + styles.featured : '')} key={project.slug}>
              <Link href={project.demo} className={styles.media} aria-label={'Play ' + project.title}>
                <Image src={project.poster ?? project.image} alt={project.title + ' video project'} fill quality={95} sizes={index === 0 ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 900px) 100vw, 50vw'} className={styles.thumb} />
                <span className={styles.tint} style={{ background: project.accent }} aria-hidden="true" />
                <span className={styles.playIndicator} aria-hidden="true"><b>▶</b> PLAY FILM</span>
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
