import './style.css'
import * as THREE from 'three'
import { furnish } from './workstation.js'
import { drawName } from './pixel-name.js'

drawName(document.querySelector('h1'))
document.querySelector('#current-year').textContent = new Date().getFullYear()
const nav = document.querySelector('.site-nav')
const toggle = document.querySelector('.menu-toggle')
function setMenu(open) {
  nav.classList.toggle('open', open)
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기')
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.addEventListener('click', () => setMenu(false))
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus() }
})
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    entry.target.classList.add('is-visible')
    observer.unobserve(entry.target)
  }
})
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
const activeSection = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    for (const link of nav.querySelectorAll('a')) {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location')
      else link.removeAttribute('aria-current')
    }
  }
}, {rootMargin:'0px 0px -65% 0px'})
document.querySelectorAll('main section').forEach(el => activeSection.observe(el))
const host = document.querySelector('#voxel-canvas')
const motionReduced = matchMedia('(prefers-reduced-motion: reduce)')
if (matchMedia('(pointer: coarse)').matches) document.querySelector('#input-hint').textContent = 'TOUCH TO INTERACT'
try { setupVoxelCharacter(host) } catch (error) {
  console.warn('3D rendering unavailable',error)
  host.innerHTML = '<div class="fallback"><div class="monitor"><b>&gt;_</b><i></i><i></i><i></i></div><p>3D 작업실은 WebGL 지원 브라우저에서 열립니다.</p></div>'
  document.querySelector('#input-hint').textContent = 'STATIC PREVIEW'
}

