import '../style/lab.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { LAB_ENTRIES, type LabEntry } from './registry'

const viewport = document.querySelector<HTMLDivElement>('#lab-viewport')!
const sidebar = document.querySelector<HTMLDivElement>('#lab-sidebar-list')!
const infoBar = document.querySelector<HTMLSpanElement>('#lab-info')!
const screenshotBtn = document.querySelector<HTMLButtonElement>('#lab-screenshot')!

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
viewport.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color('#1b1d24')
scene.add(new THREE.GridHelper(10, 10, 0x3a3d4a, 0x2a2c36))
scene.add(new THREE.AxesHelper(3))
scene.add(new THREE.HemisphereLight('#ffffff', '#444444', 1.2))

const sun = new THREE.DirectionalLight('#ffffff', 0.8)
sun.position.set(4, 6, 4)
scene.add(sun)

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
camera.position.set(4, 3, 4)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1, 0)
controls.enableDamping = true

let current: THREE.Object3D | null = null
let currentId: string | null = null

function resize() {
  const w = viewport.clientWidth
  const h = viewport.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}
window.addEventListener('resize', resize)
resize()

function loadEntry(entry: LabEntry, pushHash: boolean) {
  if (entry.id === currentId) return
  currentId = entry.id

  if (current) scene.remove(current)
  current = entry.build()
  scene.add(current)

  const size = new THREE.Box3().setFromObject(current).getSize(new THREE.Vector3())
  infoBar.textContent = `${entry.label} — ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`

  sidebar.querySelectorAll<HTMLButtonElement>('.lab-sidebar__item').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.id === entry.id)
  })

  if (pushHash) location.hash = entry.id
}

function findEntry(id: string): LabEntry {
  return LAB_ENTRIES.find((entry) => entry.id === id) ?? LAB_ENTRIES[0]
}

function buildSidebar() {
  const categories = new Map<string, LabEntry[]>()
  for (const entry of LAB_ENTRIES) {
    if (!categories.has(entry.category)) categories.set(entry.category, [])
    categories.get(entry.category)!.push(entry)
  }

  sidebar.innerHTML = ''
  for (const [category, entries] of categories) {
    const heading = document.createElement('p')
    heading.className = 'lab-sidebar__category'
    heading.textContent = category
    sidebar.appendChild(heading)

    for (const entry of entries) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'lab-sidebar__item'
      button.textContent = entry.label
      button.dataset.id = entry.id
      button.addEventListener('click', () => loadEntry(entry, true))
      sidebar.appendChild(button)
    }
  }
}

buildSidebar()
loadEntry(findEntry(location.hash.replace('#', '')), false)

window.addEventListener('hashchange', () => {
  loadEntry(findEntry(location.hash.replace('#', '')), false)
})

screenshotBtn.addEventListener('click', () => {
  renderer.render(scene, camera)
  const link = document.createElement('a')
  link.download = `${currentId ?? 'screenshot'}.png`
  link.href = renderer.domElement.toDataURL('image/png')
  link.click()
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
