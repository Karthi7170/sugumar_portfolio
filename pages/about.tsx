import Head from 'next/head'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>SUGUMAR | About</title>
        <meta name="description" content="About SUGUMAR — video editor portfolio" />
      </Head>
      <div className="page-wrapper" style={{ position: 'relative', minHeight: '100vh', background: '#08090a', color: '#fff' }}>
        <Navbar />
        <main>
          <About />
        </main>
      </div>
      <Footer />
    </>
  )
}
