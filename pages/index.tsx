import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sugumar — Video Editor & Cinematic Storyteller</title>
        <meta name="description" content="Explore Sugumar’s cinematic edits, music videos and social content. Thoughtful pacing, expressive color and stories made to be felt." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <a className="skip-link" href="#projects">Skip to selected work</a>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
