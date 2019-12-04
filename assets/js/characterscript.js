function init(elem) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    const {width, height} = elem.getBoundingClientRect();
    
    //create camera
    const camera = new THREE.PerspectiveCamera(
        35, //field of view
        width / height, //aspect ratio
        0.1, //near clipping plane
        100, //far clipping plane
    );
    camera.position.set(0, 0, 20);
    //create controls
    const controls = new THREE.OrbitControls(camera, elem);
    controls.enableZoom = false;
    
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
    const mainLight = new THREE.DirectionalLight(0xffffff, 7);
    mainLight.position.set(20, 20, 20);
    scene.add(ambientLight, mainLight);

    return {scene, camera, elem};
}

function renderScene(sceneInfo) {
    const {scene, camera, elem} = sceneInfo;
    const {width, height} = elem.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.physicallyCorrectLights = true;
    elem.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    //start animation loop
    renderer.setAnimationLoop( () => {
        if (sceneInfo.model) {
            sceneInfo.model.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    });
    return renderer;
}

function onWindowResize() {
    var {width, height} = sceneInfo1.elem.getBoundingClientRect();
    //update aspect ratio
    sceneInfo1.camera.aspect = width/height;
    //update camera frustum
    sceneInfo1.camera.updateProjectionMatrix();
    //update size of renderer and canvas
    renderer1.setSize(width, height);

    var {width, height} = sceneInfo2.elem.getBoundingClientRect();
    //update aspect ratio
    sceneInfo2.camera.aspect = width/height;
    //update camera frustum
    sceneInfo2.camera.updateProjectionMatrix();
    //update size of renderer and canvas
    renderer2.setSize(width, height);
    
    var {width, height} = sceneInfo3.elem.getBoundingClientRect();
    //update aspect ratio
    sceneInfo3.camera.aspect = width/height;
    //update camera frustum
    sceneInfo3.camera.updateProjectionMatrix();
    //update size of renderer and canvas
    renderer3.setSize(width, height);
}  
window.addEventListener('resize', onWindowResize);

function makeScene1() {
    const sceneInfo = init(document.querySelector('#scene-container-one'));
    //load model
    const loader = new THREE.GLTFLoader();
    const onLoad = (gltf, position) => {
        const model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.set(1.5, 1.5, 1.5);
        sceneInfo.scene.add(model);
    };
    const onError = (errorMessage) => {console.log(errorMessage);};
    
    const eggPosition = new THREE.Vector3(0, 0, 0);
    loader.load('assets/models/eggGlow.glb', gltf => onLoad(gltf, eggPosition), onError, );
    return(sceneInfo);
}

function makeScene2() {
    const sceneInfo = init(document.querySelector('#scene-container-two'));
    //load model
    const loader = new THREE.GLTFLoader();
    const onLoad = (gltf, position) => {
        const model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.set(1.5, 1.5, 1.5);
        sceneInfo.scene.add(model);
    };
    const onError = (errorMessage) => {console.log(errorMessage);};
    
    const eggPosition = new THREE.Vector3(0, 0, 0);
    loader.load('assets/models/eggCopper.glb', gltf => onLoad(gltf, eggPosition), onError, );
    return(sceneInfo);
}

function makeScene3() {
    const sceneInfo = init(document.querySelector('#scene-container-three'));
    //load model
    const loader = new THREE.GLTFLoader();
    const onLoad = (gltf, position) => {
        const model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.set(1.5, 1.5, 1.5);
        sceneInfo.scene.add(model);
    };
    const onError = (errorMessage) => {console.log(errorMessage);};
    
    const eggPosition = new THREE.Vector3(0, 0, 0);
    loader.load('assets/models/eggMarble.glb', gltf => onLoad(gltf, eggPosition), onError, );
    return(sceneInfo);
}

const sceneInfo1 = makeScene1();
const renderer1 = renderScene(sceneInfo1);
const sceneInfo2 = makeScene2();
const renderer2 = renderScene(sceneInfo2);
const sceneInfo3 = makeScene3();
const renderer3 = renderScene(sceneInfo3);




