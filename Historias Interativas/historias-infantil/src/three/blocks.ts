import * as THREE from 'three'
import { TEXTURES, tiled } from './textures'

function boxMaterials(top: THREE.Texture, side: THREE.Texture, bottom: THREE.Texture, repeat: number) {
  const sideMat = new THREE.MeshStandardMaterial({ map: tiled(side, repeat, repeat) })
  const topMat = new THREE.MeshStandardMaterial({ map: tiled(top, repeat, repeat) })
  const bottomMat = new THREE.MeshStandardMaterial({ map: tiled(bottom, repeat, repeat) })
  return [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat]
}

function grassBlockMaterials(repeat: number) {
  return boxMaterials(TEXTURES.grassTop, TEXTURES.grassSide, TEXTURES.dirt, repeat)
}

/** Places a unit cube at each position, in one InstancedMesh draw call. */
function createBlockCluster(positions: [number, number, number][], material: THREE.Material | THREE.Material[]): THREE.InstancedMesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const mesh = new THREE.InstancedMesh(geometry, material, positions.length)
  const matrix = new THREE.Matrix4()
  positions.forEach(([x, y, z], index) => {
    matrix.setPosition(x, y, z)
    mesh.setMatrixAt(index, matrix)
  })
  mesh.instanceMatrix.needsUpdate = true
  return mesh
}

/** A single grass block — one tile per face, matching the classic reference icon. */
export function createGrassBlock(size = 1): THREE.Mesh {
  return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), grassBlockMaterials(1))
}

/** A single dirt block — plain dirt texture on all six faces. */
export function createDirtBlock(size = 1): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.dirt, 1, 1) })
  return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material)
}

/** A single log block — the same wood-grain texture used by createTree()'s trunk. */
export function createLogBlock(size = 1): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.wood, 1, 1) })
  return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material)
}

/** A single stone block — the same texture used by createPortal()'s frame. */
export function createStoneBlock(size = 1): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.stone, 1, 1) })
  return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material)
}

export interface BlockColumn {
  x: number
  z: number
  /** Height of the grass layer at this column; dirt stacks below it. Default 0. */
  y?: number
}

/**
 * Shared voxel-terrain builder: one grass block (with `dirtLayers` dirt blocks
 * beneath) per given (x, z) column, each at its own height — same layering as
 * Minecraft terrain. Built with InstancedMesh so any number of columns costs two
 * draw calls total, not one mesh per block. `createIsland()` (a rectangle) and the
 * winding world path (an arbitrary column list) both go through this.
 */
export function createBlockField(columns: BlockColumn[], dirtLayers = 1): THREE.Group {
  const group = new THREE.Group()
  const unitGeometry = new THREE.BoxGeometry(1, 1, 1)
  const matrix = new THREE.Matrix4()

  const grassMesh = new THREE.InstancedMesh(unitGeometry, grassBlockMaterials(1), columns.length)
  columns.forEach((column, index) => {
    matrix.setPosition(column.x, column.y ?? 0, column.z)
    grassMesh.setMatrixAt(index, matrix)
  })
  grassMesh.instanceMatrix.needsUpdate = true
  group.add(grassMesh)

  if (dirtLayers > 0) {
    const dirtMaterial = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.dirt, 1, 1) })
    const dirtMesh = new THREE.InstancedMesh(unitGeometry, dirtMaterial, columns.length * dirtLayers)
    let index = 0
    for (let layer = 1; layer <= dirtLayers; layer += 1) {
      for (const column of columns) {
        matrix.setPosition(column.x, (column.y ?? 0) - layer, column.z)
        dirtMesh.setMatrixAt(index, matrix)
        index += 1
      }
    }
    dirtMesh.instanceMatrix.needsUpdate = true
    group.add(dirtMesh)
  }

  return group
}

/** A rectangular voxel island — grass on top, `dirtLayers` of dirt underneath. */
export function createIsland(width: number, depth: number, dirtLayers = 1): THREE.Group {
  const halfWidth = (width - 1) / 2
  const halfDepth = (depth - 1) / 2
  const columns: BlockColumn[] = []
  for (let x = 0; x < width; x += 1) {
    for (let z = 0; z < depth; z += 1) {
      columns.push({ x: x - halfWidth, z: z - halfDepth })
    }
  }
  return createBlockField(columns, dirtLayers)
}

