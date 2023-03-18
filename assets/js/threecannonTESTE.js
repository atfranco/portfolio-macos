import * as THREE from "https://cdn.skypack.dev/three@0.127.0";
import * as CANNON from "https://cdn.skypack.dev/cannon-es@0.17.0";
import * as DAT from "https://cdn.skypack.dev/dat.gui@0.7.7";

// ==> Configuration
const CONFIG = {
    view_size: 50,
    camera_pos_x: 0,
    camera_pos_y: 10,
    camera_pos_z: 45,
    gravity_x: 0,
    gravity_y: -9.81, // m/s²
    gravity_z: 0,
    margin: 6,
    force: 2,

    fore_light_pos_x: 5,
    fore_light_pos_y: 5,
    fore_light_pos_z: 20,
    back_light_pos_x: -5,
    back_light_pos_y: -5,
    back_light_pos_z: -10,
    contact_material_friction: 0.001,
};

const mousePos = {
    x: 0,
    y: 0
};

// ==> THREE.js
const canvas = document.querySelector('canvas.webgl');



const aspect = innerWidth / innerHeight;
const dprFactor = 1; // 1 / window.devicePixelRatio;

const pageItems = document.querySelectorAll(".threetxt div");
const offset = pageItems.length * (CONFIG.margin * dprFactor) * 0.3;

// --> Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: false,
  antialias: true
});

renderer.setSize(innerWidth, innerHeight);
//renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

// --> Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.scene_background_color);

// --> Main group
const mainGroup = new THREE.Object3D();
scene.add(mainGroup);

// --> Camera
const viewSizeHalf = CONFIG.view_size / 2;
const near = -1;
const far = 1000;

let left, right, top, bottom;
if(innerWidth > innerHeight) {
    left = -viewSizeHalf * aspect;
    right = viewSizeHalf * aspect;
    top = viewSizeHalf;
    bottom = -viewSizeHalf;
}
else {
    left = -viewSizeHalf;
    right = viewSizeHalf;
    top = viewSizeHalf / aspect;
    bottom = -viewSizeHalf / aspect;
}
//console.log({left, right, top, bottom, aspect});

const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

camera.position.set(CONFIG.camera_pos_x, CONFIG.camera_pos_y, CONFIG.camera_pos_z);
camera.lookAt(scene.position);
scene.add(camera);

// --> Lights
const ambientLight = new THREE.AmbientLight(CONFIG.ambient_light_color);
scene.add(ambientLight);

const foreLight = new THREE.DirectionalLight(CONFIG.fore_light_color, 0.5);
foreLight.position.set(CONFIG.fore_light_pos_x, CONFIG.fore_light_pos_y, CONFIG.fore_light_pos_z);
scene.add(foreLight);

const backLight = new THREE.DirectionalLight(CONFIG.back_light_color, 1);
backLight.position.set(CONFIG.back_light_pos_x, CONFIG.back_light_pos_y, CONFIG.back_light_pos_z);
scene.add(backLight);

// --> Raycaster
const raycaster = new THREE.Raycaster();
const runRayCaster = function() {
    raycaster.setFromCamera(mousePos, camera);
    
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    return intersects;
}

// --> FontLoader
const fontLoader = new THREE.FontLoader();
const fontUrl = "https://rawcdn.githack.com/AlainBarrios/Fonts/358f48fc26f39af54da0243953780ea23786698f/Droid Sans_Regular.json";

// ==> CANNON.js
const world = new CANNON.World();
world.gravity.set(CONFIG.gravity_x, CONFIG.gravity_y, CONFIG.gravity_z); // m/s²

// ==> Resize handler
const onResize = function() {
    // Update camera
    const aspect = innerWidth / innerHeight;
    
    if(innerWidth > innerHeight) {
        left = -viewSizeHalf * aspect;
        right = viewSizeHalf * aspect;
        top = viewSizeHalf;
        bottom = -viewSizeHalf;
    }
    else {
        left = -viewSizeHalf;
        right = viewSizeHalf;
        top = viewSizeHalf / aspect;
        bottom = -viewSizeHalf / aspect;
    }
    //console.log({left, right, top, bottom, aspect});
    
    camera.left = left;
    camera.right = right;
    camera.top = top;
    camera.bottom = bottom;

    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    //renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
};
window.addEventListener("resize", onResize, false);

// ==> Click handler
const onClick = function() {
    const intersects = runRayCaster();
    
    for(let i = 0; i < intersects.length; i++) {
        const obj = intersects[0]; // FIXME: sollte das nicht [i] sein?
        
        const { object, face } = obj;
        if(!object.isMesh)
            return;
        
        const impulse = new CANNON.Vec3().copy(face.normal).scale(-CONFIG.force);
        
        mainGroup.children.forEach(words => {
            words.children.forEach(letter => {
                const { body } = letter;
                if(letter !== object)
                    return;
                
                body.applyLocalImpulse(impulse, new CANNON.Vec3());
            });
        });
    }
}
window.addEventListener("click", onClick, false);

