import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import styles from '../styles/ProjectsPage.module.css'

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>SUGUMAR | Projects</title>
        <meta name="description" content="Selected projects by SUGUMAR — cinematic editor portfolio" />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.inner}>
          <header className={styles.hero}>
            <div className={styles.label}>SELECTED WORK</div>
            <h1 className={styles.title}>PROJECTS</h1>
            <p className={styles.lead}>
              A selection of cinematic edits, commercial visuals, music videos and social media content.
            </p>
          </header>

          <section className={styles.grid}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={index === 0}
              />
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
