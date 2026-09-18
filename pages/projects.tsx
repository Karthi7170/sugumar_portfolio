import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import { filmCredits } from '../data/filmCredits'
import styles from '../styles/ProjectsPage.module.css'

const clientDescription = 'These published edits show how I approach real client footage: I build the pace around the message, keep every cut purposeful, and finish the visuals so the story stays clear, engaging and ready for the audience.'
const portfolioDescription = 'These selected films show the range I enjoy working across. I build each piece around the footage itself — using pacing, music, motion and visual texture to create a cinematic finish while keeping the edit clean and intentional.'

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

export default function ProjectsPage() {
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
    <>
      <Head>
        <title>Sugumar — Video Editing Work</title>
        <meta name="description" content="Published YouTube client edits, Tamil feature-film experience and selected cinematic video editing work." />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.inner}>
          <header className={styles.hero}>
            <div className={styles.label}>WORK LIBRARY</div>
            <h1 className={styles.title}>PUBLISHED &<br />SELECTED WORK</h1>
            <p className={styles.lead}>This is a collection of work I&apos;ve edited across real client projects, feature-film post-production and selected cinematic pieces — all focused on clear storytelling, rhythm and finish.</p>
          </header>

          <section className={styles.publishedSection} aria-label="Published YouTube edits">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.sectionEyebrow}>CLIENT EDITS / YOUTUBE</span>
                <h2>Watch the finished work.</h2>
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
          </section>

          <section className={styles.creditsSection} aria-label="Film editing credits">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.sectionEyebrow}>SPECIAL CREDITS / FILM EXPERIENCE</span>
                <h2>Feature-film exposure.</h2>
              </div>
              <p>I&apos;ve worked as an assistant under Editor Madhan on Tamil feature-film projects, giving me practical experience inside professional post-production workflows.</p>
            </div>
            <div className={styles.creditGrid}>
              {filmCredits.map((credit, index) => (
                <article className={styles.creditCard} key={credit.title}>
                  <div className={styles.creditTop}>
                    <span>0{index + 1}</span>
                    <span>{credit.label}</span>
                  </div>
                  <h3>{credit.title}</h3>
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
          </section>

          <section className={styles.selectedSection} aria-label="Selected portfolio films">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.sectionEyebrow}>SELECTED PORTFOLIO FILMS</span>
                <h2>More editing range.</h2>
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
                        sizes="(max-width: 850px) 78vw, 760px"
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
