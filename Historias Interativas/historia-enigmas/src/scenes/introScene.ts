import gsap from 'gsap'
import type { Scene } from '../types'
import { ParallaxRoom } from '../three/parallaxRoom'

export class IntroScene implements Scene {
  private onInvestigate: () => void
  private room: ParallaxRoom | null = null

  constructor(onInvestigate: () => void) {
    this.onInvestigate = onInvestigate
  }

  mount(container: HTMLElement) {
    container.innerHTML = `
      <div class="intro-scene">
        <div class="intro-scene__canvas"></div>
        <div class="intro-scene__overlay">
          <p class="intro-scene__eyebrow">Caso nº 1</p>
          <h1 class="intro-scene__title">O Colar da Duquesa</h1>
          <p class="intro-scene__subtitle">Um crime, três suspeitos, uma noite de baile.</p>
          <button class="intro-scene__button" type="button">Investigar</button>
        </div>
      </div>
    `

    const canvasHost = container.querySelector<HTMLElement>('.intro-scene__canvas')!
    this.room = new ParallaxRoom(canvasHost)
    this.room.playIntro()

    const overlay = container.querySelector('.intro-scene__overlay')!
    const button = container.querySelector<HTMLButtonElement>('.intro-scene__button')!

    gsap.from(overlay.children, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.4,
      stagger: 0.15,
      ease: 'power2.out',
    })

    button.addEventListener('click', () => this.onInvestigate())
  }

  unmount() {
    this.room?.dispose()
    this.room = null
  }
}
