import gsap from 'gsap'
import type { Scene } from './types'

export class SceneManager {
  private container: HTMLElement
  private current: Scene | null = null

  constructor(container: HTMLElement) {
    this.container = container
  }

  async goTo(scene: Scene) {
    const outgoing = this.container.firstElementChild as HTMLElement | null

    if (outgoing) {
      await gsap.to(outgoing, { opacity: 0, duration: 0.5, ease: 'power1.in' })
      this.current?.unmount()
      this.container.innerHTML = ''
    }

    const sceneEl = document.createElement('div')
    sceneEl.className = 'scene'
    this.container.appendChild(sceneEl)

    this.current = scene
    await scene.mount(sceneEl)

    gsap.fromTo(sceneEl, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' })
  }
}
