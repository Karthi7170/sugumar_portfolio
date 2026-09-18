import React from 'react'
import styles from '../styles/About.module.css'

const skills = ['EDITING', 'MOTION', 'SOUND', 'SOCIAL CUTS', 'CINEMATIC PACING']

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>03 / ABOUT</div>
          <h2>Story first.<br /><em>Style with purpose.</em></h2>
        </div>
        <div className={styles.columns}>
          <div className={styles.left}>
            <p>I&apos;m Sugumar, a video editor focused on cinematic storytelling and high-impact digital content.</p>
            <p>My approach is simple: find the strongest emotion in the footage, build the rhythm around it, then polish every detail until the cut feels effortless.</p>
          </div>
          <div className={styles.right}>
            <div className={styles.quote}>“Every cut should move the story forward — visually or emotionally.”</div>
            <div className={styles.tags}>
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About
