
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js'

import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/FilmPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/UnrealBloomPass.js';

/*
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
*/

const signCanvas = document.querySelector('#main-bg-canvas');
const mainRenderer = new THREE.WebGLRenderer({canvas: signCanvas, alpha: true});
mainRenderer.setSize(signCanvas.clientWidth, signCanvas.clientHeight);

const fov = 75;
const aspect = signCanvas.clientWidth / signCanvas.clientHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const ratio = 700/393;
const signHeight = 1.5;
const signWidth = signHeight * ratio;
const signGeometry = new THREE.PlaneGeometry(signWidth, signHeight);

const loader = new THREE.TextureLoader();
const signTexture = loader.load('./../assets/img/main-bg-sign.png');
const material = new THREE.MeshBasicMaterial({
    map: signTexture,
    side: THREE.DoubleSide,
});

const sign = new THREE.Mesh(signGeometry, material);
scene.add(sign);

let count = 0;
function rotate(canvas, obj, e) {
    const dx = e.offsetX - canvas.clientWidth/2;
    const dy = canvas.clientHeight/2 - e.offsetY;
    const dz = 2 * canvas.clientWidth;

    const angleY = Math.atan(dx/dz);
    const angleX = Math.atan(dy/dz);

    obj.rotation.y = angleY;
    obj.rotation.x = -angleX;
}

let live = false;
signCanvas.addEventListener('mousedown', e => {
    if (!live) live = true;
});

signCanvas.addEventListener('mousemove', e => {
    if (live) rotate(signCanvas, sign, e);
});

signCanvas.addEventListener('mouseup', e => {
    if (live) {
        live = false;
        sign.rotation.y = 0;
        sign.rotation.x = 0;
    }
});

const composer = new EffectComposer(mainRenderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const firstBloomPass = new UnrealBloomPass(new THREE.Vector2(signCanvas.clientWidth, signCanvas.clientHeight), 1.25, 0.8, 0.3);
const secondBloomPass = new UnrealBloomPass(new THREE.Vector2(signCanvas.clientWidth, signCanvas.clientHeight), 1.25, 1.6, 0.0);
composer.addPass(firstBloomPass);
//composer.addPass(secondBloomPass);
const filmPass = new FilmPass(0.5, 0, 0, false);
composer.addPass(filmPass);

function render(now) {
    requestAnimationFrame(render);
    composer.render();
}

requestAnimationFrame(render);

console.log('General Kenobi!');