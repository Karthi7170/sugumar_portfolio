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
          <a href="/#projects">SELECTED WORK</a>
          <a href="/#contact">CONTACT</a>
          <a href="/#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
