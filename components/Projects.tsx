import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import styles from '../styles/Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div>
            <div className={styles.label}>01 / WORK</div>
            <h2>Published edits.<br /><em>Real client work.</em></h2>
          </div>
          <div className={styles.headingSide}>
            <p>Live YouTube edits and selected portfolio films — structured to show both published client work and cinematic editing range.</p>
            <Link href="/projects" className={styles.view}>View full work library <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={styles.subhead}>
          <span>CLIENT EDITS / YOUTUBE</span>
          <p>Published work you can watch directly.</p>
        </div>

        <div className={styles.youtubeGrid}>
          {youtubeWorks.map((work) => (
            <article className={styles.youtubeCard} key={work.id}>
              <div className={styles.videoFrame}>
                <iframe
                  src={work.embed}
                  title={work.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className={styles.youtubeMeta}>
                <div className={styles.category}>{work.number} / {work.category}</div>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <a href={work.url} target="_blank" rel="noreferrer" className={styles.youtubeLink}>
                  WATCH ON YOUTUBE <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.portfolioDivider}>
          <span>SELECTED PORTFOLIO FILMS</span>
          <p>Additional cinematic, automotive, brand and social edits.</p>
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
