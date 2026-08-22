import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState } from 'react'
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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleTogglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await video.play()
      setIsPlaying(true)
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  const handleToggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleToggleFullscreen = async () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await video.requestFullscreen()
  }

  const handleMetadataLoad = () => {
    const video = videoRef.current
    if (!video) return

    setIsPlaying(!video.paused)
    setIsMuted(video.muted)
  }

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
                <button type="button" className={styles.playBtn} onClick={handleTogglePlay}>
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button type="button" className={styles.playBtn} onClick={handleToggleMute}>
                  {isMuted ? 'UNMUTE' : 'MUTE'}
                </button>
                <button type="button" className={styles.playBtn} onClick={handleToggleFullscreen}>
                  FULLSCREEN
                </button>
                <Link href="/projects" className={styles.backBtn}>BACK TO PROJECTS</Link>
              </div>
            </div>

            <div className={styles.preview}>
              {project.video ? (
                <video
                  ref={videoRef}
                  className={styles.previewVideo}
                  src={project.video}
                  poster={project.poster ?? project.image}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                  onLoadedMetadata={handleMetadataLoad}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onVolumeChange={() => setIsMuted(Boolean(videoRef.current?.muted))}
                />
              ) : (
                <div className={styles.previewLabel}>VIDEO PREVIEW</div>
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
