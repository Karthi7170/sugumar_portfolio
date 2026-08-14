import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import styles from '../styles/Hero.module.css'

type FrameManifest = string[]

type HeroProps = {
  transitionActive?: boolean
  reverse?: boolean
}

const Hero: React.FC<HeroProps> = ({ transitionActive = false, reverse = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)
  const [loaded, setLoaded] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ctxGsap: any = null
    let images: HTMLImageElement[] = []
    let mounted = true

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobileCheck = () => window.innerWidth <= 800
    setIsMobile(mobileCheck())

    const resizeCanvas = (canvas: HTMLCanvasElement, image?: HTMLImageElement) => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement, options: { zoom: number, offsetX: number, faceX?: number, faceY?: number }) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const cw = canvas.width / (window.devicePixelRatio || 1)
      const ch = canvas.height / (window.devicePixelRatio || 1)

      // use cover scaling so the image fills the viewport without empty margins
      const baseScale = Math.max(cw / img.width, ch / img.height) * 1.08
      const totalScale = baseScale * options.zoom

      // focal point in image coordinates (default center-ish)
      const faceX = options.faceX ?? 0.5
      const faceY = options.faceY ?? 0.45
      const fx = img.width * faceX
      const fy = img.height * faceY

      // target canvas point — keep the subject anchored slightly right to preserve the cinematic left-text composition
      const targetCenterX = cw * 0.62 + (options.offsetX || 0)
      const targetCenterY = ch * 0.5

      const drawW = img.width * totalScale
      const drawH = img.height * totalScale

      const drawX = targetCenterX - fx * totalScale
      const drawY = targetCenterY - fy * totalScale

      // clear and draw
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    const detectFaceFocal = async (img: HTMLImageElement) : Promise<{x:number,y:number}> => {
      // simple heuristic: find centroid of darker pixels (assumes subject is darker than background)
      const tmp = document.createElement('canvas')
      const scale = 200 / Math.max(img.width, img.height)
      tmp.width = Math.max(1, Math.floor(img.width * scale))
      tmp.height = Math.max(1, Math.floor(img.height * scale))
      const tctx = tmp.getContext('2d')!
      tctx.drawImage(img, 0, 0, tmp.width, tmp.height)
      const data = tctx.getImageData(0,0,tmp.width,tmp.height).data
      let sum = 0, cx = 0, cy = 0
      for (let y=0;y<tmp.height;y++){
        for (let x=0;x<tmp.width;x++){
          const i = (y*tmp.width + x) * 4
          const r = data[i], g = data[i+1], b = data[i+2]
          // luminance
          const lum = 0.299*r + 0.587*g + 0.114*b
          // weight darker pixels more (invert luminance)
          const weight = 255 - lum
          if (weight > 10) { // ignore near-white background
            sum += weight
            cx += x * weight
            cy += y * weight
          }
        }
      }
      if (sum === 0) return { x: 0.5, y: 0.45 }
      const fx = (cx / sum) / tmp.width
      const fy = (cy / sum) / tmp.height
      // clamp
      return { x: Math.min(0.9, Math.max(0.1, fx)), y: Math.min(0.9, Math.max(0.1, fy)) }
    }

    const preloadFrames = async (manifest: FrameManifest) => {
      const canvas = canvasRef.current!
      images = new Array(manifest.length)
      let loadedCount = 0

      const mobileMode = window.innerWidth <= 800 || manifest[0]?.startsWith('mobile/')

      if (mobileMode) {
        // parallel loading for mobile: faster perceived load
        const promises = manifest.map((m, idx) => new Promise<void>((res) => {
          const path = '/frames/' + m.replace(/\\/g, '/')
          const img = new Image()
          img.src = path
          img.loading = 'eager'
          img.decoding = 'async'
          img.onload = () => {
            images[idx] = img
            loadedCount++
            setLoadingProgress(Math.round((loadedCount / manifest.length) * 100))
            if (loadedCount === 1) resizeCanvas(canvas, img)
            res()
          }
          img.onerror = () => { loadedCount++; setLoadingProgress(Math.round((loadedCount / manifest.length) * 100)); res() }
        }))

        await Promise.all(promises)
        if (!mounted) return
      } else {
        // sequential loading for desktop (preserve order and memory)
        for (let i = 0; i < manifest.length; i++) {
          const path = '/frames/' + manifest[i].replace(/\\/g, '/')
          images[i] = new Image()
          images[i].src = path
          images[i].loading = 'eager'
          // await load per image
          await new Promise<void>((res) => {
            images[i].onload = () => {
              loadedCount++
              setLoadingProgress(Math.round((loadedCount / manifest.length) * 100))
              // adjust canvas size to first loaded image
              if (loadedCount === 1) resizeCanvas(canvas, images[i])
              res()
            }
            images[i].onerror = () => {
              // skip image on error
              loadedCount++
              setLoadingProgress(Math.round((loadedCount / manifest.length) * 100))
              res()
            }
          })
          if (!mounted) return
        }
      }

      setLoaded(true)
      return images
    }

    const setupAnimation = async (manifest: FrameManifest) => {
      const canvas = canvasRef.current!
      if (!canvas) return

      // preload
      const imgs = await preloadFrames(manifest)
      if (!mounted || !imgs || imgs.length === 0) return

      // adjust parameters for mobile if small screen (use lighter zoom/offset)
      const isMobileLocal = window.innerWidth <= 800
      const FINAL_ZOOM = isMobileLocal ? 1.35 : 1.6
      const FINAL_OFFSET_RATIO = isMobileLocal ? 0.12 : 0.22

      // initial draw — auto-detect focal point from first frame if possible
      resizeCanvas(canvas, imgs[0])
      let detected = { x: 0.5, y: 0.45 }
      try {
        detected = await detectFaceFocal(imgs[0])
      } catch (e) {
        // fallback to center-ish
        detected = { x: 0.5, y: 0.45 }
      }
      // draw first frame using detected focal point
      drawFrame(canvas, imgs[0], { zoom: 1, offsetX: 0, faceX: detected.x, faceY: detected.y })

      // if reduced motion, do not setup ScrollTrigger; show static first frame
      if (prefersReduced) return

      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctxGsap = gsap.context(() => {
        // use detected focal point if available (detected variable from outer scope)
        const detectedFace = (typeof detected !== 'undefined') ? detected : { x: 0.5, y: 0.45 }

        const obj: any = { frame: 0, zoom: 1, offsetX: 0, faceX: detectedFace.x, faceY: detectedFace.y }
        const totalFrames = imgs.length
        const finalZoom = FINAL_ZOOM
        const finalOffset = - (window.innerWidth * FINAL_OFFSET_RATIO) // shift focus left by ratio

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current || canvas,
            start: 'top top',
            end: '+=1500',
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 0.5
          }
        })

        // animate frame index from 0 to last (use linear easing)
        tl.to(obj, {
          frame: totalFrames - 1,
          ease: 'none',
          onUpdate: () => {
            const idx = Math.min(totalFrames - 1, Math.floor(obj.frame))
            drawFrame(canvas, imgs[idx], { zoom: obj.zoom, offsetX: obj.offsetX, faceX: obj.faceX, faceY: obj.faceY })
          }
        }, 0)

        // animate zoom and offset in parallel (starts slow and accelerates)
        tl.to(obj, { zoom: 1.08, ease: 'power1.out', duration: 0.35 }, 0)
        tl.to(obj, { zoom: 1.18, ease: 'power2.inOut', duration: 0.4 }, 0.4)
        tl.to(obj, { zoom: finalZoom, ease: 'power3.in', duration: 0.6 }, 0.9)

        // offset move left (face moves left on canvas)
        tl.to(obj, { offsetX: finalOffset, ease: 'power2.inOut', duration: 1.6 }, 0)

      }, containerRef)
    }

    // choose manifest based on screen size (use lightweight mobile manifest when available)
    const isMobileRequest = window.innerWidth <= 800
    const manifestUrl = isMobileRequest ? '/frames/manifest.mobile.json' : '/frames/manifest.json'

    fetch(manifestUrl)
      .then((r) => {
        if (!r.ok) throw new Error('Manifest not found')
        return r.json()
      })
      .then((manifest: FrameManifest) => {
        if (!mounted) return
        // fallback: if mobile manifest is missing, try full manifest
        if ((!manifest || manifest.length === 0) && isMobileRequest) {
          console.warn('Mobile manifest empty; falling back to full manifest')
          return fetch('/frames/manifest.json').then((r) => r.json())
        }
        return manifest
      })
      .then((manifest: FrameManifest) => {
        if (!manifest || manifest.length === 0) {
          console.error('No frames found in manifest')
          return
        }
        setupAnimation(manifest)
      })
      .catch((err) => console.error('Failed to load frames manifest', err))

    // handle resize
    const onResize = () => {
      const canvas = canvasRef.current
      if (!canvas || images.length === 0) return
      resizeCanvas(canvas, images[0])
    }
    window.addEventListener('resize', onResize)

    // hide mobile hint on first interaction (wheel or touch)
    const hideHint = () => {
      const el = document.getElementById('swipeHint')
      if (el) el.classList.add('hide')
      window.removeEventListener('wheel', hideHint)
      window.removeEventListener('touchstart', hideHint)
    }
    window.addEventListener('wheel', hideHint, { passive: true })
    window.addEventListener('touchstart', hideHint, { passive: true })

    return () => {
      mounted = false
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', hideHint)
      window.removeEventListener('touchstart', hideHint)
      if (ctxGsap && ctxGsap.revert) ctxGsap.revert()
    }
  }, [])

  return (
    <section
      id="home"
      className={`${styles.hero} ${transitionActive ? (reverse ? styles.reverseTurning : styles.turning) : ''}`}
      ref={(el) => (containerRef.current = el as HTMLElement | null)}
    >
      <Navbar />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
      <div className={styles.overlay} />
      <div className={styles.floatingAccent} aria-hidden="true" />
      {!loaded && (
        <div className={styles.loader}>
          <div className={styles.loaderInner}>
            <div className={styles.spin} />
            <div className={styles.progress}>{loadingProgress}%</div>
            <div className={styles.hint}>Loading frames…</div>
          </div>
        </div>
      )}

      {/* mobile swipe hint */}
      {isMobile && loaded && (
        <div className={styles.hintMobile} id="swipeHint">Swipe up to animate</div>
      )}

      <div className={styles.content} aria-hidden={loaded ? 'false' : 'true'}>
        <div className={styles.label}>VIDEO EDITOR</div>
        <h1 className={styles.title}>I TURN STORIES INTO VISUAL EXPERIENCES</h1>
        <p className={styles.desc}>Creative video editor specializing in cinematic storytelling, social media content, music videos and visual experiences.</p>
        <a className={styles.cta} href="#projects">VIEW MY WORK</a>
      </div>
    </section>
  )
}

export default Hero
