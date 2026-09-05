import gsap from 'gsap'
import type { Scene } from '../types'

interface Suspect {
  name: string
  description: string
  guilty: boolean
  rejection?: string
}

const CLUES = [
  'O ladrão tinha as mãos manchadas de tinta azul — a pintura da Sala Azul foi restaurada há poucas horas.',
  'Alguém esteve fora do salão por pelo menos 15 minutos, entre 22h50 e 23h10.',
  'Um convidado viu um vulto alto saindo da Sala Azul pouco antes da meia-noite.',
]

const SUSPECTS: Suspect[] = [
  {
    name: 'Elisa Duarte',
    description: 'Baixa estatura. Dançou a noite inteira, sem sair do salão.',
    guilty: false,
    rejection: 'A testemunha viu um vulto alto saindo da Sala Azul — não combina com Elisa.',
  },
  {
    name: 'Rogério Vaz',
    description: 'Alto. Sumiu da festa entre 22h50 e 23h05. Mãos manchadas — de vinho tinto.',
    guilty: false,
    rejection: 'A mancha nas mãos dele é de vinho, não da tinta azul fresca da pintura.',
  },
  {
    name: 'Théo Almeida',
    description: 'Alto. Saiu "para fumar" entre 22h50 e 23h15. Voltou com cheiro de tinta no paletó.',
    guilty: true,
  },
]

export class PuzzleScene implements Scene {
  private onSolved: () => void

  constructor(onSolved: () => void) {
    this.onSolved = onSolved
  }

  mount(container: HTMLElement) {
    container.innerHTML = `
      <div class="puzzle-scene">
        <h1 class="puzzle-scene__title">A Sala Azul</h1>
        <ul class="puzzle-scene__clues">
          ${CLUES.map((clue) => `<li>${clue}</li>`).join('')}
        </ul>
        <p class="puzzle-scene__prompt">Quem roubou o colar?</p>
        <div class="suspects"></div>
        <p class="puzzle-scene__feedback" aria-live="polite"></p>
      </div>
    `

    const suspectsEl = container.querySelector<HTMLElement>('.suspects')!
    const feedback = container.querySelector<HTMLElement>('.puzzle-scene__feedback')!
    const puzzleScene = container.querySelector<HTMLElement>('.puzzle-scene')!

    SUSPECTS.forEach((suspect) => {
      const card = document.createElement('button')
      card.type = 'button'
      card.className = 'suspect-card'
      card.innerHTML = `
        <span class="suspect-card__name">${suspect.name}</span>
        <span class="suspect-card__desc">${suspect.description}</span>
      `

      card.addEventListener('click', () => {
        if (suspect.guilty) {
          feedback.textContent = ''
          gsap.to(card, { borderColor: '#2ecc71', backgroundColor: 'rgba(46,204,113,0.15)', duration: 0.3 })
          suspectsEl.querySelectorAll('.suspect-card').forEach((el) => {
            if (el !== card) gsap.to(el, { opacity: 0.35, duration: 0.3 })
          })
          gsap.to(puzzleScene, {
            scale: 1.015,
            duration: 0.25,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              feedback.textContent = 'Caso encerrado — Théo confessou ao ser confrontado com a tinta.'
              gsap.delayedCall(1.8, () => this.onSolved())
            },
          })
        } else {
          feedback.textContent = suspect.rejection ?? ''
          gsap
            .timeline()
            .to(card, { x: -8, duration: 0.05 })
            .to(card, { x: 8, duration: 0.05 })
            .to(card, { x: -6, duration: 0.05 })
            .to(card, { x: 0, duration: 0.05 })
        }
      })

      suspectsEl.appendChild(card)
    })

    gsap.from(puzzleScene.children, {
      opacity: 0,
      y: 16,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    })
  }

  unmount() {}
}
