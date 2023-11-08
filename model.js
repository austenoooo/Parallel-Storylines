import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// refresh page when resized
window.onresize = function () {
    location.reload();
  };

let scene, camera, renderer;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antilias: true, alpha: true});
    renderer.setSize(window.innerWidth, winder.innerHeight);
    renderer.setClearColor( 0x000000, 0 ); // the default
    document.getElementById("models").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    // helper functions
    const axesHelper = new THREE.AxesHelper(30);
    // scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(200, 200);
    // scene.add(gridHelper);

    // add ambient light
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientlight);

    addSphere();

    loop();

}


function addSphere() {

}

function loop() {
    // render the scene
    renderer.render(scene, camera);

    // rinse and repeat
    window.requestAnimationFrame(loop);
    }