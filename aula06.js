import './styles.css'
import { setupCounter } from './counter.js'
import * as THREE from '../three/build/three.module';
import { GLTFLoader } from '../three/addons/loaders/GLTFLoader.js';
import { OrbitControls} from '../three/examples/jsm/controls/OrbitControls.js';
import { Light } from 'three';

//---------------------------------------------------------------!!---------=)
//Escrevi tudo em ingles mas fui eu que fiz, por favor me da nota!! 'Maruan =)
//---------------------------------------------------------------!!---------=)

//Create scene
const scene = new THREE.Scene();
const backgroundcolor = new THREE.Color(0x37393E);
scene.background = backgroundcolor;

const canvas = document.querySelector('#bg1');
const stl = getComputedStyle(canvas);
const [w, h] = [parseInt(stl.width), parseInt(stl.height)];

//Create camera
const camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 1000);

//Create render
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: false,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


//Initial camera and output configurations
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(w, h, false);
camera.position.set(10, 10, 30);
camera.lookAt(0, 0, 0);

//Load the AULA_06 3d model.
const loader = new GLTFLoader();
loader.load('./3d/AULA_06.glb', function(glft){
  glft.scene.position.x = -38;
  glft.scene.position.z = 30;
  glft.scene.position.y = -1;
  glft.scene.scale.set(5, 5, 5);
  glft.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(glft.scene);
});

//Ambient light (sun)
const ambientlight = new THREE.AmbientLight(0xffffff, 0.4 );
ambientlight.position.set(0, 1, 10);
scene.add(ambientlight);

//Point light
const pointlight1 = new THREE.PointLight(0xffffff);
pointlight1.intensity = 1.3;
pointlight1.position.set(0,35,0);
pointlight1.castShadow = true;
scene.add(pointlight1);

//Point light shadows
pointlight1.shadow.mapSize.width = 2048;
pointlight1.shadow.mapSize.height = 2048;
pointlight1.shadow.camera.near = 1; 
pointlight1.shadow.camera.far = 100;
pointlight1.shadow.bias = -0.01;
pointlight1.shadow.radius = 1;  


//Ground
const groundplanegeometry = new THREE.PlaneGeometry(75, 35);
const groundmaterial = new THREE.MeshBasicMaterial({color: 0x37393E, side: THREE.DoubleSide});
const groundplane = new THREE.Mesh(groundplanegeometry, groundmaterial);
groundplane.rotateX(Math.PI/2);
groundplane.position.set(0, -1, 0);
scene.add(groundplane);


//Camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI/2;
controls.minDistance = 5;
controls.maxDistance = 75;
controls.enablePan = false;

scene.add(new THREE.AxesHelper(1));


//void update()
function animate(){
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
animate()
