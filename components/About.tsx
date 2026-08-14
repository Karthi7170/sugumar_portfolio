import React from 'react'
import styles from '../styles/About.module.css'

const skills = ['VIDEO EDITOR', 'CINEMATIC STORYTELLING', 'SOCIAL MEDIA', 'MUSIC VIDEOS']

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>ABOUT</div>
          <h2>ABOUT ME</h2>
        </div>

        <div className={styles.columns}>
          <div className={styles.left}>
            <p>
              I&apos;m Sugumar, a video editor focused on cinematic storytelling, creative visual experiences and engaging digital content.
            </p>
            <p>
              I transform raw footage into visual stories with strong pacing, emotion, transitions and attention to detail.
            </p>
          </div>

          <div className={styles.right}>
            <div className={styles.tags}>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
