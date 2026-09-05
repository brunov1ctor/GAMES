import gsap from 'gsap'
import { makeDraggableTile, type DropSlot } from './dragDrop'
import { gameState } from '../gameState'

const WORD = 'GATO'
const EMOJI = '🐱'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function mountWordGame(container: HTMLElement) {
  if (container.dataset.mounted === 'true') return
  container.dataset.mounted = 'true'

  container.innerHTML = `
    <div class="word-game__emoji">${EMOJI}</div>
    <h2 class="word-game__title">Monte a palavra</h2>
    <div class="slots"></div>
    <div class="tray"></div>
  `

  const slotsRow = container.querySelector<HTMLElement>('.slots')!
  const tray = container.querySelector<HTMLElement>('.tray')!

  const slots: DropSlot[] = WORD.split('').map((letter) => {
    const slotEl = document.createElement('div')
    slotEl.className = 'slot'
    slotsRow.appendChild(slotEl)
    return { el: slotEl, accepts: letter }
  })

  let filled = 0

  shuffle(WORD.split('')).forEach((letter) => {
    const tile = document.createElement('div')
    tile.className = 'tile'
    tile.textContent = letter
    tile.dataset.letter = letter
    tray.appendChild(tile)

    makeDraggableTile(
      tile,
      slots,
      (draggedTile, slot) => {
        slot.el.textContent = letter
        draggedTile.remove()
        gsap.fromTo(slot.el, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' })

        filled += 1
        if (filled === WORD.length) {
          gameState.wordGameCompleted = true
          gsap.to(container, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1 })
        }
      },
      () => {
        gameState.wordGameMistakes += 1
      },
    )
  })

  gsap.from(container.querySelectorAll('.tile'), {
    y: 30,
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: 'back.out(2)',
  })
}
