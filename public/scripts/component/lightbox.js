export function initLightbox() {
  const mediaCards = Array.from(document.querySelectorAll('.card[data-type="image"], .card[data-type="video"]'))
  let currentIndex = null
  let instance = null

  mediaCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index
      const type = card.dataset.type
      const url = card.dataset.url
      openMedia(type, url)
    })
  })

  function openMedia(type, url) {
    if (instance && instance.visible()) {
      instance.close()
    }

    let html = ''
    if (type === 'image') {
      html = `<div class="zoom-container"><img src="${url}" class="zoomable" /></div>`
    } else if (type === 'video') {
      html = `<video src="${url}" controls autoplay style="max-width:90vw; max-height:90vh;"></video>`
    }

    instance = basicLightbox.create(html, {
      onShow: (instance) => {
        if (type === 'image') {
          const img = instance.element().querySelector('.zoomable')
          setupClickZoom(img)
        }
      }
    })

    instance.show()
  }

  function setupClickZoom(img) {
    let scale = 1
    let originX = 0
    let originY = 0
    let isZoomed = false
    let isDragging = false
    let dragMoved = false
    let startX = 0
    let startY = 0
    const threshold = 5
  
    const container = img.parentElement
    container.style.cursor = 'zoom-in'
    img.setAttribute('draggable', 'false')
    img.ondragstart = () => false
  
    function updateTransform() {
      img.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`
    }
  
    container.addEventListener('mousedown', (e) => {
      if (!isZoomed || e.button !== 0) return
      isDragging = true
      dragMoved = false
      startX = e.clientX
      startY = e.clientY
      container.style.cursor = 'grabbing'
    })
  
    container.addEventListener('mousemove', (e) => {
      if (!isZoomed || !isDragging) return
  
      const dx = e.clientX - startX
      const dy = e.clientY - startY
  
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        dragMoved = true
      }
  
      if (dragMoved) {
        originX += dx / scale
        originY += dy / scale
        startX = e.clientX
        startY = e.clientY
        updateTransform()
      }
    })
  
    container.addEventListener('mouseup', (e) => {
      if (!isZoomed || e.button !== 0) return
      isDragging = false
      container.style.cursor = isZoomed ? 'grab' : 'zoom-in'
    })
  
    container.addEventListener('mouseleave', () => {
      isDragging = false
      if (isZoomed) {
        container.style.cursor = 'grab'
      }
    })
  
    img.addEventListener('click', (e) => {
      if (dragMoved) {
        e.stopPropagation()
        return
      }
  
      if (!isZoomed) {
        scale = 2
        originX = 0
        originY = 0
        isZoomed = true
        container.style.cursor = 'grab'
        img.style.cursor = 'zoom-out'
        container.style.overflow = 'visible'
      } else {
        scale = 1
        originX = 0
        originY = 0
        isZoomed = false
        container.style.cursor = 'zoom-in'
        img.style.cursor = 'zoom-in'
        container.style.overflow = 'hidden'
      }
  
      updateTransform()
    })
  }  

  document.addEventListener('keydown', (e) => {
    if (!instance || !instance.visible()) return

    if (e.key === 'Escape') {
      instance.close()
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1)
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1)
    }
  })

  function navigateLightbox(direction) {
    const newIndex = currentIndex + direction
    if (newIndex < 0 || newIndex >= mediaCards.length) return

    const nextCard = mediaCards[newIndex]
    const type = nextCard.dataset.type
    const url = nextCard.dataset.url
    currentIndex = newIndex
    openMedia(type, url)
  }
}
