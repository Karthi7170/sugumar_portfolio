import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Navbar.module.css'

const sections = ['home', 'projects', 'services', 'about', 'contact']
export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  useEffect(() => {
    setOpen(false)
    if (router.pathname !== '/') {
      setActive(router.pathname.startsWith('/about') ? 'about' : 'projects')
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 })
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [router.asPath, router.pathname])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus() }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  return (
    <header className={styles.nav}>
      <Link href="/#home" className={styles.brand} onClick={() => setOpen(false)}>SUGUMAR<span>VIDEO EDITOR</span></Link>
      <button ref={button} type="button" className={styles.toggle} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close ×' : 'Menu +'}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={`${styles.links} ${open ? styles.open : ''}`}>
        {sections.map(section => <Link key={section} href={`/#${section}`} className={styles.link} aria-current={active === section ? 'location' : undefined} onClick={() => setOpen(false)}>{section === 'contact' ? 'Let’s talk ↗' : section === 'projects' ? 'Work' : section}</Link>)}
      </nav>
    </header>
  )
}