function setupVoxelCharacter(host) {
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-5,5,4,-4,.1,100)
  camera.position.set(5.8, 4.0, 10)
  camera.lookAt(0,-.52,0)

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
  // Low resolution + pixelated canvas gives the intentional retro 3D look.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12
  host.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0x93b3db, 2.2))
  const key = new THREE.DirectionalLight(0xffd8be, 4.2)
  key.position.set(-3, 6, 6)
  scene.add(key)
  const pink = new THREE.PointLight(0xff68e4, 55, 14)
  pink.position.set(3.6, 2.0, -0.8)
  scene.add(pink)
  const mint = new THREE.PointLight(0x4affdc, 35, 12)
  mint.position.set(-3.8, -1.7, 2)
  scene.add(mint)

  const mats = {
    skin: new THREE.MeshStandardMaterial({ color: '#e2a27c', roughness: 1, flatShading: true }),
    skinShadow: new THREE.MeshStandardMaterial({ color: '#b7775f', roughness: 1, flatShading: true }),
    hair: new THREE.MeshStandardMaterial({ color: '#161521', roughness: 1, flatShading: true }),
    hoodie: new THREE.MeshStandardMaterial({ color: '#242f4e', roughness: 1, flatShading: true }),
    hoodieLight: new THREE.MeshStandardMaterial({ color: '#354977', roughness: 1, flatShading: true }),
    hoodDark: new THREE.MeshStandardMaterial({ color: '#151b30', roughness: 1, flatShading: true }),
    cap: new THREE.MeshStandardMaterial({ color: '#9880eb', roughness: 1, flatShading: true }),
    capBrim: new THREE.MeshStandardMaterial({ color: '#504a92', roughness: 1, flatShading: true }),
    pale: new THREE.MeshStandardMaterial({ color: '#e7def1', roughness: 1, flatShading: true }),
    mouth: new THREE.MeshStandardMaterial({ color: '#5a3547', roughness: 1, flatShading: true }),
    eyes: new THREE.MeshStandardMaterial({ color: '#0a1930', roughness: 1, flatShading: true }),
    teal: new THREE.MeshStandardMaterial({ color: '#74ffd6', emissive: '#28a886', emissiveIntensity: 0.5, roughness: 1, flatShading: true }),
    purple: new THREE.MeshStandardMaterial({ color: '#bba5ff', emissive: '#8061cf', emissiveIntensity: 0.2, roughness: 1, flatShading: true }),
    shoes: new THREE.MeshStandardMaterial({ color: '#121729', roughness: 1, flatShading: true }),
  }

  // Every part is a true box mesh: blocky, crunchy voxel silhouettes.
  const cubeGeo = new THREE.BoxGeometry(1, 1, 1)
  function block(parent, mat, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(cubeGeo, mat)
    mesh.position.set(x, y, z)
    mesh.scale.set(sx, sy, sz)
    parent.add(mesh)
    return mesh
  }
  const player = new THREE.Group()
  scene.add(player)
  player.position.set(.95, .07, -.55)
  const torso = new THREE.Group()
  player.add(torso)
  block(torso, mats.hoodie, 0, -1.03, 0, 1.62, 1.48, .82)
  block(torso, mats.hoodieLight, 0, -.56, .43, 1.17, .13, .06)
  block(torso, mats.hoodDark, 0, -.61, .45, .28, .72, .08)
  for (const side of [-1,1]) {
    block(torso,mats.hoodie,side*.91,-.83,.06,.45,.87,.62)
    block(torso,mats.hoodieLight,side*.91,-1.16,.42,.46,.40,.89)
    block(torso,mats.skin,side*.91,-1.14,.91,.38,.27,.37)
  }
  block(torso, mats.teal, 0, -1.08, .43, .33, .24, .05)
  block(torso, mats.hoodDark, -.21, -.36, .36, .055, .38, .06)
  block(torso, mats.hoodDark, .21, -.36, .36, .055, .38, .06)

  const headPivot = new THREE.Group()
  headPivot.position.y = -.08
  player.add(headPivot)
  block(headPivot, mats.skin, 0, .8, .08, 1.33, 1.37, .9)
  block(headPivot, mats.skinShadow, 0, .11, .22, 1.09, .16, .74)
  block(headPivot, mats.skin, -.75, .77, .02, .34, .46, .36)
  block(headPivot, mats.skin, .75, .77, .02, .34, .46, .36)
  block(headPivot, mats.hair, 0, 1.41, .03, 1.39, .3, .96)
  block(headPivot, mats.hair, -.54, 1.14, .32, .19, .25, .34)
  block(headPivot, mats.hair, .54, 1.14, .32, .19, .25, .34)
  block(headPivot, mats.cap, 0, 1.65, -.1, 1.58, .35, 1.10)
  block(headPivot, mats.cap, 0, 1.84, -.1, 1.28, .17, .85)
  block(headPivot, mats.capBrim, 0, 1.48, .47, 1.88, .14, .82)
  block(headPivot, mats.pale, -.29, .92, .535, .31, .24, .07)
  block(headPivot, mats.pale, .29, .92, .535, .31, .24, .07)
  block(headPivot, mats.eyes, -.29, .92, .6, .13, .19, .065)
  block(headPivot, mats.eyes, .29, .92, .6, .13, .19, .065)
  block(headPivot, mats.skinShadow, 0, .68, .61, .23, .28, .23)
  block(headPivot, mats.mouth, 0, .39, .56, .5, .09, .06)
  block(headPivot, mats.teal, -.65, .43, -.04, .12, .14, .2)
  block(headPivot, mats.purple, .65, .43, -.04, .12, .14, .2)

  // Orbiting blocks and interactive HUD particles
  const dust = new THREE.Group()
  scene.add(dust)
  const miniCubes = []
  const rng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
  const random = rng(12345)
  for (let i = 0; i < 28; i++) {
    const side = random() > 0.5 ? 1 : -1
    const mini = block(dust, i % 3 === 0 ? mats.purple : mats.teal,
      side * (2.0 + random() * 1.5), -1.1 + random() * 4, -1.8 + random() * 1.2,
      .045 + random() * .12, .045 + random() * .12, .045 + random() * .12)
    mini.rotation.z = random() * Math.PI
    miniCubes.push({ mesh: mini, speed: .35 + random(), phase: random() * Math.PI * 2, origY: mini.position.y })
  }
  furnish(scene,block,mats)

  let mouseX = 0
  let mouseY = 0
  const pointerMove = event => {
    const rect = host.getBoundingClientRect()
    mouseX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    mouseY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
  }
  host.closest('.world').addEventListener('pointermove', pointerMove, { passive: true })
  host.closest('.world').addEventListener('pointerleave', () => { mouseX = 0; mouseY = 0 })

  function resize() {
    const width = host.clientWidth
    const height = host.clientHeight
    if (!width || !height) return
    const aspect = width / height
    const halfHeight = Math.max(2.88, 4.45 / aspect)
    camera.left = -aspect * halfHeight
    camera.right = aspect * halfHeight
    camera.top = halfHeight
    camera.bottom = -halfHeight
    camera.updateProjectionMatrix()
    // Draw at lower resolution, then enlarge with nearest-neighbor scaling.
    renderer.setSize(Math.floor(width * .66), Math.floor(height * .66), false)
    renderer.domElement.style.width = `${width}px`
    renderer.domElement.style.height = `${height}px`
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  resize()

  const clock = new THREE.Clock()
  let previous = 0
  let visible = true
  const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true }, { threshold: 0.01 })
  visibilityObserver.observe(host)
  function animate() {
    requestAnimationFrame(animate)
    if (!visible || document.hidden) { previous = clock.getElapsedTime(); return }
    const t = clock.getElapsedTime()
    const dt = Math.min(t - previous, 0.05)
    previous = t
    const lerp = 1 - Math.exp(-7 * dt)
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, motionReduced.matches ? 0 : mouseX * .16 + Math.sin(t * .28) * .035, lerp)
    headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, motionReduced.matches ? 0 : mouseX * .44, lerp)
    headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, motionReduced.matches ? 0 : mouseY * .18, lerp)
    if (!motionReduced.matches) {
      player.position.y = .07 + Math.sin(t * 1.45) * .025
      player.rotation.z = Math.sin(t * 1.1) * .018
      dust.rotation.y = Math.sin(t * .14) * .16
      miniCubes.forEach(c => { c.mesh.position.y = c.origY + Math.sin(t * c.speed + c.phase) * .14; c.mesh.rotation.y += dt * .45 })
    }
    renderer.render(scene, camera)
  }
  animate()
}


