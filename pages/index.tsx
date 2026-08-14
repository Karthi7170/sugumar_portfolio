import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [transitioning, setTransitioning] = useState(false)
  const [reversing, setReversing] = useState(false)
  const [projectsVisible, setProjectsVisible] = useState(false)
  const firstTransitionDone = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleFirstTransition = (event: WheelEvent | TouchEvent) => {
      if (firstTransitionDone.current || transitioning || reversing) return
      if (window.scrollY > 10) return

      if ('deltaY' in event && (event as WheelEvent).deltaY <= 0) return

      event.preventDefault()
      firstTransitionDone.current = true
      setTransitioning(true)
      window.setTimeout(() => {
        setProjectsVisible(true)
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        window.setTimeout(() => setTransitioning(false), 500)
      }, 1050)
    }

    const handleReverseTransition = () => {
      if (!projectsVisible || transitioning || reversing) return
      if (window.scrollY > 80) return

      setReversing(true)
      setProjectsVisible(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setReversing(false), 850)
    }

    const onWheel = (event: WheelEvent) => {
      if (firstTransitionDone.current) {
        if (event.deltaY < 0 && projectsVisible) handleReverseTransition()
        return
      }
      if (event.deltaY > 0) handleFirstTransition(event)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (window.scrollY > 10 || !event.touches || !event.touches[0]) return
      if (firstTransitionDone.current) {
        if (projectsVisible && window.scrollY < 100) handleReverseTransition()
        return
      }
      handleFirstTransition(event)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [transitioning, reversing, projectsVisible])

  return (
    <>
      <Head>
        <title>Video Editor — Cinematic Portfolio</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className={transitioning || reversing ? 'home-hero-turning' : ''}>
        <Hero transitionActive={transitioning || reversing} reverse={reversing} />
        <div className={projectsVisible ? 'projects-visible' : 'projects-hidden'}>
          <Projects />
        </div>
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
