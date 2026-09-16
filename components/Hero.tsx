import Image from 'next/image'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.visual}>
        <Image src="/frames/cinematic/ezgif-frame-003_cinematic_bw_2140p.jpg" alt="Sugumar in a cinematic black-and-white portrait" fill priority sizes="(max-width: 700px) 100vw, 70vw" quality={80} className={styles.image} />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.label}><span /> INDEPENDENT VIDEO EDITOR</p>
        <h1 className={styles.title}>Every frame.<br />A feeling.</h1>
        <p className={styles.desc}>I’m Sugumar. I turn raw footage into cinematic stories — shaped by rhythm, emotion and a little obsession with detail.</p>
        <div className={styles.actions}>
          <a className={styles.cta} href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
          <a className={styles.secondary} href="#contact">Let’s collaborate <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className={styles.bottom}><span>EDITING · COLOR · STORYTELLING</span><a href="#projects">SCROLL TO EXPLORE ↓</a></div>
    </section>
  )
}
