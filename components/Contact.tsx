import React from 'react'
import styles from '../styles/Contact.module.css'

const Contact: React.FC = () => {
  const openEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const message = `Hi Sugumar, I’m ${values.get('name')}.\nEmail: ${values.get('email')}\n\n${values.get('message')}`
    window.location.assign(`https://wa.me/919150319110?text=${encodeURIComponent(message)}`)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.statementWrap}>
          <div className={`${styles.statement}`} style={{ transitionDelay: '0ms' }}>
            <span className={styles.label}>GET IN TOUCH</span>
            <h2>LET&apos;S CREATE<br />SOMETHING<br />CINEMATIC.</h2>
          </div>
          <div className={`${styles.note}`} style={{ transitionDelay: '120ms' }}>
            <p>Have a project in mind?</p>
            <p>Let&apos;s bring it to life.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoPanel}>
            <div className={`${styles.headingWrap}`} style={{ transitionDelay: '180ms' }}>
              <div className={styles.label}>GET IN TOUCH</div>
              <h3>Let&apos;s create something cinematic together.</h3>
            </div>

            <div className={`${styles.description}`} style={{ transitionDelay: '260ms' }}>
              I&apos;m always open to discussing new projects, creative ideas, collaborations and opportunities.
            </div>

            <div className={styles.contactList}>
              <a
                href="https://wa.me/919150319110"
                className={`${styles.contactItem}`}
                style={{ transitionDelay: '340ms' }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7.5C4 6.67157 4.67157 6 5.5 6H18.5C19.3284 6 20 6.67157 20 7.5V16.5C20 17.3284 19.3284 18 18.5 18H5.5C4.67157 18 4 17.3284 4 16.5V7.5Z" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M4.5 7L12 12.5L19.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.itemText}>
                  <small>WHATSAPP</small>
                  <strong>Start a conversation ↗</strong>
                </span>
              </a>

              <a
                href="tel:+919150319110"
                className={`${styles.contactItem}`}
                style={{ transitionDelay: '420ms' }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 4.5H7.5C6.39543 4.5 5.5 5.39543 5.5 6.5V17.5C5.5 18.6046 6.39543 19.5 7.5 19.5H16.5C17.6046 19.5 18.5 18.6046 18.5 17.5V6.5C18.5 5.39543 17.6046 4.5 16.5 4.5H15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M9 7.5H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M10.5 16.5H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className={styles.itemText}>
                  <small>PHONE</small>
                  <strong>+91 91503 19110</strong>
                </span>
              </a>
            </div>
          </div>

          <div className={styles.formPanel}>
            <form className={styles.form} onSubmit={openEnquiry}>
              <div className={`${styles.field}`} style={{ transitionDelay: '260ms' }}>
                <label htmlFor="name">YOUR NAME</label>
                <input id="name" name="name" autoComplete="name" required maxLength={100} type="text" placeholder="Enter your name" />
              </div>

              <div className={`${styles.field}`} style={{ transitionDelay: '390ms' }}>
                <label htmlFor="email">EMAIL</label>
                <input id="email" name="email" autoComplete="email" required type="email" placeholder="Enter your email" />
              </div>

              <div className={`${styles.field}`} style={{ transitionDelay: '520ms' }}>
                <label htmlFor="message">PROJECT DETAILS</label>
                <textarea id="message" name="message" required maxLength={2000} placeholder="Tell me about your project..." rows={6} />
              </div>

              <div className={`${styles.submitWrap}`} style={{ transitionDelay: '650ms' }}>
                <p className={styles.description}>Opens WhatsApp with your enquiry. Review it there before sending.</p>
                <button type="submit">CONTINUE IN WHATSAPP <span aria-hidden="true">↗</span></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
