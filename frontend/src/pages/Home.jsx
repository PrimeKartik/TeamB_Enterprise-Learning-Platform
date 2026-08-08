import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/New folder/Hero'
import Features from '../components/New folder/Features'
import Courses from '../components/New folder/Courses'
import Stats from '../components/New folder/Stats'
import About from '../components/New folder/About'
import Testimonials from '../components/New folder/Testimonials'
import FAQ from '../components/New folder/FAQ'
import Newsletter from '../components/New folder/Newsletter'

export default function Home() {
  const { hash } = useLocation()

  // Supports links like /#about or /#features working correctly
  // even when navigated to from a different page.
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Courses />
      <Stats />
      <FAQ />
      <Newsletter />
    </>
  )
}
