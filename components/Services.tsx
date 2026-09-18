import React from 'react'
import styles from '../styles/Services.module.css'

const services = [
  { id: '01', title: 'CINEMATIC EDITING', description: 'Narrative pacing, clean cuts and purposeful transitions that make the footage feel intentional.' },
  { id: '02', title: 'SOCIAL CONTENT', description: 'Short-form edits built for Reels, Shorts and campaign content without losing visual polish.' }
]

const tools = [
  { id: 'premiere', name: 'Premiere Pro', detail: 'Editing & timeline' },
  { id: 'aftereffects', name: 'After Effects', detail: 'Motion graphics & compositing' },
  { id: 'davinci', name: 'DaVinci Resolve', detail: 'Color grading & finishing' }
]

function ToolIcon({ id }: { id: string }) {
  if (id === 'premiere') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="9" y="9" width="46" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="17" y="42" fontSize="24" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">Pr</text>
      </svg>
    )
  }

  if (id === 'aftereffects') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="9" y="9" width="46" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="15" y="42" fontSize="23" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">Ae</text>
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
            <p>My core post-production setup covers editing, motion work, color grading and final delivery from one focused workflow.</p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool) => (
              <div key={tool.id} className={styles.toolCard + ' ' + styles[tool.id]}>
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
