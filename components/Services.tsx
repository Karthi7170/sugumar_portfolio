import React, { useEffect, useRef } from 'react'
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
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const cards = Array.from(node.querySelectorAll(`.${styles.card}`)) as HTMLElement[]
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className={styles.services}>
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
              className={`${styles.card} ${styles.hidden}`}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>{service.id}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>
              <span className={styles.action}>
                VIEW SERVICE <span aria-hidden="true">↗</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