/** A tree built from real 1x1x1 log and leaf blocks, like a Minecraft oak. */
export function createTree(): THREE.Group {
  const group = new THREE.Group()

  const logMaterial = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.wood, 1, 1) })
  const trunkPositions: [number, number, number][] = [
    [0, 0.5, 0],
    [0, 1.5, 0],
    [0, 2.5, 0],
  ]
  group.add(createBlockCluster(trunkPositions, logMaterial))

  const leafMaterial = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.leaves, 1, 1) })
  const leafPositions: [number, number, number][] = []
  for (const y of [2.5, 3.5]) {
    for (let x = -1; x <= 1; x += 1) {
      for (let z = -1; z <= 1; z += 1) {
        if (x === 0 && z === 0 && y === 2.5) continue // the top log pokes through this layer
        if (y === 3.5 && Math.abs(x) === 1 && Math.abs(z) === 1) continue // clip corners for a rounder cap
        leafPositions.push([x, y, z])
      }
    }
  }
  leafPositions.push([0, 4.5, 0])
  group.add(createBlockCluster(leafPositions, leafMaterial))

  return group
}

export function createHouse(): THREE.Group {
  const group = new THREE.Group()

  const wallMat = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.plank, 2, 2) })
  const walls = new THREE.Mesh(new THREE.BoxGeometry(2, 1.6, 2), wallMat)
  walls.position.y = 0.8
  group.add(walls)

  const roofMat = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.stone, 2, 2) })
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1, 4), roofMat)
  roof.position.y = 2
  roof.rotation.y = Math.PI / 4
  group.add(roof)

  return group
}

function createFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#ffb84d'
  ctx.fillRect(0, 0, 64, 64)

  ctx.fillStyle = '#2a2113'
  ctx.beginPath()
  ctx.arc(22, 26, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(42, 26, 5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(24, 24, 1.6, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(44, 24, 1.6, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ff6f3c'
  ctx.beginPath()
  ctx.moveTo(26, 38)
  ctx.lineTo(38, 38)
  ctx.lineTo(32, 47)
  ctx.closePath()
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/**
 * The player's floating companion — a friendly voxel bird that hovers near the
 * camera through every chapter. Wings are named so the caller can animate a
 * simple flap (rotate leftWing/rightWing) each frame.
 */
export function createCompanion(): THREE.Group {
  const group = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({ color: '#ffb84d' })
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), bodyMat)
  body.scale.set(1, 0.9, 1)
  group.add(body)

  const faceMat = new THREE.MeshStandardMaterial({ map: createFaceTexture(), transparent: false })
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), faceMat)
  face.position.set(0, 0.02, 0.3)
  group.add(face)

  const wingMat = new THREE.MeshStandardMaterial({ color: '#ff9a3c', side: THREE.DoubleSide })
  const wingGeometry = new THREE.PlaneGeometry(0.22, 0.34)

  const leftWing = new THREE.Mesh(wingGeometry, wingMat)
  leftWing.position.set(-0.34, 0, 0)
  leftWing.rotation.y = Math.PI / 2.4
  leftWing.name = 'leftWing'
  group.add(leftWing)

  const rightWing = new THREE.Mesh(wingGeometry, wingMat)
  rightWing.position.set(0.34, 0, 0)
  rightWing.rotation.y = -Math.PI / 2.4
  rightWing.name = 'rightWing'
  group.add(rightWing)

  group.name = 'companion'
  return group
}

/** A portal frame built from real stone blocks — 4 wide x 5 tall, hollow center, like a nether portal. */
export function createPortal(): THREE.Group {
  const group = new THREE.Group()

  const frameMaterial = new THREE.MeshStandardMaterial({ map: tiled(TEXTURES.stone, 1, 1) })
  const columns = [-1.5, -0.5, 0.5, 1.5]
  const rows = [0.5, 1.5, 2.5, 3.5, 4.5]
  const framePositions: [number, number, number][] = []
  columns.forEach((x, columnIndex) => {
    rows.forEach((y, rowIndex) => {
      const isBorder = rowIndex === 0 || rowIndex === rows.length - 1 || columnIndex === 0 || columnIndex === columns.length - 1
      if (isBorder) framePositions.push([x, y, 0])
    })
  })
  group.add(createBlockCluster(framePositions, frameMaterial))

  const glowMat = new THREE.MeshBasicMaterial({ color: 0x8a3ffb, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), glowMat)
  glow.position.set(0, 2.5, 0.01)
  glow.name = 'portalGlow'
  group.add(glow)

  return group
}
