import keyInput from "./keyInput.js";
import connect from "./Connect.js";


const ratio = window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x249183);
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const Light = new THREE.AmbientLight(0xffffff)
const dLight = new THREE.DirectionalLight(0xffffff,0.5);
Light.add(dLight);
scene.add( Light );

const geometry = new THREE.BoxGeometry( 50, 0.1, 50 );
const material = new THREE.MeshPhongMaterial( { color: 0x737831 } );
const ground = new THREE.Mesh( geometry, material );
scene.add( ground );

camera.position.set(5,15,15);



function animate() {
   
	requestAnimationFrame( animate );
    if(keyInput.isPressed(38)){
        camera.position.y += 0.05;
        camera.position.x += 0.05;
    }
    if(keyInput.isPressed(40)){
        camera.position.y -= 0.05;
        camera.position.x -= 0.05;
    }
    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();

connect.then((result) => { 
    console.log(result);
    result.buildings.forEach((b,index) => {
        if(index <= result.supply) {
            const boxGeometry =new THREE.BoxGeometry(b.w,b.h,b.d);
            const boxMaterial = new THREE.MeshPhongMaterial({color: 0x23c4c4});
            const box = new THREE.Mesh(boxGeometry,boxMaterial);
            box.position.set(b.x,b.y,b.z);
            scene.add(box);
        }
    });
});
