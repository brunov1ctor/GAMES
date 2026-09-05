import * as THREE from 'three'
import { createBlockField, createTree, createHouse, createPortal, type BlockColumn } from './blocks'
import { pathFrameAt, CHAPTER_U } from './pathCurve'

export interface World {
  scene: THREE.Scene
  portalGlow: THREE.Mesh
}

const PATH_HALF_WIDTH = 2
const SAMPLE_COUNT = 400

/** Walks the path curve and snaps a wide strip around it to the block grid. */
function buildPathColumns(): BlockColumn[] {
  const cells = new Map<string, BlockColumn>()

  for (let i = 0; i <= SAMPLE_COUNT; i += 1) {
    const u = i / SAMPLE_COUNT
    const { point, right } = pathFrameAt(u)
    const y = Math.round(point.y)

    for (let w = -PATH_HALF_WIDTH; w <= PATH_HALF_WIDTH; w += 1) {
      const cellPoint = point.clone().addScaledVector(right, w)
      const x = Math.round(cellPoint.x)
      const z = Math.round(cellPoint.z)
      const key = `${x}:${z}`
      if (!cells.has(key)) cells.set(key, { x, z, y })
    }
  }

  return Array.from(cells.values())
}

export function buildWorld(): World {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#bfe6ff')
  scene.fog = new THREE.Fog('#bfe6ff', 16, 40)

  scene.add(new THREE.HemisphereLight('#ffffff', '#6b8f4e', 1.1))
  const sun = new THREE.DirectionalLight('#fff3d0', 1.2)
  sun.position.set(6, 10, 4)
  scene.add(sun)

  scene.add(createBlockField(buildPathColumns(), 2))

  // Capítulo 1 — Floresta das Letras
  const forestFrame = pathFrameAt(CHAPTER_U.forest)
  const forestGroundY = Math.round(forestFrame.point.y)

  const tree1 = createTree()
  tree1.position.copy(forestFrame.point).addScaledVector(forestFrame.right, -2.4)
  tree1.position.y = forestGroundY + 0.5
  scene.add(tree1)

  const tree2 = createTree()
  tree2.position.copy(forestFrame.point).addScaledVector(forestFrame.right, 2.8)
  tree2.position.y = forestGroundY + 0.5
  tree2.scale.setScalar(0.8)
  scene.add(tree2)

  // Capítulo 2 — Vila dos Números
  const villageFrame = pathFrameAt(CHAPTER_U.village)
  const house = createHouse()
  house.position.copy(villageFrame.point).addScaledVector(villageFrame.right, 2.6)
  house.position.y = Math.round(villageFrame.point.y) + 0.5
  scene.add(house)

  // Capítulo 3 — Portal Mágico
  const portalFrame = pathFrameAt(CHAPTER_U.portal)
  const portal = createPortal()
  portal.position.copy(portalFrame.point)
  portal.position.y = Math.round(portalFrame.point.y)
  portal.rotation.y = Math.atan2(portalFrame.tangent.x, portalFrame.tangent.z)
  scene.add(portal)
  const portalGlow = portal.getObjectByName('portalGlow') as THREE.Mesh

  return { scene, portalGlow }
}
