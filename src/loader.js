import gsap from 'gsap'

const MIN_DISPLAY_TIME = 3000

export function initLoader(onComplete) {
  const screen = document.getElementById('loading-screen')
  const canvas = document.getElementById('noise-canvas')
  const ctx = canvas.getContext('2d')
  const dots = document.getElementById('loading-dots')
  const percent = document.getElementById('loading-percent')
  const startTime = Date.now()

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  let noiseActive = true
  function drawNoise() {
    if (!noiseActive) return
    const imageData = ctx.createImageData(canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 18
    }
    ctx.putImageData(imageData, 0, 0)
    requestAnimationFrame(drawNoise)
  }
  drawNoise()

  const dotPatterns = ['.', '..', '...']
  const dotTimeline = gsap.timeline({ repeat: -1 })
  dotPatterns.forEach((pattern) => {
    dotTimeline.to(dots, {
      duration: 0.4,
      opacity: 0.3,
      onStart: () => { dots.textContent = pattern },
    })
    dotTimeline.to(dots, {
      duration: 0.3,
      opacity: 1,
    })
  })

  let targetPercent = 0
  const percentObj = { value: 0 }
  let dismissed = false

  function updateTarget() {
    const entries = performance.getEntriesByType('resource')
    const total = entries.length || 1
    const loaded = entries.filter(e => e.responseEnd > 0).length
    targetPercent = Math.min(Math.round((loaded / total) * 90), 90)

    if (document.readyState === 'complete') {
      targetPercent = 100
    }
  }

  function animatePercent() {
    if (percentObj.value < targetPercent) {
      gsap.to(percentObj, {
        value: targetPercent,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          percent.textContent = Math.round(percentObj.value) + '%'
        },
        onComplete: () => {
          if (percentObj.value >= 100 && !dismissed) {
            waitAndDismiss()
          }
        }
      })
    }
  }

  function waitAndDismiss() {
    dismissed = true
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed)
    setTimeout(dismissLoader, remaining)
  }

  const progressInterval = setInterval(() => {
    updateTarget()
    animatePercent()
    if (targetPercent >= 100) {
      clearInterval(progressInterval)
    }
  }, 100)

  window.addEventListener('load', () => {
    targetPercent = 100
    animatePercent()
    clearInterval(progressInterval)
  })

  function dismissLoader() {
    dotTimeline.kill()
    gsap.to(screen, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        noiseActive = false
        screen.style.display = 'none'
        window.removeEventListener('resize', resizeCanvas)
        if (onComplete) onComplete()
      }
    })
  }
}
