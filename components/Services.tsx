import React from 'react'
import styles from '../styles/Services.module.css'

const services = [
  { id: '01', title: 'CINEMATIC EDITING', description: 'Narrative pacing, clean cuts and purposeful transitions that make the footage feel intentional.' },
  { id: '02', title: 'SOCIAL CONTENT', description: 'Short-form edits built for Reels, Shorts and campaign content without losing visual polish.' },
  { id: '03', title: 'MOTION & RHYTHM', description: 'Music-led cuts, kinetic sequencing and subtle motion design that support the story instead of distracting from it.' },
  { id: '04', title: 'COLOR & FINISHING', description: 'Color treatment, sound polish and final finishing that gives every delivery a cohesive cinematic look.' }
]

const tools = [
  { id: 'capcut', name: 'CapCut', detail: 'Short-form & social edits' },
  { id: 'finalcut', name: 'Final Cut Pro', detail: 'Fast professional editing' },
  { id: 'premiere', name: 'Adobe Premiere Pro', detail: 'Professional timeline editing' },
  { id: 'canva', name: 'Canva', detail: 'Graphics & social creatives' },
  { id: 'inshot', name: 'InShot', detail: 'Mobile-first video edits' },
  { id: 'davinci', name: 'DaVinci Resolve', detail: 'Editing, color & finishing' }
]

function ToolIcon({ id }: { id: string }) {
  if (id === 'capcut') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 17h36L38 28H22L14 17Zm0 30h36L38 36H22L14 47Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 18 46 46M46 18 18 46" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  }

  if (id === 'finalcut') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="13" y="22" width="38" height="27" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M13 22 20 11h38l-7 11H13Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="m23 12-7 10m18-10-7 10m18-10-7 10" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="m28 30 12 6-12 6V30Z" fill="currentColor" />
      </svg>
    )
  }

  if (id === 'premiere') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="18" y="41" fontSize="24" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">Pr</text>
      </svg>
    )
  }

  if (id === 'canva') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M42 22c-3-4-7-6-12-5-8 1-13 7-13 15s6 15 15 15c5 0 9-2 12-6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  }

  if (id === 'inshot') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="11" y="11" width="42" height="42" rx="11" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="20" y="20" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="32" cy="32" r="5" fill="currentColor" />
        <circle cx="47" cy="17" r="3" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 11c7 0 12 6 12 13 0 5-3 9-7 11-3 2-7 2-10 0-4-2-7-6-7-11 0-7 5-13 12-13Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M16 43c-3-6 0-13 6-16 5-2 10-1 13 3 2 3 3 7 1 10-2 5-7 8-12 8-3 0-6-2-8-5Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M48 43c3-6 0-13-6-16-5-2-10-1-13 3-2 3-3 7-1 10 2 5 7 8 12 8 3 0 6-2 8-5Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="32" cy="35" r="5" fill="currentColor" />
    </svg>
  )
}

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>02 / SERVICES</div>
          <h2 className={styles.title}>From raw footage<br /><em>to final feeling.</em></h2>
          <p className={styles.copy}>Editing for brands, creators and visual stories — with a focus on rhythm, emotion and a premium final finish.</p>
        </div>

        <div className={styles.toolsBlock}>
          <div className={styles.toolsIntro}>
            <div>
              <span className={styles.toolsEyebrow}>EDITING TOOLKIT</span>
              <h3>Tools I work with.</h3>
            </div>
            <p>A flexible workflow across desktop and mobile editing tools, from quick social cuts to professional color and finishing.</p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool) => (
              <div key={tool.id} className={`${styles.toolCard} ${styles[tool.id]}`}>
                <div className={styles.toolIcon}><ToolIcon id={tool.id} /></div>
                <div>
                  <h4>{tool.name}</h4>
                  <span>{tool.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.id} className={styles.card}>
              <span className={styles.number}>{service.id}</span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>
              <a href="#contact" className={styles.action}>DISCUSS A PROJECT <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Services
