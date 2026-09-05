import * as THREE from 'three'

/**
 * The single spine every chapter's set-dressing and the camera follow — replaces
 * the old per-chapter "shot" waypoints (discrete camera jumps between disconnected
 * islands) with one continuous, winding curve, so scrolling reads as one connected
 * journey instead of teleporting between floating islands.
 */
export const PATH_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0.3, 6),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-4, -0.4, -9),
  new THREE.Vector3(3, -0.9, -17),
  new THREE.Vector3(5, -1.3, -25),
  new THREE.Vector3(1, -1.8, -32),
  new THREE.Vector3(0, -2, -37),
]

export const pathCurve = new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.5)

// Approximate scroll-progress (0..1) where each chapter's set-dressing sits along
// the curve. Tuned by feel against index.html's section heights (hero 100vh, each
// chapter 150vh) rather than derived mathematically — nudge these if a prop drifts
// off-path after editing the curve or the page layout.
export const CHAPTER_U = {
  forest: 0.16,
  village: 0.5,
  portal: 0.86,
}

export interface PathFrame {
  point: THREE.Vector3
  tangent: THREE.Vector3
  right: THREE.Vector3
}

/** Position + direction + sideways vector at progress `u` (0..1) along the path. */
export function pathFrameAt(u: number): PathFrame {
  const clamped = THREE.MathUtils.clamp(u, 0, 1)
  const point = pathCurve.getPointAt(clamped)
  const tangent = pathCurve.getTangentAt(clamped).normalize()
  const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize()
  return { point, tangent, right }
}
