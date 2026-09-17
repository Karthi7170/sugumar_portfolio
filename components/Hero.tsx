import Image from 'next/image'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.visual} aria-hidden="true">
        <Image
          src="/images/sugumar-hero.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 62vw"
          quality={92}
          className={styles.image}
        />
      </div>
      <div className={styles.imageWash} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}><span /> VIDEO EDITOR · CINEMATIC STORYTELLER</p>
        <h1 className={styles.title}>
          Cut with rhythm.<br />
          <em>Finished with feeling.</em>
        </h1>
        <p className={styles.description}>
          I&apos;m Sugumar. I shape raw footage into polished films, social edits and visual stories with purposeful pacing, color and detail.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#projects">View selected work <span aria-hidden="true">↗</span></a>
          <a className={styles.secondary} href="#contact">Start a project</a>
        </div>
      </div>

      <div className={styles.footerLine}>
        <span>EDIT · COLOR · MOTION · SOUND</span>
        <a href="#projects">SCROLL TO WORK ↓</a>
      </div>
    </section>
  )
}
