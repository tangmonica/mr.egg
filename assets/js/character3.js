let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;
let model;

function init() {
    //ref to the container element which holds the scene
    container = document.querySelector('#scene-container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    createCamera();
    createControls();
    createLights();
    loadModels();
    createRenderer();
    render();
    renderer.setAnimationLoop( () => {
        update();
        render();
    });
}

function createCamera() {
    //camera
    camera = new THREE.PerspectiveCamera(
        35, //field of view
        container.clientWidth / container.clientHeight, //aspect ratio
        0.1, //near clipping plane
        100, //far clipping plane
    );
    camera.position.set(-5, 5, 20);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
    //ambient lighting
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, //bright sky color
        0x202020, //dim ground color
        5, //intensity
    );
    //point lights
    const light1 = new THREE.PointLight(0xffffff, 200);
    light1.position.set(0, 300, 300);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xffffff, 200);
    light2.position.set(-300, 300, 0);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xffffff, 200);
    light3.position.set(0, 300, -300);
    scene.add(light3);
    const light4 = new THREE.PointLight(0xffffff, 200);
    light4.position.set(300, 300, 0);
    scene.add(light4);

    //directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    mainLight.position.set(20, 20, 20);
   
    scene.add(ambientLight, mainLight);
}

function loadModels() {
    const loader = new THREE.GLTFLoader();
    const onLoad = (gltf, position) => {
        model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.set(2, 2, 2);
        scene.add(model);
    };
    const onError = (errorMessage) => {console.log(errorMessage);};
    
    const eggMetalPosition = new THREE.Vector3(0, 0, 0);
    loader.load('assets/models/eggMarble.glb', gltf => onLoad(gltf, eggMetalPosition), onError, );
}

function createRenderer() {
    //create a WebGLRenderer and set width and height
    //creates the renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
   
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.physicallyCorrectLights = true;
    
    container.appendChild(renderer.domElement);
}

function update() {
    if (model) {
        model.rotation.y += 0.01;
    }
} 

function render() {
    //render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    //update aspect ratio
    camera.aspect = container.clientWidth/container.clientHeight;
    //update camera frustum
    camera.updateProjectionMatrix();
    //update size of renderer and canvas
    renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener('resize', onWindowResize);

init();