// ==> Mouse move handler
const onMouseMove = function(e) {
    mousePos.x = e.clientX / innerWidth * 2 - 1;
    mousePos.y = -(e.clientY / innerHeight) * 2 + 1;
    
    const intersects = runRayCaster();
    renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "auto";
}
window.addEventListener("mousemove", onMouseMove, false);

// ==> Create Cannon.js materials
const groundMaterial = new CANNON.Material();
const letterMaterial = new CANNON.Material();

const contactMaterial = new CANNON.ContactMaterial(
    groundMaterial,
    letterMaterial,
    {
        friction: CONFIG.contact_material_friction
    }
);
world.addContactMaterial(contactMaterial);

// ==> Create Text
const create3DText = function(font) {
    pageItems.forEach( (item, index) => {
        const line = item.textContent;
        const lineGroup = new THREE.Object3D();
        
        lineGroup.letterOffset = 0;
        
        // create ground (shelf)
        // --> Three.js
        const geometry = new THREE.BoxGeometry(40 * dprFactor, 0.1 * dprFactor, 20 * dprFactor);
        geometry.computeBoundingBox();
        geometry.size = geometry.boundingBox.getSize(new THREE.Vector3());
        
        const material = new THREE.MeshPhongMaterial( { color: 0x3f414b } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.y = index * (CONFIG.margin * dprFactor) - offset;
        mainGroup.add(cube);
        
        // --> Cannon.js
        const lineGround = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3().copy(geometry.size).scale(0.5)),
            position: new CANNON.Vec3(0, index * (CONFIG.margin * dprFactor) - offset, 0),
            material: groundMaterial
        });
        world.addBody(lineGround);
        
        // create letters
        line.split("").forEach( (letter, i) => {
            const letterGeom = new THREE.TextBufferGeometry(
                letter,
                {
                    font: font,
                    size: 2.2 * dprFactor,
                    height: 0.2 * dprFactor,
                    curveSegments: 24,
                    bevelEnabled: true,
                    bevelThickness: 0.6 * dprFactor,
                    bevelSize: 0.2 *dprFactor,
                    bevelOffset: 0,
                    bevelSegments: 10
                }
            );
            
            letterGeom.computeBoundingBox();
            letterGeom.computeBoundingSphere();
            
            // !!! r111 -> r112
            // !!! The default value of MeshStandardMaterial.roughness has changed from 0.5 to 1.
            // !!! The default value of MeshStandardMaterial.metalness has changed from 0.5 to 0.
            const letterMat = new THREE.MeshStandardMaterial({
                color: item.style.color,
                roughness: 0.5,
                metalness: 0.6 // > r112
            });
            
            const letterMesh = new THREE.Mesh(letterGeom, letterMat);
            letterMesh.size = letterMesh.geometry.boundingBox.getSize(new THREE.Vector3());
            lineGroup.add(letterMesh);
            
            lineGroup.letterOffset += letterMesh.size.x + (0.5 * dprFactor);
            
            const box = new CANNON.Box(new CANNON.Vec3().copy(letterMesh.size).scale(0.5));
            letterMesh.body = new CANNON.Body({
                mass: 0.4,
                position: new CANNON.Vec3(
                    lineGroup.letterOffset,
                    (pageItems.length - index - 1) * (CONFIG.margin * dprFactor) - offset + (3 * dprFactor),
                    0
                ),
                material: letterMaterial
            });
            
            const { center } = letterMesh.geometry.boundingSphere;
            letterMesh.body.addShape(box, new CANNON.Vec3(center.x, center.y, center.z));
            world.addBody(letterMesh.body);
        });
        
        lineGroup.children.forEach( (letter, i) => {
            letter.body.position.x -= letter.size.x + lineGroup.letterOffset * 0.5;
        });
        
        mainGroup.add(lineGroup);
    });
};

// ==> Load Font
fontLoader.load(fontUrl, create3DText);

// ==> Render loop
const clock = new THREE.Clock();
let prevElapsedTime = 0;

const renderLoop = () => {
    // Time
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - prevElapsedTime;
    prevElapsedTime = elapsedTime;
    
    // Update
    mainGroup.children.forEach(line => {
        for(let i = 0; i < line.children.length; i++) {
            const letter = line.children[i];
            letter.position.copy(letter.body.position);
            letter.quaternion.copy(letter.body.quaternion);
        }
    });
    
    // Update physics
    world.step(1 / 60, deltaTime, 3);
    
    // Render
    renderer.render(scene, camera);
    
    // next Frame
    window.requestAnimationFrame(renderLoop);
}
renderLoop();

// ==> DAT.gui
const gui = new DAT.GUI(
    {
        closed: true,
        width: 300
    }
);
gui.hide();
