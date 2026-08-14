import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Navbar.module.css'

const SECTIONS = ['home', 'projects', 'services', 'about', 'contact'] as const

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>('home')
  const linksRef = useRef<HTMLElement | null>(null)
  const underlineRef = useRef<HTMLDivElement | null>(null)

  const resolveActive = () => {
    if (typeof window === 'undefined') return 'home'
    const path = window.location.pathname
    if (path.startsWith('/projects')) return 'projects'
    if (path.startsWith('/about')) return 'about'
    if (path === '/') {
      const hash = window.location.hash.replace('#', '')
      if (SECTIONS.includes(hash as any)) return hash
    }
    return 'home'
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const syncActive = () => setActive(resolveActive())
    syncActive()

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActive(visible[0].target.id)
        }
      },
      { threshold: [0.5, 0.6, 0.75], root: null }
    )

    if (window.location.pathname === '/') {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }

    window.addEventListener('hashchange', syncActive)
    window.addEventListener('popstate', syncActive)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncActive)
      window.removeEventListener('popstate', syncActive)
    }
  }, [])

  useEffect(() => {
    let ctx: any
    const update = async () => {
      const linksEl = linksRef.current
      const underEl = underlineRef.current
      if (!linksEl || !underEl) return

      const routeMap: Record<string, string> = {
        home: '/',
        projects: '/projects',
        services: '/#services',
        about: '/about',
        contact: '/#contact'
      }

      const target = routeMap[active] ?? '/'
      let linkEl = Array.from(linksEl.querySelectorAll('a')).find((el) => {
        const href = el.getAttribute('href') || ''
        return href === target || href === `${target}#home` || href === `${target}#contact`
      }) as HTMLElement | null

      if (!linkEl) {
        linkEl = linksEl.querySelector('a') as HTMLElement | null
      }
      if (!linkEl) return

      const linksRect = linksEl.getBoundingClientRect()
      const linkRect = linkEl.getBoundingClientRect()
      const left = linkRect.left - linksRect.left
      const width = linkRect.width

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        underEl.style.width = `${width}px`
        underEl.style.transform = `translateX(${left}px)`
        return
      }

      const { gsap } = await import('gsap')
      ctx = gsap.to(underEl, { x: left, width, duration: 0.6, ease: 'power3.out' })
    }

    requestAnimationFrame(() => { update() })
    const onResize = () => { requestAnimationFrame(() => { update() }) }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (ctx && ctx.kill) ctx.kill()
    }
  }, [active])

  return (
    <header className={styles.nav}>
      <div className={styles.brandWrap}>
        <Link href="/" className={styles.brandLink}>
          <span className={styles.brandName}>SUGUMAR</span>
          <span className={styles.brandRole}>VIDEO EDITOR</span>
        </Link>
      </div>
      <nav className={styles.links} ref={linksRef}>
        <Link href="/#home" className={styles.link} aria-current={active === 'home' ? 'page' : undefined}>HOME</Link>
        <Link href="/#projects" className={styles.link} aria-current={active === 'projects' ? 'page' : undefined}>PROJECTS</Link>
        <Link href="/#services" className={styles.link} aria-current={active === 'services' ? 'page' : undefined}>SERVICES</Link>
        <Link href="/#about" className={styles.link} aria-current={active === 'about' ? 'page' : undefined}>ABOUT</Link>
        <Link href="/#contact" className={styles.link} aria-current={active === 'contact' ? 'page' : undefined}>GET IN TOUCH</Link>
        <div ref={underlineRef} className={styles.underline} aria-hidden="true" />
      </nav>

      <div className={styles.progress} aria-hidden="true">
        {['HOME', 'PROJECTS', 'SERVICES', 'ABOUT', 'CONTACT'].map((label, index) => (
          <span
            key={label}
            className={`${styles.progressItem} ${active === ['home', 'projects', 'services', 'about', 'contact'][index] ? styles.progressItemActive : ''}`}
          >
            <i />
            <em>{index + 1}</em>
          </span>
        ))}
      </div>
    </header>
  )
}

export default Navbar
