import * as THREE from 'three'
import gsap from 'gsap'

interface Layer {
  z: number
  parallaxFactor: number
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
}

const LAYERS: Layer[] = [
  {
    z: -12,
    parallaxFactor: 0.2,
    draw: (ctx, w, h) => {
      const sky = ctx.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, '#0b1026')
      sky.addColorStop(1, '#1b2550')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = '#f4e9c1'
      ctx.beginPath()
      ctx.arc(w * 0.75, h * 0.25, w * 0.05, 0, Math.PI * 2)
      ctx.fill()
    },
  },
  {
    z: -7,
    parallaxFactor: 0.45,
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#05060f'
      for (let i = 0; i < 6; i++) {
        const bw = w * (0.08 + Math.random() * 0.06)
        const bx = (i / 6) * w + Math.random() * 20
        const bh = h * (0.3 + Math.random() * 0.35)
        ctx.fillRect(bx, h - bh, bw, bh)
      }
    },
  },
  {
    z: -3,
    parallaxFactor: 0.75,
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#241a12'
      ctx.fillRect(w * 0.2, h * 0.72, w * 0.6, h * 0.1)
      ctx.fillStyle = '#d8c9a3'
      ctx.fillRect(w * 0.42, h * 0.68, w * 0.16, h * 0.1)
      ctx.strokeStyle = '#8a1f1f'
      ctx.lineWidth = 2
      ctx.strokeRect(w * 0.42, h * 0.68, w * 0.16, h * 0.1)
    },
  },
  {
    z: 1.5,
    parallaxFactor: 1.15,
    draw: (ctx, w, h) => {
      ctx.fillStyle = 'rgba(2,2,8,0.9)'
      ctx.fillRect(0, 0, w, h * 0.08)
      ctx.fillRect(0, 0, w * 0.06, h)
      ctx.fillRect(w * 0.94, 0, w * 0.06, h)
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - 4, y + 18)
        ctx.stroke()
      }
    },
  },
]

/**
 * Layered 2.5D "parallax room": each canvas-drawn layer sits at its own Z
 * depth and shifts by its own factor on pointer move, faking real depth
 * without modeling geometry — the same idea as an image + depth-map
 * parallax shader, done with flat planes instead.
 */
export class ParallaxRoom {
  readonly dom: HTMLCanvasElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private planes: { mesh: THREE.Mesh; factor: number }[] = []
  private pointer = { x: 0, y: 0 }
  private target = { x: 0, y: 0 }
  private frameId = 0
  private baseCameraZ = 6
  private container: HTMLElement
  private onResize = () => this.resize()
  private onPointerMove = (e: PointerEvent) => {
    this.target.x = (e.clientX / window.innerWidth - 0.5) * 2
    this.target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }

  constructor(container: HTMLElement) {
    this.container = container
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.dom = this.renderer.domElement
    container.appendChild(this.dom)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
    this.camera.position.z = this.baseCameraZ

    this.resize()
    this.buildLayers()

    window.addEventListener('resize', this.onResize)
    window.addEventListener('pointermove', this.onPointerMove)

    this.animate()
  }

  private buildLayers() {
    const vFov = (this.camera.fov * Math.PI) / 180

    for (const layer of LAYERS) {
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 640
      const ctx = canvas.getContext('2d')!
      layer.draw(ctx, canvas.width, canvas.height)

      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace

      const distance = this.baseCameraZ - layer.z
      const height = 2 * Math.tan(vFov / 2) * distance * 1.2
      const width = height * (canvas.width / canvas.height)

      const geometry = new THREE.PlaneGeometry(width, height)
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.z = layer.z
      this.scene.add(mesh)
      this.planes.push({ mesh, factor: layer.parallaxFactor })
    }
  }

  private resize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  playIntro() {
    return gsap.fromTo(this.camera.position, { z: this.baseCameraZ + 4 }, { z: this.baseCameraZ, duration: 1.8, ease: 'power2.out' })
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate)

    this.pointer.x += (this.target.x - this.pointer.x) * 0.05
    this.pointer.y += (this.target.y - this.pointer.y) * 0.05

    for (const { mesh, factor } of this.planes) {
      mesh.position.x = this.pointer.x * factor * 0.6
      mesh.position.y = -this.pointer.y * factor * 0.4
    }

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    cancelAnimationFrame(this.frameId)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('pointermove', this.onPointerMove)
    this.renderer.dispose()
    this.dom.remove()
  }
}
