import * as THREE from 'three'
import { createIsland, createDirtBlock, createLogBlock, createStoneBlock, createTree, createHouse, createPortal } from '../three/blocks'
import { createGrassBlockModel } from '../three/createGrassBlockModel'

export interface LabEntry {
  id: string
  label: string
  category: string
  build: () => THREE.Object3D
}

/**
 * One entry per object exported from three/blocks.ts. Add a new block there,
 * register it here, and it shows up in the lab sidebar automatically.
 */
export const LAB_ENTRIES: LabEntry[] = [
  { id: 'grass-block', label: 'Bloco de grama', category: 'Blocos', build: () => createGrassBlockModel() },
  { id: 'dirt-block', label: 'Bloco de terra', category: 'Blocos', build: () => createDirtBlock() },
  { id: 'log-block', label: 'Bloco de madeira', category: 'Blocos', build: () => createLogBlock() },
  { id: 'stone-block', label: 'Bloco de pedra', category: 'Blocos', build: () => createStoneBlock() },
  { id: 'island', label: 'Ilha (grade de blocos)', category: 'Cenário', build: () => createIsland(4, 4, 1) },
  { id: 'tree', label: 'Árvore', category: 'Cenário', build: () => createTree() },
  { id: 'house', label: 'Casa', category: 'Cenário', build: () => createHouse() },
  { id: 'portal', label: 'Portal mágico', category: 'Cenário', build: () => createPortal() },
]
