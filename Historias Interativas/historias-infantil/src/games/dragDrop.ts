import gsap from 'gsap'

export interface DropSlot {
  el: HTMLElement
  accepts: string
}

export function makeDraggableTile(
  tile: HTMLElement,
  slots: DropSlot[],
  onCorrect: (tile: HTMLElement, slot: DropSlot) => void,
  onWrong?: () => void,
) {
  let startX = 0
  let startY = 0
  let offsetX = 0
  let offsetY = 0
  let dragging = false
  let locked = false

  const onPointerDown = (e: PointerEvent) => {
    if (locked) return
    dragging = true
    tile.setPointerCapture(e.pointerId)
    startX = e.clientX - offsetX
    startY = e.clientY - offsetY
    tile.style.zIndex = '1000'
    gsap.to(tile, { scale: 1.15, duration: 0.15 })
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return
    offsetX = e.clientX - startX
    offsetY = e.clientY - startY
    gsap.set(tile, { x: offsetX, y: offsetY })
  }

  const onPointerUp = () => {
    if (!dragging) return
    dragging = false
    tile.style.zIndex = ''

    const tileRect = tile.getBoundingClientRect()
    const cx = tileRect.left + tileRect.width / 2
    const cy = tileRect.top + tileRect.height / 2

    const targetSlot = slots.find((slot) => {
      const r = slot.el.getBoundingClientRect()
      return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
    })

    if (targetSlot && targetSlot.el.dataset.filled !== 'true' && targetSlot.accepts === tile.dataset.letter) {
      const slotRect = targetSlot.el.getBoundingClientRect()
      const finalX = offsetX + (slotRect.left + slotRect.width / 2 - cx)
      const finalY = offsetY + (slotRect.top + slotRect.height / 2 - cy)

      locked = true
      gsap.to(tile, {
        x: finalX,
        y: finalY,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(2)',
        onComplete: () => {
          targetSlot.el.dataset.filled = 'true'
          onCorrect(tile, targetSlot)
        },
      })
      return
    }

    if (targetSlot) {
      onWrong?.()
      gsap
        .timeline()
        .to(tile, { x: offsetX + 10, scale: 1, duration: 0.05 })
        .to(tile, { x: offsetX - 10, duration: 0.05 })
        .to(tile, { x: offsetX + 6, duration: 0.05 })
        .to(tile, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to(tile, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' })
    }
    offsetX = 0
    offsetY = 0
  }

  tile.style.touchAction = 'none'
  tile.addEventListener('pointerdown', onPointerDown)
  tile.addEventListener('pointermove', onPointerMove)
  tile.addEventListener('pointerup', onPointerUp)
  tile.addEventListener('pointercancel', onPointerUp)
}
