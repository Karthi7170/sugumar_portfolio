import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import { filmCredits } from '../data/filmCredits'
import styles from '../styles/Projects.module.css'

const clientDescription = 'I treat every client edit as a piece of storytelling: I find the strongest moments, build the rhythm around the message, keep the cuts clean, and polish the final flow so it feels natural, engaging and ready to publish.'
const portfolioDescription = 'These films are where I explore my range more freely. I shape each edit around the mood of the footage — balancing pacing, music, motion and visual texture so the final piece feels cinematic without being over-edited.'

const getOffset = (index: number, active: number, total: number) => {
  let offset = index - active
  const half = Math.floor(total / 2)
  if (offset > half) offset -= total
  if (offset < -half) offset += total
  return offset
}

const getPositionClass = (offset: number) => {
  if (offset === 0) return styles.pos0
  if (offset === 1) return styles.pos1
  if (offset === 2) return styles.pos2
  if (offset === -1) return styles.neg1
  if (offset === -2) return styles.neg2
  return styles.hiddenCard
}

export default function Projects() {
  const [youtubeIndex, setYoutubeIndex] = useState(0)
  const [portfolioIndex, setPortfolioIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setYoutubeIndex((current) => (current + 1) % youtubeWorks.length)
      setPortfolioIndex((current) => (current + 1) % projects.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  const moveYoutube = (direction: number) => {
    setYoutubeIndex((current) => (current + direction + youtubeWorks.length) % youtubeWorks.length)
  }

  const movePortfolio = (direction: number) => {
    setPortfolioIndex((current) => (current + direction + projects.length) % projects.length)
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
            <span>AUTO / 3 SEC</span>
            <button type="button" onClick={() => moveYoutube(-1)} aria-label="Previous client edit">←</button>
            <button type="button" onClick={() => moveYoutube(1)} aria-label="Next client edit">→</button>
          </div>
        </div>

        <div className={styles.coverflowStage} aria-label="Client edits slider">
          {youtubeWorks.map((work, index) => {
            const offset = getOffset(index, youtubeIndex, youtubeWorks.length)
            const active = offset === 0
            return (
              <article
                className={styles.coverflowCard + ' ' + getPositionClass(offset)}
                key={work.id}
                onClick={() => !active && setYoutubeIndex(index)}
                role={!active ? 'button' : undefined}
                tabIndex={!active ? 0 : -1}
                onKeyDown={(event) => {
                  if (!active && (event.key === 'Enter' || event.key === ' ')) setYoutubeIndex(index)
                }}
                aria-label={!active ? 'Show ' + work.title : undefined}
              >
                <div className={styles.coverflowMedia}>
                  {active ? (
                    <iframe
                      src={work.embed}
                      title={work.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <img src={'https://i.ytimg.com/vi/' + work.id + '/hqdefault.jpg'} alt="" loading="lazy" />
                  )}
                  {!active && <span className={styles.sideLabel}>{work.title}</span>}
                  {active && (
                    <div className={styles.activeOverlay}>
                      <span>{work.number} / {work.category}</span>
                      <strong>{work.title}</strong>
                      <a href={work.url} target="_blank" rel="noreferrer">WATCH ON YOUTUBE ↗</a>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
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
            <span>AUTO / 3 SEC</span>
            <button type="button" onClick={() => movePortfolio(-1)} aria-label="Previous portfolio film">←</button>
            <button type="button" onClick={() => movePortfolio(1)} aria-label="Next portfolio film">→</button>
          </div>
        </div>

        <div className={styles.coverflowStage} aria-label="Selected portfolio films slider">
          {projects.map((project, index) => {
            const offset = getOffset(index, portfolioIndex, projects.length)
            const active = offset === 0
            return (
              <article
                className={styles.coverflowCard + ' ' + getPositionClass(offset)}
                key={project.slug}
                onClick={() => !active && setPortfolioIndex(index)}
                role={!active ? 'button' : undefined}
                tabIndex={!active ? 0 : -1}
                onKeyDown={(event) => {
                  if (!active && (event.key === 'Enter' || event.key === ' ')) setPortfolioIndex(index)
                }}
                aria-label={!active ? 'Show ' + project.title : undefined}
              >
                <div className={styles.coverflowMedia}>
                  <Image
                    src={project.poster ?? project.image}
                    alt={active ? project.title + ' video project' : ''}
                    fill
                    quality={95}
                    sizes="(max-width: 800px) 78vw, 760px"
                    className={styles.coverflowImage}
                  />
                  {!active && <span className={styles.sideLabel}>{project.title}</span>}
                  {active && (
                    <div className={styles.activeOverlay}>
                      <span>{project.number} / {project.category}</span>
                      <strong>{project.title}</strong>
                      <Link href={project.demo}>PLAY FILM ↗</Link>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className={styles.sharedNote}>
          <span>MY APPROACH / PORTFOLIO FILMS</span>
          <p>{portfolioDescription}</p>
        </div>
      </div>
    </section>
  )
}
