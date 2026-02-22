import './style.css'
import gsap from 'gsap'
// import { initLoader } from './loader.js'

// Loader disabled untuk development

// Split hero text into individual characters
function splitTextToChars() {
  const lines = document.querySelectorAll('.hero-line')

  lines.forEach(line => {
    const text = line.getAttribute('data-text')
    if (!text) return

    line.innerHTML = ''
    text.split('').forEach(char => {
      const span = document.createElement('span')
      span.className = 'hero-char'
      span.textContent = char === ' ' ? '\u00A0' : char

      // Titik terakhir pakai warna primary
      if (char === '.' && text.endsWith('.')) {
        span.classList.add('text-primary')
        span.style.marginLeft = '4px'
      }

      line.appendChild(span)
    })
  })
}

splitTextToChars()

gsap.to('#main-content', {
  opacity: 1,
  duration: 0.6,
  ease: 'power2.out',
})

// Per-character animation — arah masuk random (naik/turun/kiri/kanan/flip)
const chars = document.querySelectorAll('.hero-char')
const animations = [
  { y: 120, rotateX: 0 },     // dari bawah
  { y: -120, rotateX: 0 },    // dari atas
  { x: -80, rotateY: 0 },     // dari kiri
  { x: 80, rotateY: 0 },      // dari kanan
  { y: 60, rotateX: -90 },    // flip dari bawah
  { y: -60, rotateX: 90 },    // flip dari atas
  { x: 0, rotateY: -90 },     // flip horizontal
  { x: 0, rotateY: 90 },      // flip horizontal reverse
]

chars.forEach((char, i) => {
  const anim = animations[Math.floor(Math.random() * animations.length)]
  gsap.from(char, {
    ...anim,
    opacity: 0,
    duration: 1.4,
    delay: 0.4 + i * 0.06,
    ease: 'power3.out',
  })
})

gsap.from('.header-logo, .header-nav-link, .header-lang', {
  y: -20,
  opacity: 0,
  duration: 0.8,
  delay: 0.1,
  stagger: 0.05,
  ease: 'power2.out',
})

// Disable browser zoom (Ctrl+scroll, Ctrl+/-, pinch)
window.addEventListener('wheel', (e) => {
  if (e.ctrlKey) e.preventDefault()
}, { passive: false })

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault()
  }
})

document.addEventListener('gesturestart', (e) => e.preventDefault())
document.addEventListener('gesturechange', (e) => e.preventDefault())
document.addEventListener('gestureend', (e) => e.preventDefault())
