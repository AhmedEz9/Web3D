import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // I have to change it later too
document.body.appendChild(renderer.domElement);

// Add Axis Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 15;

// Materials
const whiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff }); 
const orangeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 }); // Well Yeah it supposed to be black hat but orange is good too :D
const brownMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });  // Brown for arms

// Snowman Parts
// Body
const body = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), whiteMaterial);
const head = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), whiteMaterial);

// Hat - I have to fixe this later
const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32), orangeMaterial);
const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1.5, 32), orangeMaterial);

// Arms
const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 12), brownMaterial);
const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 12), brownMaterial);

// Nose
const nose = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1, 16), orangeMaterial);

// Eyes
const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), orangeMaterial);
const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), orangeMaterial);

// Positioning Snowman Parts
body.position.y = -2;
head.position.y = 1.5;
hatBase.position.y = 3.8;
hatTop.position.y = 4.5;

// Adjust the rotation and position for arms
leftArm.position.set(-2.5, 0.5, 0);
leftArm.rotation.z = Math.PI / 4;

rightArm.position.set(2.5, 0.5, 0);
rightArm.rotation.z = -Math.PI / 4;

// Nose
nose.position.set(0, 1.5, 1.5);
nose.rotation.x = Math.PI / 2;

// Eyes
leftEye.position.set(-0.5, 2, 1.3);  
rightEye.position.set(0.5, 2, 1.3);  

// Add to the scene
scene.add(body, head, hatBase, hatTop, leftArm, rightArm, nose, leftEye, rightEye);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); 
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.2); 
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
