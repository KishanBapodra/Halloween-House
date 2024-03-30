import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const exporter = new GLTFExporter();
const exportButton = document.getElementById('exportButton');


/**
 * Base
*/
// Debug
const gui = new GUI()
const houseControl = gui.addFolder('house')
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace

const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassAmbientOcclusionTexture.repeat.set(8,8)
grassColorTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture 
    })
)
walls.position.y += 1.25

house.add(walls)

const roomA = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2.5, 3),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture 
    })
)
roomA.position.set(3.5, 1.25, 0)

house.add(roomA)

const roomB = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1.5, 3),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture 
    })
)
roomB.position.y = 3.25

house.add(roomB)

const roomC = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 2),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture 
    })
)
roomC.position.y = 4.5

house.add(roomC)

houseControl.add(walls.scale, 'x').min(0.5).max(3).step(0.1).name('Scale X')
houseControl.add(walls.scale, 'y').min(0.5).max(3).step(0.1).name('Scale Y')

const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xb35f45 })

// Cone
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.65, 1.5, 4),
    roofMaterial
)
roof.position.y = 6
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Cylinder Roof
const roofSideGeometry = new THREE.CylinderGeometry(1, 2.15, 0.5, 4);

const roofSide = new THREE.Mesh(roofSideGeometry, roofMaterial)
roofSide.position.set(3.5, 2.75, 0)
roofSide.rotation.y = Math.PI * 0.25

house.add(roofSide)

const roofMain = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 2.85, 1, 4),
    roofMaterial
)
roofMain.position.y = 3
roofMain.rotation.y = Math.PI * 0.25

house.add(roofMain)

const roofSecond = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 2.1, 1, 4),
    roofMaterial
)
roofSecond.position.y = 4.5
roofSecond.rotation.y = Math.PI * 0.25

house.add(roofSecond)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        aoMap: doorAmbientOcclusionTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
     })
)
door.position.z = 2.01
door.position.y = 1
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bushA = new THREE.Mesh(bushGeometry, bushMaterial)
bushA.scale.set(0.5, 0.5, 0.5)
bushA.position.set(0.8, 0.2, 2.4)

const bushB= new THREE.Mesh(bushGeometry, bushMaterial)
bushB.scale.set(0.35, 0.35, 0.35)
bushB.position.set(-0.8, 0.2, 2.4)

const bushC = new THREE.Mesh(bushGeometry, bushMaterial)
bushC.scale.set(0.25, 0.25, 0.25)
bushC.position.set(1.4, 0.1, 2.2)

const bushD = new THREE.Mesh(bushGeometry, bushMaterial)
bushD.scale.set(0.35, 0.35, 0.35)
bushD.position.set(1.4, 0.1, 2.7)

const bushE = new THREE.Mesh(bushGeometry, bushMaterial)
bushE.scale.set(0.45, 0.45, 0.45)
bushE.position.set(-1.4, 0.1, 2.1)

house.add(bushA, bushB, bushC, bushD, bushE)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.4, 0.7, 0.2)
const graveMaterial =  new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50 ; i++) { 

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const graveMesh = new THREE.Mesh(graveGeometry, graveMaterial)

    graveMesh.position.set(x, 0.3, z)
    graveMesh.rotation.y = (Math.random() - 0.5) * 0.4
    graveMesh.rotation.z = (Math.random() - 0.5) * 0.4
    graveMesh.castShadow = true
    graves.add(graveMesh)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture 
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.05)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('al intensity')
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.075)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('ml intensity')
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Point Light
const doorLight = new THREE.PointLight('#ff7d46', 2.5, 5)
doorLight.position.set(0, 2.2, 2.5)
gui.add(doorLight, 'intensity').min(0).max(4).step(0.001).name('dl intensity')
gui.add(doorLight, 'distance').min(2).max(15).step(1)
house.add(doorLight)

const roofLight = new THREE.PointLight('#ff7d46', 1, 3)
roofLight.position.set(0, 5, 1.01)
house.add(roofLight)

/**
 * Ghosts
 */
const ghostA = new THREE.PointLight('#595959', 6, 3)
const ghostB = new THREE.PointLight('#ff00ff', 6, 3)
const ghostC = new THREE.PointLight('#fff000', 4, 3)

scene.add(ghostA, ghostB, ghostC)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghostA.castShadow = true
ghostB.castShadow = true
ghostC.castShadow = true

walls.castShadow = true
bushA.castShadow = true
bushB.castShadow = true
bushC.castShadow = true

floor.receiveShadow = true
walls.receiveShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Ghosts
    const ghostAAngle = elapsedTime * 0.5
    ghostA.position.x = Math.cos(ghostAAngle) * 5
    ghostA.position.z = Math.sin(ghostAAngle) * 5
    ghostA.position.y = Math.sin(elapsedTime * 3)
    
    const ghostBAngle = - elapsedTime * 0.2
    ghostB.position.x = Math.cos(ghostBAngle) * ( 3 + Math.cos(elapsedTime * 3))
    ghostB.position.z = Math.sin(ghostBAngle) * 7
    ghostB.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 4)
    
    const ghostCAngle = elapsedTime * 0.26
    ghostC.position.x = Math.cos(ghostCAngle) * ( 7 + Math.sin(elapsedTime + 0.3))
    ghostC.position.z = Math.sin(ghostCAngle) * ( 7 + Math.sin(elapsedTime + 0.6))
    ghostC.position.y = Math.sin(elapsedTime * 3)

    // Update controls
    controls.update()

    console.log((Math.random() - 0.5) * 4)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// exporter.parse(
//     scene,
//     function (result) {
//       // Create a blob from the exported data
//       const blob = new Blob([result], { type: 'model/gltf-binary' });
  
//       // Create a download link
//       const downloadLink = document.createElement('a');
//       downloadLink.download = 'scene.glb';
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.click();
//     },
//     function (error) {
//       console.error('An error occurred while exporting the scene:', error);
//     },
//     { binary: true } // Export as binary .glb file
//   );

exportButton.addEventListener('click', () => {
    // Create an exporter instance
    const exporter = new GLTFExporter();
  
    // Export the scene to a .glTF file
    exporter.parse(
      scene,
      function (result) {
        // Create a blob from the exported data
        const blob = new Blob([result], { type: 'model/gltf-binary' });
  
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.download = 'scene.glb';
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
      },
      function (error) {
        console.error('An error occurred while exporting the scene:', error);
      },
      { binary: true } // Export as binary .glb file
    );
  });