import * as THREE from 'three'

// The seated character and furniture share the same unit-box geometry.
export function furnish(scene, block, mats) {
  const material = color => new THREE.MeshStandardMaterial({ color, roughness: 1 })
  const wood = material('#bb825c'), edge = material('#754a40')
  const metal = material('#435365'), casework = material('#b7b4a2')
  const floor = material('#505c66'), grout = material('#323e49')
  const leaves = material('#529566'), leavesLight = material('#99bd78')
  block(scene, grout, 0,-2.75,0, 6.8,.4,4.9)
  block(scene, mats.teal, 0,-2.79,0, 6.84,.06,4.94)
  for (let x=0;x<6;x++) for (let z=0;z<4;z++)
    block(scene,floor,(x-2.5)*1.12,-2.51,(z-1.5)*1.2,1.10,.13,1.18)
  // Chair with a padded back and swivel base.
  block(scene, metal,.95,-2.21,-.6,.24,.55,.24)
  block(scene, metal,.95,-2.42,-.6,1.44,.12,.73)
  block(scene, mats.capBrim,.95,-1.85,-.6,1.65,.25,1.3)
  block(scene, mats.capBrim,.95,-.98,-1.18,1.65,1.68,.26)
  block(scene, mats.cap,.95,-.81,-1.35,1.38,1.16,.12)
  // Desk and drawer pedestal.
  block(scene, edge,-.25,-1.43,1.02,5.35,.22,1.62)
  block(scene, wood,-.25,-1.28,1.02,5.45,.14,1.7)
  for (const x of [-2.65,2.15]) for (const z of [.39,1.66])
    block(scene,metal,x,-1.95,z,.18,1.08,.18)
  block(scene,casework,-2.15,-1.96,1.0,1.02,.92,1.16)
  for(const y of [-1.73,-2.13]) block(scene,metal,-2.15,y,1.6,.32,.08,.06)
  const monitor = new THREE.Group()
  monitor.position.set(-1.18,-1.20,.77)
  monitor.rotation.y=.54
  scene.add(monitor)
  block(monitor,metal,0,.06,0,.86,.12,.54)
  block(monitor,metal,0,.33,0,.22,.58,.19)
  block(monitor,casework,0,1.19,0,1.85,1.25,.34)
  block(monitor,mats.hoodDark,0,1.22,.19,1.61,.96,.09)
  const lengths=[.74,.98,.45,.82,.57]
  lengths.forEach((w,i)=>block(monitor,i%2?mats.purple:mats.teal,-.65+w/2+(i%2)*.12,1.54-i*.15,.25,w,.048,.025))
  block(monitor,mats.teal,.7,.64,.2,.1,.045,.045)
  block(scene,metal,.67,-1.15,1.16,1.65,.11,.63)
  for(let r=0;r<3;r++) for(let c=0;c<9;c++)
    block(scene,r===2&&c>6?mats.cap:casework,.01+c*.16,-1.075,.98+r*.17,.12,.055,.115)
  block(scene,mats.cap,1.92,-1.13,1.2,.29,.17,.41)
  // Ceramic pot and stepped leaves.
  block(scene,wood,-2.5,-1.02,1.12,.45,.38,.45)
  block(scene,casework,-2.5,-.84,1.12,.51,.12,.51)
  for(const [dx,dy,dz] of [[0,0,0],[-.17,-.13,0],[.18,-.09,.05],[.07,-.15,.15]])
    block(scene,dx>0?leavesLight:leaves,-2.5+dx,-.54+dy,1.12+dz,.15,.45,.17)
  // Bent legs extend from the seat under the desktop.
  for (const x of [.60,1.30]) {
    block(scene,mats.hoodieLight,x,-1.65,-.04,.56,.44,1.09)
    block(scene,mats.hoodieLight,x,-1.97,.39,.53,.73,.52)
    block(scene,mats.shoes,x,-2.31,.57,.58,.23,.83)
  }
}
