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
        <title>Sugumar — Selected Video Editing Work</title>
        <meta name="description" content="Selected cinematic, automotive, brand and social video editing work by Sugumar." />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.inner}>
          <header className={styles.hero}>
            <div className={styles.label}>PROJECT LIBRARY</div>
            <h1 className={styles.title}>SELECTED WORK</h1>
            <p className={styles.lead}>Five client-facing video pieces across cinematic portrait, automotive, brand and social content. Open a project to watch the full edit.</p>
          </header>
          <section className={styles.grid} aria-label="Video editing projects">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
