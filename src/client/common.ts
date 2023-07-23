import {
    Scene,
    PerspectiveCamera,
    WebGL1Renderer,
    Mesh,
    TetrahedronGeometry,
    MeshStandardMaterial,
    TextureLoader,
    BoxGeometry,
    PointLight,
    AmbientLight,
    CircleGeometry,
    MathUtils,
    ColorRepresentation,
} from "three";

// Initializing scene, camera and renderer
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const bgCanvas = document.getElementById("bg") as HTMLCanvasElement;
const renderer = new WebGL1Renderer({
    canvas: bgCanvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Adding animated tetra
const tetra = new Mesh(
    new TetrahedronGeometry(10),
    new MeshStandardMaterial({
        map: new TextureLoader().load("/images/textures/mandelbrot.jpeg"),
    })
);
tetra.position.setX(-10);
tetra.position.setY(12);
scene.add(tetra);

// Adding animated cube
const george = new Mesh(
    new BoxGeometry(3, 3, 3),
    new MeshStandardMaterial({
        map: new TextureLoader().load("/images/textures/profile.jpeg"),
    })
);
george.position.setX(8);
scene.add(george);

// Adding lights and controls
const pointLight = new PointLight(0xff6666);
pointLight.position.set(-11, 13, 20);
scene.add(pointLight, new AmbientLight(0xffffff));

/* Adding the fractals on circles, randomly generated throughout app */
const addFractal = (imageSrc: string, colour: ColorRepresentation) => {
    const fGeometry = new CircleGeometry(3, 32, 0, 2 * Math.PI);
    const fMaterial = new MeshStandardMaterial({
        color: colour,
        map: new TextureLoader().load(imageSrc),
    });
    const frac = new Mesh(fGeometry, fMaterial);

    const [x, y, z] = Array(3)
        .fill(0)
        .map(() => MathUtils.randFloatSpread(100));
    frac.position.set(x, y, z);
    scene.add(frac);
};

Array(15)
    .fill(0)
    .forEach(() => {
        addFractal("/images/textures/fractal-1.png", 0xfa7603);
    });
Array(15)
    .fill(0)
    .forEach(() => {
        addFractal("/images/textures/fractal-2.png", 0xfab903);
    });
Array(15)
    .fill(0)
    .forEach(() => {
        addFractal("/images/textures/fractal-3.png", 0xfc6501);
    });

// Adding background then animating
scene.background = new TextureLoader().load("/images/gloop.png");
const animate = () => {
    requestAnimationFrame(animate);

    tetra.rotation.x += 0.01;
    tetra.rotation.y += 0.005;
    tetra.rotation.z += 0.02;
    george.rotation.x += 0.005;
    george.rotation.y += 0.0025;
    renderer.render(scene, camera);
};

// Defining how to move camera
const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;
    camera.position.x = t * -0.006;
    camera.position.y = t * -0.006;
};

animate();
document.body.onscroll = moveCamera;
