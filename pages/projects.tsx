import Head from 'next/head'
import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import { filmCredits } from '../data/filmCredits'
import styles from '../styles/ProjectsPage.module.css'

const clientDescription = 'These published edits show how I approach real client footage: I build the pace around the message, keep every cut purposeful, and finish the visuals so the story stays clear, engaging and ready for the audience.'
const portfolioDescription = 'These selected films show the range I enjoy working across. I build each piece around the footage itself — using pacing, music, motion and visual texture to create a cinematic finish while keeping the edit clean and intentional.'

const advanceRail = (node: HTMLDivElement | null) => {
  if (!node) return
  const isAtEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 24
  if (isAtEnd) {
    node.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }
  node.scrollBy({ left: Math.max(node.clientWidth * 0.78, 320), behavior: 'smooth' })
}

export default function ProjectsPage() {
  const youtubeRail = useRef<HTMLDivElement>(null)
  const portfolioRail = useRef<HTMLDivElement>(null)

  const moveRail = (node: HTMLDivElement | null, direction: number) => {
    if (!node) return
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.78, 320), behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      advanceRail(youtubeRail.current)
      advanceRail(portfolioRail.current)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

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
                  <div className={styles.youtubeInfo}>
                    <div className={styles.youtubeNumber}>{work.number}</div>
                    <div className={styles.youtubeCategory}>{work.category}</div>
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
                <span>SWIPE / DRAG</span>
                <button type="button" onClick={() => moveRail(portfolioRail.current, -1)} aria-label="Previous portfolio films">←</button>
                <button type="button" onClick={() => moveRail(portfolioRail.current, 1)} aria-label="Next portfolio films">→</button>
              </div>
            </div>
            <div className={styles.projectRail} ref={portfolioRail}>
              {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
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
