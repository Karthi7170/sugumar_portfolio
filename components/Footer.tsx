import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandWrap}>
          <div className={styles.brand}>SUGUMAR</div>
          <div className={styles.role}>VIDEO EDITOR</div>
        </div>

        <div className={styles.copyright}>© {new Date().getFullYear()} SUGUMAR. ALL RIGHTS RESERVED.</div>

        <div className={styles.social}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YOUTUBE</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LINKEDIN</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
