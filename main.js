﻿import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const loader = new THREE.TextureLoader();
const texture = loader.load('https://images.unsplash.com/photo-1518770660439-4636190af475');
 // replace with your image

const uniforms = {
  uTexture: { value: texture },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uTime: { value: 0.0 },
};

const geometry = new THREE.PlaneGeometry(2, 1.5, 32, 32);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Mouse tracking
window.addEventListener('mousemove', (e) => {
  uniforms.uMouse.value.x = e.clientX / window.innerWidth;
  uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
});

// Animation loop
function animate(time) {
  uniforms.uTime.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
