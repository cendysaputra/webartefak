// Import Tailwind CSS
import './style.css'

// Import GSAP
import gsap from 'gsap'

// Contoh animasi GSAP
gsap.from('h1', {
  duration: 1.2,
  opacity: 0,
  y: 40,
  ease: 'power3.out',
})

console.log('✅ Webartefak loaded — Vite + Tailwind CSS v4 + GSAP siap digunakan!')
