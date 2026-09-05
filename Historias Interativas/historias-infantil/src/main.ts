import './style/main.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { buildWorld } from './three/world'
import { pathCurve, pathFrameAt } from './three/pathCurve'
import { mountWordGame } from './games/wordGamePanel'
import { createCompanion } from './three/blocks'
import { computeScore, saveHighScoreIfBetter } from './gameState'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.2,
  effects: false,
})

const canvasHost = document.querySelector<HTMLDivElement>('#canvas-host')!
const flash = document.querySelector<HTMLDivElement>('#flash')!

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
canvasHost.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
const { scene, portalGlow } = buildWorld()

const companion = createCompanion()
scene.add(companion)
const companionOffset = new THREE.Vector3(0.9, -0.45, -1.8)
const companionTarget = new THREE.Vector3()
const leftWing = companion.getObjectByName('leftWing')!
const rightWing = companion.getObjectByName('rightWing')!

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
resize()
window.addEventListener('resize', resize)

// A câmera voa ao longo de uma curva única (pathCurve.ts) em vez de pular entre
// "shots" fixos — sem cortes bruscos entre capítulos, o caminho é contínuo.
const lastTangent = new THREE.Vector3(0, 0, -1)

function updateCameraAlongPath(progress: number) {
  const { point, tangent } = pathFrameAt(progress)
  lastTangent.copy(tangent)

  const lookPoint = pathCurve.getPointAt(THREE.MathUtils.clamp(progress + 0.03, 0, 1))

  camera.position.set(point.x, point.y + 2.6, point.z)
  camera.position.addScaledVector(tangent, -4.5)
  camera.lookAt(lookPoint.x, lookPoint.y + 0.8, lookPoint.z)
}

updateCameraAlongPath(0)

ScrollTrigger.create({
  trigger: document.body,
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0.6,
  onUpdate: (self) => updateCameraAlongPath(self.progress),
})

// Painel do jogo de palavras aparece por cima do 3D ao entrar no capítulo da floresta.
const forestSection = document.querySelector<HTMLElement>('#chapter-forest')!
const wordGamePanel = forestSection.querySelector<HTMLElement>('.game-panel')!
const wordGameContent = wordGamePanel.querySelector<HTMLElement>('.game-panel__content')!
let wordGameMounted = false

function showPanel() {
  gsap.to(wordGamePanel, { opacity: 1, pointerEvents: 'auto', duration: 0.5 })
  if (!wordGameMounted) {
    wordGameMounted = true
    mountWordGame(wordGameContent)
  }
}

function hidePanel() {
  gsap.to(wordGamePanel, { opacity: 0, pointerEvents: 'none', duration: 0.5 })
}

ScrollTrigger.create({
  trigger: forestSection,
  start: 'top center',
  end: 'bottom center',
  onEnter: showPanel,
  onEnterBack: showPanel,
  onLeave: hidePanel,
  onLeaveBack: hidePanel,
})

// Texto narrativo — cada capítulo revela sua fala palavra por palavra ao entrar em foco.
document.querySelectorAll<HTMLElement>('.chapter__story').forEach((storyEl) => {
  const split = new SplitText(storyEl, { type: 'words' })
  gsap.set(split.words, { opacity: 0, y: 14 })

  ScrollTrigger.create({
    trigger: storyEl,
    start: 'top 80%',
    onEnter: () => gsap.to(split.words, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }),
    onEnterBack: () => gsap.to(split.words, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }),
  })
})

// Portal: clicar nele adianta o final, mas a jornada também termina sozinha ao
// rolar até o fim da página — clicar não pode ser a única forma de chegar lá,
// já que a câmera agora segue uma curva e o alvo do raycast pode não estar bem
// centralizado na tela dependendo do trecho do caminho.
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let portalUnlocked = false
let portalEntered = false

ScrollTrigger.create({
  trigger: '#chapter-portal',
  start: 'top center',
  onEnter: () => (portalUnlocked = true),
  onLeaveBack: () => (portalUnlocked = false),
})

ScrollTrigger.create({
  trigger: '#chapter-portal',
  start: 'bottom bottom',
  onEnter: () => enterPortal(),
})

renderer.domElement.addEventListener('click', (event) => {
  if (!portalUnlocked) return
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  if (raycaster.intersectObject(portalGlow)[0]) enterPortal()
})

function enterPortal() {
  if (portalEntered) return
  portalEntered = true
  portalUnlocked = false
  const endTitle = document.querySelector<HTMLElement>('#portal-end')!
  const target = camera.position.clone().addScaledVector(lastTangent, 3)

  gsap
    .timeline()
    .to(camera.position, { x: target.x, y: target.y, z: target.z, duration: 0.8, ease: 'power2.in' })
    .to(flash, { opacity: 1, duration: 0.4 }, '-=0.3')
    .call(() => {
      endTitle.classList.add('is-visible')
      showFinalScore()
    })
    .to(flash, { opacity: 0, duration: 0.8, delay: 0.4 })
}

// Placar final: mostra a pontuação e deixa o jogador salvar o nome (localStorage).
function showFinalScore() {
  const score = computeScore()
  const scoreEl = document.querySelector<HTMLElement>('#portal-end-score')!
  scoreEl.textContent = String(score)

  const form = document.querySelector<HTMLFormElement>('#portal-end-form')!
  const nameInput = document.querySelector<HTMLInputElement>('#portal-end-name')!
  const resultEl = document.querySelector<HTMLElement>('#portal-end-result')!

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = nameInput.value.trim()
    if (!name) return

    const highScore = saveHighScoreIfBetter(score)
    resultEl.textContent =
      highScore === score
        ? `Parabéns, ${name}! Novo recorde: ${score} pontos! 🎉`
        : `Muito bem, ${name}! Você fez ${score} pontos (recorde: ${highScore}).`
    resultEl.hidden = false
    form.hidden = true
  })
}

const startTime = performance.now()

function animate() {
  requestAnimationFrame(animate)
  const t = (performance.now() - startTime) / 1000

  const glowMaterial = portalGlow.material as THREE.MeshBasicMaterial
  glowMaterial.opacity = 0.6 + Math.sin(t * 2) * 0.2
  portalGlow.rotation.z = Math.sin(t * 0.5) * 0.03

  // Companheiro flutuante: segue a câmera com um leve atraso, balança as asas e
  // sobe/desce suavemente — dá a sensação de estar "junto" sem exigir IA nenhuma.
  companionTarget.copy(companionOffset).applyQuaternion(camera.quaternion).add(camera.position)
  companionTarget.y += Math.sin(t * 1.6) * 0.06
  companion.position.lerp(companionTarget, 0.08)
  companion.quaternion.slerp(camera.quaternion, 0.08)
  leftWing.rotation.z = Math.sin(t * 8) * 0.5
  rightWing.rotation.z = -Math.sin(t * 8) * 0.5

  renderer.render(scene, camera)
}
animate()
