import React from 'react'
import styles from '../styles/Services.module.css'

const services = [
  {
    id: '01',
    title: 'CINEMATIC VIDEO EDITING',
    description:
      'Professional cinematic editing with pacing, transitions, storytelling and visual rhythm.'
  },
  {
    id: '02',
    title: 'SOCIAL MEDIA CONTENT',
    description:
      'Engaging short-form videos optimized for Instagram Reels, YouTube Shorts and social platforms.'
  },
  {
    id: '03',
    title: 'MUSIC VIDEO EDITING',
    description:
      'Emotion-driven music video edits with rhythm-based cuts, transitions and cinematic visual treatment.'
  },
  {
    id: '04',
    title: 'COLOR & VISUAL DESIGN',
    description:
      'Cinematic color grading, black-and-white treatments, visual effects and finishing.'
  }
]

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>SERVICES</div>
          <h2 className={styles.title}>WHAT I DO</h2>
          <p className={styles.copy}>
            I create cinematic visual experiences designed to capture attention, tell stories and make every frame feel intentional.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <article
              key={service.id}
              className={styles.card}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>{service.id}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>
              <a href="#contact" className={styles.action}>
                DISCUSS YOUR PROJECT <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
