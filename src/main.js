import './style.css'
import gsap from 'gsap'
// import { initLoader } from './loader.js'

// Loader disabled untuk development
// initLoader(() => { ... })

gsap.to('#main-content', {
  opacity: 1,
  duration: 0.6,
  ease: 'power2.out',
})

gsap.from('.hero-title', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: 'power3.out',
})

gsap.from('.header-logo, .header-nav-link, .header-lang', {
  y: -20,
  opacity: 0,
  duration: 0.8,
  delay: 0.1,
  stagger: 0.05,
  ease: 'power2.out',
})
