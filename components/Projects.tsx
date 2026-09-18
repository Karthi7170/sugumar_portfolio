import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import { filmCredits } from '../data/filmCredits'
import styles from '../styles/Projects.module.css'

const clientDescription = 'I treat every client edit as a piece of storytelling: I find the strongest moments, build the rhythm around the message, keep the cuts clean, and polish the final flow so it feels natural, engaging and ready to publish.'
const portfolioDescription = 'These films are where I explore my range more freely. I shape each edit around the mood of the footage — balancing pacing, music, motion and visual texture so the final piece feels cinematic without being over-edited.'

export default function Projects() {
  const youtubeRail = useRef<HTMLDivElement>(null)
  const portfolioRail = useRef<HTMLDivElement>(null)

  const moveRail = (node: HTMLDivElement | null, direction: number) => {
    if (!node) return
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.78, 320), behavior: 'smooth' })
  }

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <div>
            <div className={styles.label}>01 / WORK</div>
            <h2>Published edits.<br /><em>Real client work.</em></h2>
          </div>
          <div className={styles.headingSide}>
            <p>I&apos;ve brought together published client work, feature-film experience and selected portfolio pieces to show how I approach pace, story and finish across different formats.</p>
            <Link href="/projects" className={styles.view}>View full work library <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={styles.subhead}>
          <div>
            <span>CLIENT EDITS / YOUTUBE</span>
            <p>Published work you can watch directly.</p>
          </div>
          <div className={styles.sliderControls}>
            <span>SWIPE / DRAG</span>
            <button type="button" onClick={() => moveRail(youtubeRail.current, -1)} aria-label="Previous client edits">←</button>
            <button type="button" onClick={() => moveRail(youtubeRail.current, 1)} aria-label="Next client edits">→</button>
          </div>
        </div>

        <div className={styles.youtubeRail} ref={youtubeRail}>
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
                <a href={work.url} target="_blank" rel="noreferrer" className={styles.youtubeLink}>
                  WATCH ON YOUTUBE <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.sharedNote}>
          <span>MY APPROACH / CLIENT EDITS</span>
          <p>{clientDescription}</p>
        </div>

        <div className={styles.creditSection}>
          <div className={styles.creditIntro}>
            <div>
              <span className={styles.creditEyebrow}>SPECIAL CREDITS / FILM EXPERIENCE</span>
              <h3>From digital edits to the film set.</h3>
            </div>
            <p>I&apos;ve also worked inside feature-film post-production under Editor Madhan, which gave me practical experience with professional timelines, review cycles and long-form narrative workflow.</p>
          </div>
          <div className={styles.creditGrid}>
            {filmCredits.map((credit, index) => (
              <article className={styles.creditCard} key={credit.title}>
                <div className={styles.creditTop}>
                  <span>0{index + 1}</span>
                  <span>{credit.label}</span>
                </div>
                <h4>{credit.title}</h4>
                <div className={styles.creditRole}>{credit.role}</div>
                <p>{credit.note}</p>
                {credit.url ? (
                  <a className={styles.creditLink} href={credit.url} target="_blank" rel="noreferrer">VIEW FILM / TRAILER ↗</a>
                ) : (
                  <span className={styles.creditLinkMuted}>ASSISTANT CREDIT</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.portfolioDivider}>
          <div>
            <span>SELECTED PORTFOLIO FILMS</span>
            <p>Cinematic, automotive, brand and social edits.</p>
          </div>
          <div className={styles.sliderControls}>
            <span>SWIPE / DRAG</span>
            <button type="button" onClick={() => moveRail(portfolioRail.current, -1)} aria-label="Previous portfolio films">←</button>
            <button type="button" onClick={() => moveRail(portfolioRail.current, 1)} aria-label="Next portfolio films">→</button>
          </div>
        </div>

        <div className={styles.portfolioRail} ref={portfolioRail}>
          {projects.map((project) => (
            <article className={styles.card} key={project.slug}>
              <Link href={project.demo} className={styles.media} aria-label={'Play ' + project.title}>
                <Image src={project.poster ?? project.image} alt={project.title + ' video project'} fill quality={95} sizes="(max-width: 900px) 88vw, 760px" className={styles.thumb} />
                <span className={styles.tint} style={{ background: project.accent }} aria-hidden="true" />
                <span className={styles.playIndicator} aria-hidden="true"><b>▶</b> PLAY FILM</span>
              </Link>
              <div className={styles.meta}>
                <div className={styles.category}>{project.number} / {project.category}</div>
                <h3><Link href={project.demo}>{project.title}</Link></h3>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.sharedNote}>
          <span>MY APPROACH / PORTFOLIO FILMS</span>
          <p>{portfolioDescription}</p>
        </div>
      </div>
    </section>
  )
}
