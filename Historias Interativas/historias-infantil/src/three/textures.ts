import * as THREE from 'three'

function clamp(v: number) {
  return Math.max(0, Math.min(255, Math.round(v)))
}

function paintNoise(ctx: CanvasRenderingContext2D, size: number, base: [number, number, number], variance: number) {
  const image = ctx.createImageData(size, size)
  for (let i = 0; i < image.data.length; i += 4) {
    const n = (Math.random() - 0.5) * variance
    image.data[i] = clamp(base[0] + n)
    image.data[i + 1] = clamp(base[1] + n)
    image.data[i + 2] = clamp(base[2] + n)
    image.data[i + 3] = 255
  }
  ctx.putImageData(image, 0, 0)
}

function paintPebbles(ctx: CanvasRenderingContext2D, size: number, count: number) {
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(65,46,32,0.55)' : 'rgba(175,168,158,0.4)'
    ctx.fillRect(x, y, 1, 1)
  }
}

function makeTexture(size: number, paint: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  paint(canvas.getContext('2d')!)

  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const SIZE = 16

export const TEXTURES = {
  grassTop: makeTexture(SIZE, (ctx) => {
    paintNoise(ctx, SIZE, [98, 176, 78], 26)
    // darker clumps so the top doesn't read as flat noise
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * SIZE)
      const y = Math.floor(Math.random() * SIZE)
      const w = 1 + Math.floor(Math.random() * 2)
      ctx.fillStyle = `rgba(44, 96, 46, ${0.25 + Math.random() * 0.25})`
      ctx.fillRect(x, y, w, w)
    }
  }),

  dirt: makeTexture(SIZE, (ctx) => {
    paintNoise(ctx, SIZE, [122, 88, 58], 22)
    paintPebbles(ctx, SIZE, 12)
  }),

  grassSide: makeTexture(SIZE, (ctx) => {
    paintNoise(ctx, SIZE, [122, 88, 58], 20)
    paintPebbles(ctx, SIZE, 8)

    // jagged grass fringe: each column gets its own random overhang height,
    // instead of one flat strip, so the edge reads as torn/organic
    for (let x = 0; x < SIZE; x++) {
      const h = 4 + Math.floor(Math.random() * 3)
      const image = ctx.createImageData(1, h)
      for (let i = 0; i < image.data.length; i += 4) {
        const n = (Math.random() - 0.5) * 30
        image.data[i] = clamp(98 + n)
        image.data[i + 1] = clamp(176 + n)
        image.data[i + 2] = clamp(78 + n)
        image.data[i + 3] = 255
      }
      ctx.putImageData(image, x, 0)
    }
  }),

  wood: makeTexture(SIZE, (ctx) => {
    paintNoise(ctx, SIZE, [117, 84, 56], 14)
    ctx.strokeStyle = 'rgba(70,45,25,0.5)'
    for (let x = 2; x < SIZE; x += 4) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, SIZE)
      ctx.stroke()
    }
  }),

  leaves: makeTexture(SIZE, (ctx) => paintNoise(ctx, SIZE, [64, 132, 62], 40)),

  stone: makeTexture(SIZE, (ctx) => paintNoise(ctx, SIZE, [150, 150, 160], 25)),

  plank: makeTexture(SIZE, (ctx) => {
    paintNoise(ctx, SIZE, [196, 154, 100], 12)
    ctx.strokeStyle = 'rgba(120,90,55,0.6)'
    ctx.beginPath()
    ctx.moveTo(0, SIZE / 2)
    ctx.lineTo(SIZE, SIZE / 2)
    ctx.stroke()
  }),
}

export function tiled(texture: THREE.Texture, repeatX: number, repeatY: number): THREE.Texture {
  const clone = texture.clone()
  clone.needsUpdate = true
  clone.wrapS = THREE.RepeatWrapping
  clone.wrapT = THREE.RepeatWrapping
  clone.repeat.set(repeatX, repeatY)
  return clone
}
