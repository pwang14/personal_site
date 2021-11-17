/*
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js'

import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/FilmPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/postprocessing/UnrealBloomPass.js';
*/

import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';


const introCanvas = document.querySelector('#intro-canvas');
const mainRenderer = new THREE.WebGLRenderer({
    canvas: introCanvas,
    alpha: true,
});
mainRenderer.setSize(introCanvas.clientWidth, introCanvas.clientHeight, false);

const fov = 75;
const aspect = introCanvas.clientWidth / introCanvas.clientHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 1;
camera.position.y = -0.125;

const scene = new THREE.Scene();

const imgRatio = 700/393;
const introHeight = 0.68;
const introWidth = introHeight * imgRatio;
const introGeometry = new THREE.PlaneGeometry(introWidth, introHeight);

const loader = new THREE.TextureLoader();
const introTexture = loader.load('./../assets/img/main-bg-sign.png');
const material = new THREE.MeshBasicMaterial({
    map: introTexture,
    side: THREE.DoubleSide,
});

const introSign = new THREE.Mesh(introGeometry, material);
scene.add(introSign);

function rotate(canvas, obj, e)
{
    const dx = e.offsetX - canvas.clientWidth/2;
    const dy = canvas.clientHeight/2 - e.offsetY;
    const dz = 4 * canvas.clientWidth;

    const angleY = Math.atan(dx/dz);
    const angleX = Math.atan(dy/dz);

    obj.rotation.y = angleY;
    obj.rotation.x = -angleX;
}

introCanvas.addEventListener('mousemove', e =>
{
    rotate(introCanvas, introSign, e);
});

introCanvas.addEventListener('mouseleave', e =>
{
    //introSign.rotation.y = 0;
    //introSign.rotation.x = 0;
});

const composer = new EffectComposer(mainRenderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(introCanvas.clientWidth, introCanvas.clientHeight), 1.25, 1.2, 0.25);
composer.addPass(bloomPass);

const filmPass = new FilmPass(0.5, 0, 0, false);
composer.addPass(filmPass);

let introCanvasWidth = 0;
let introCanvasHeight = 0;
function render(now)
{
    if (introCanvasWidth != introCanvas.clientWidth)
    {
        introCanvasWidth = introCanvas.clientWidth;
        introCanvasHeight = introCanvas.clientHeight;

        bloomPass.strength = 0.9 + (1800 - introCanvasWidth) / 1800;

        mainRenderer.setSize(introCanvasWidth, introCanvasHeight, false);
        composer.setSize(introCanvasWidth, introCanvasHeight);
    }

    composer.render();

    requestAnimationFrame(render);
}

requestAnimationFrame(render);