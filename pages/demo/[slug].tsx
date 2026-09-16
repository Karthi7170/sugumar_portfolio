import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { projects, type ProjectItem } from '../../data/projects'
import styles from '../../styles/DemoPage.module.css'

export async function getStaticPaths() {
  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug) ?? null

  if (!project) {
    return { notFound: true }
  }

  return {
    props: { project }
  }
}

type Props = {
  project: ProjectItem
}

export default function DemoPage({ project }: Props) {
  const [videoError, setVideoError] = useState(false)

  return (
    <>
      <Head>
        <title>{project.title} | SUGUMAR</title>
        <meta name="description" content={project.description} />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.inner}>
          <div className={styles.hero}>
            <div className={styles.meta}>
              <span className={styles.kicker}>Selected Work</span>
              <h1 className={styles.title}>{project.title}</h1>
              <div className={styles.category}>{project.category}</div>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.controls}>
                <Link href="/projects" className={styles.backBtn}>BACK TO PROJECTS</Link>
              </div>
            </div>

            <div className={styles.preview}>
              {videoError && <p role="status">This film could not be loaded. Please try again later.</p>}
              {project.video ? (
                <video
                  className={styles.previewVideo}
                  src={project.video}
                  poster={project.poster ?? project.image}
                  playsInline
                  controls
                  preload="none"
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className={styles.previewLabel}>Film preview coming soon</div>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Project Type</div>
              <div className={styles.detailValue}>{project.category}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Creative Focus</div>
              <div className={styles.detailValue}>Storytelling, pacing, atmosphere, and cinematic visual rhythm.</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
