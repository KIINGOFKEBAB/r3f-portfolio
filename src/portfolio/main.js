import "./style/style.scss";
import "./style/space.scss"
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useWindowScroll } from "@mantine/hooks";
import { SrcAlphaFactor } from "three";
import ScrollReveal from 'scrollreveal';


const starsTexture = "https://i.imgur.com/gLGNnkp.jpeg";
const sunTexture = "https://i.imgur.com/zU5oOjt.jpeg";
const mercuryTexture = "https://i.imgur.com/TJO6Te3.jpeg";
const venusTexture = "https://i.imgur.com/xeaPIjD.jpeg";
const earthTexture = "https://i.imgur.com/vflkkqF.jpeg";
const marsTexture = "https://i.imgur.com/U6upjrv.jpeg";
const jupiterTexture = "https://i.imgur.com/4APG00k.jpeg";
const saturnTexture = "https://i.imgur.com/YKw0m4x.jpeg";
const saturnRingTexture = "https://i.imgur.com/u0muMiZ.png";
const uranusTexture = "https://i.imgur.com/olpgGMo.jpeg";
const uranusRingTexture = "https://i.imgur.com/F1y9Ve4.png";
const neptuneTexture = "https://i.imgur.com/pycXdLM.jpeg";
const plutoTexture = "https://i.imgur.com/YNsmmHV.jpeg";



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const pt = new THREE.Vector3(0,1,2);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.enableZoom = true;

camera.position.set(-200, 30, 30);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

var lastScrollTop = 0;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

  console.log(t)
  if (t <= -1700){
    console.log("scrollDown")
    camera.position.z += 2;
    camera.position.x += -2;
    camera.position.Y += 2;
  } else {
    console.log("scrollUp")
    camera.position.z += -2;
    camera.position.x += 2;
    camera.position.Y += -2;

  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  
  camera.lookAt(pt);
  
}

let el = document.querySelector('#bg');
//el.onwheel = console.log("salut")//moveCamera ();

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}



const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  //Around-sun-rotation
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: '2500',
  delay:'3000'
})

document.querySelector("#showplanets").addEventListener("click", function(){
  let planets = document.querySelector("#bg");
  let card = document.querySelector(".card");
  console.log(planets)
  if(planets.style.display === "flex"){
    planets.style.display = "none"
    planets.style.position = "static"
  }else{
    planets.style.display = "flex"
    planets.style.position = "absolute"
    card.style.display = "none"
    
    
  }
  
})