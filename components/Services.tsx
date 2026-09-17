import React from 'react'
import styles from '../styles/Services.module.css'

const services = [
  { id: '01', title: 'CINEMATIC EDITING', description: 'Narrative pacing, clean cuts and purposeful transitions that make the footage feel intentional.' },
  { id: '02', title: 'SOCIAL CONTENT', description: 'Short-form edits built for Reels, Shorts and campaign content without losing visual polish.' },
  { id: '03', title: 'MOTION & RHYTHM', description: 'Music-led cuts, kinetic sequencing and subtle motion design that support the story instead of distracting from it.' },
  { id: '04', title: 'COLOR & FINISHING', description: 'Color treatment, sound polish and final finishing that gives every delivery a cohesive cinematic look.' }
]

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>02 / SERVICES</div>
          <h2 className={styles.title}>From raw footage<br /><em>to final feeling.</em></h2>
          <p className={styles.copy}>Editing for brands, creators and visual stories — with a focus on rhythm, emotion and a premium final finish.</p>
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
