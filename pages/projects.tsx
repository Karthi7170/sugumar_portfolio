import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { youtubeWorks } from '../data/youtubeWorks'
import styles from '../styles/ProjectsPage.module.css'

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Sugumar — Video Editing Work</title>
        <meta name="description" content="Published YouTube client edits and selected cinematic video editing work by Sugumar." />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.inner}>
          <header className={styles.hero}>
            <div className={styles.label}>WORK LIBRARY</div>
            <h1 className={styles.title}>PUBLISHED &<br />SELECTED WORK</h1>
            <p className={styles.lead}>A mix of live client edits published on YouTube and selected portfolio films across cinematic, automotive, brand and social content.</p>
          </header>

          <section className={styles.publishedSection} aria-label="Published YouTube edits">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.sectionEyebrow}>CLIENT EDITS / YOUTUBE</span>
                <h2>Watch the finished work.</h2>
              </div>
              <p>These edits are published live on YouTube and embedded directly into the portfolio.</p>
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
                  <div className={styles.youtubeInfo}>
                    <div className={styles.youtubeNumber}>{work.number}</div>
                    <div className={styles.youtubeCategory}>{work.category}</div>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                    <a href={work.url} target="_blank" rel="noreferrer" className={styles.youtubeLink}>
                      WATCH ON YOUTUBE <span aria-hidden="true">↗</span>
                    </a>
                  </div>
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
              <p>Cinematic portrait, automotive, brand and social edits hosted directly in the portfolio.</p>
            </div>
            <div className={styles.grid}>
              {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
