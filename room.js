// 3D Cozy Baby Room
// ==================

// Scene globals
let scene, camera, renderer, controls;
let pointLights = [];
let audioContext, whiteNoiseNode, gainNode;
let isAudioPlaying = false;
let lightsOn = true;

// Colors - warm and cozy palette
const COLORS = {
    wallColor: 0xFFF8DC,        // Cornsilk - light yellow
    floorColor: 0xDEB887,        // Burlywood - warm wood
    ceilingColor: 0xFFFAF0,      // Floral white
    bedColor: 0xFFE4B5,          // Moccasin
    bedSheetColor: 0xFFDAB9,     // Peachpuff
    deskColor: 0xD2B48C,         // Tan
    chairColor: 0xF4A460,        // Sandy brown
    sofaColor: 0xFFA07A,         // Light salmon
    horseColor: 0xCD853F,        // Peru
    babyColor: 0xFFE4E1,         // Misty rose
    accentColor1: 0x98D8C8,      // Mint green accent
    accentColor2: 0xF7DC6F,      // Soft yellow accent
    accentColor3: 0xF8B4D0        // Soft pink accent
};

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFF9E6);
    scene.fog = new THREE.Fog(0xFFF9E6, 1, 50);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 2, 0);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;

    // Build the room
    createRoom();
    createFurniture();
    createLighting();

    // Setup audio context
    setupAudio();

    // Event listeners
    setupEventListeners();

    // Hide loading
    document.getElementById('loading').classList.add('hidden');

    // Start animation
    animate();
}

// Create the room structure
function createRoom() {
    const roomSize = { width: 12, height: 8, depth: 12 };

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(roomSize.width, roomSize.depth);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.floorColor,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(roomSize.width, roomSize.depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.ceilingColor,
        side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.y = roomSize.height;
    ceiling.rotation.x = Math.PI / 2;
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.wallColor,
        side: THREE.DoubleSide,
        roughness: 0.9
    });

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(roomSize.width, roomSize.height);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -roomSize.depth / 2;
    backWall.position.y = roomSize.height / 2;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(roomSize.depth, roomSize.height);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -roomSize.width / 2;
    leftWall.position.y = roomSize.height / 2;
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(leftWallGeometry, wallMaterial.clone());
    rightWall.position.x = roomSize.width / 2;
    rightWall.position.y = roomSize.height / 2;
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Add decorative elements to walls
    addWallDecorations();
}

// Add decorative elements to walls
function addWallDecorations() {
    // Colorful wall decorations (pictures/frames)
    const frameColors = [COLORS.accentColor1, COLORS.accentColor2, COLORS.accentColor3];

    for (let i = 0; i < 3; i++) {
        const frameGeometry = new THREE.BoxGeometry(1, 1.2, 0.1);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: frameColors[i],
            roughness: 0.3,
            metalness: 0.1
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(-4 + i * 2.5, 4, -5.9);
        frame.castShadow = true;
        scene.add(frame);
    }

    // Window (simulated with bright rectangle)
    const windowGeometry = new THREE.PlaneGeometry(2, 2.5);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0F7FF,
        emissive: 0x87CEEB,
        emissiveIntensity: 0.3
    });
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(5.9, 4, 0);
    window1.rotation.y = -Math.PI / 2;
    scene.add(window1);
}

// Create all furniture
function createFurniture() {
    createBed();
    createDesk();
    createChair();
    createSofa();
    createWoodenHorse();
    createRugs();
    createToys();
}

// Create a cozy bed with a baby
function createBed() {
    const bedGroup = new THREE.Group();

    // Bed frame
    const frameGeometry = new THREE.BoxGeometry(3, 0.3, 2);
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.bedColor,
        roughness: 0.7
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = 0.6;
    frame.castShadow = true;
    bedGroup.add(frame);

    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(2.8, 0.4, 1.8);
    const mattressMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.bedSheetColor,
        roughness: 0.9
    });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.y = 0.95;
    mattress.castShadow = true;
    bedGroup.add(mattress);

    // Headboard
    const headboardGeometry = new THREE.BoxGeometry(3.2, 1.5, 0.2);
    const headboard = new THREE.Mesh(headboardGeometry, frameMaterial);
    headboard.position.set(0, 1.5, -1);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6);
    const legPositions = [
        [-1.3, 0.3, -0.8],
        [1.3, 0.3, -0.8],
        [-1.3, 0.3, 0.8],
        [1.3, 0.3, 0.8]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, frameMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        bedGroup.add(leg);
    });

    // Baby
    createBaby(bedGroup);

    // Pillow
    const pillowGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.5);
    const pillowMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor3,
        roughness: 0.95
    });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(-0.8, 1.25, -0.6);
    pillow.castShadow = true;
    bedGroup.add(pillow);

    // Blanket
    const blanketGeometry = new THREE.BoxGeometry(2, 0.1, 1.3);
    const blanketMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor1,
        roughness: 0.9
    });
    const blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
    blanket.position.set(0.3, 1.2, 0.2);
    blanket.rotation.z = 0.1;
    blanket.castShadow = true;
    bedGroup.add(blanket);

    bedGroup.position.set(-3, 0, -3);
    scene.add(bedGroup);
}

// Create a baby character
function createBaby(parent) {
    const babyGroup = new THREE.Group();

    // Baby head
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const babyMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.babyColor,
        roughness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, babyMaterial);
    head.position.set(0, 0, 0);
    head.castShadow = true;
    babyGroup.add(head);

    // Baby body
    const bodyGeometry = new THREE.CapsuleGeometry(0.25, 0.6, 8, 16);
    const body = new THREE.Mesh(bodyGeometry, babyMaterial);
    body.position.set(0, -0.5, 0);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    babyGroup.add(body);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 0.05, 0.25);
    babyGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 0.05, 0.25);
    babyGroup.add(rightEye);

    // Hat
    const hatGeometry = new THREE.ConeGeometry(0.35, 0.4, 32);
    const hatMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor2,
        roughness: 0.7
    });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(0, 0.4, 0);
    hat.castShadow = true;
    babyGroup.add(hat);

    babyGroup.position.set(0, 1.4, 0);
    babyGroup.rotation.y = Math.PI / 4;
    parent.add(babyGroup);
}

// Create a desk
function createDesk() {
    const deskGroup = new THREE.Group();
    const deskMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.deskColor,
        roughness: 0.6
    });

    // Desktop
    const desktopGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.2);
    const desktop = new THREE.Mesh(desktopGeometry, deskMaterial);
    desktop.position.y = 1.5;
    desktop.castShadow = true;
    deskGroup.add(desktop);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
    const legPositions = [
        [-1.1, 0.75, -0.5],
        [1.1, 0.75, -0.5],
        [-1.1, 0.75, 0.5],
        [1.1, 0.75, 0.5]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, deskMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        deskGroup.add(leg);
    });

    // Drawer
    const drawerGeometry = new THREE.BoxGeometry(2, 0.3, 0.8);
    const drawer = new THREE.Mesh(drawerGeometry, deskMaterial);
    drawer.position.set(0, 1, 0);
    drawer.castShadow = true;
    deskGroup.add(drawer);

    // Books on desk
    const bookColors = [COLORS.accentColor1, COLORS.accentColor2, COLORS.accentColor3];
    for (let i = 0; i < 3; i++) {
        const bookGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        const bookMaterial = new THREE.MeshStandardMaterial({
            color: bookColors[i],
            roughness: 0.8
        });
        const book = new THREE.Mesh(bookGeometry, bookMaterial);
        book.position.set(-0.7 + i * 0.35, 1.75, 0.3);
        book.rotation.y = (Math.random() - 0.5) * 0.3;
        book.castShadow = true;
        deskGroup.add(book);
    }

    // Lamp
    const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05);
    const lampMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor2,
        metalness: 0.5
    });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampMaterial);
    lampBase.position.set(0.8, 1.58, 0);
    deskGroup.add(lampBase);

    const lampPoleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5);
    const lampPole = new THREE.Mesh(lampPoleGeometry, lampMaterial);
    lampPole.position.set(0.8, 1.85, 0);
    deskGroup.add(lampPole);

    const lampShadeGeometry = new THREE.ConeGeometry(0.2, 0.3, 32);
    const lampShadeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFACD,
        emissive: 0xFFFFE0,
        emissiveIntensity: 0.2
    });
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    lampShade.position.set(0.8, 2.25, 0);
    deskGroup.add(lampShade);

    deskGroup.position.set(3, 0, -4);
    scene.add(deskGroup);
}

// Create a chair
function createChair() {
    const chairGroup = new THREE.Group();
    const chairMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.chairColor,
        roughness: 0.7
    });

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
    const seat = new THREE.Mesh(seatGeometry, chairMaterial);
    seat.position.y = 0.8;
    seat.castShadow = true;
    chairGroup.add(seat);

    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(0.8, 0.7, 0.1);
    const backrest = new THREE.Mesh(backrestGeometry, chairMaterial);
    backrest.position.set(0, 1.35, -0.35);
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
    const legPositions = [
        [-0.3, 0.4, -0.3],
        [0.3, 0.4, -0.3],
        [-0.3, 0.4, 0.3],
        [0.3, 0.4, 0.3]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, chairMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        chairGroup.add(leg);
    });

    chairGroup.position.set(3, 0, -2.5);
    chairGroup.rotation.y = Math.PI / 6;
    scene.add(chairGroup);
}

// Create a cozy sofa
function createSofa() {
    const sofaGroup = new THREE.Group();
    const sofaMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.sofaColor,
        roughness: 0.9
    });

    // Seat
    const seatGeometry = new THREE.BoxGeometry(3, 0.5, 1.2);
    const seat = new THREE.Mesh(seatGeometry, sofaMaterial);
    seat.position.y = 0.6;
    seat.castShadow = true;
    sofaGroup.add(seat);

    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(3, 1.2, 0.3);
    const backrest = new THREE.Mesh(backrestGeometry, sofaMaterial);
    backrest.position.set(0, 1.2, -0.45);
    backrest.castShadow = true;
    sofaGroup.add(backrest);

    // Armrests
    const armrestGeometry = new THREE.BoxGeometry(0.3, 0.8, 1.2);
    const leftArmrest = new THREE.Mesh(armrestGeometry, sofaMaterial);
    leftArmrest.position.set(-1.5, 0.9, 0);
    leftArmrest.castShadow = true;
    sofaGroup.add(leftArmrest);

    const rightArmrest = new THREE.Mesh(armrestGeometry, sofaMaterial);
    rightArmrest.position.set(1.5, 0.9, 0);
    rightArmrest.castShadow = true;
    sofaGroup.add(rightArmrest);

    // Cushions
    const cushionGeometry = new THREE.BoxGeometry(0.7, 0.3, 0.7);
    const cushionColors = [COLORS.accentColor1, COLORS.accentColor3];
    for (let i = 0; i < 2; i++) {
        const cushionMaterial = new THREE.MeshStandardMaterial({
            color: cushionColors[i],
            roughness: 0.95
        });
        const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
        cushion.position.set(-0.8 + i * 1.6, 1, 0.1);
        cushion.rotation.y = (Math.random() - 0.5) * 0.5;
        cushion.castShadow = true;
        sofaGroup.add(cushion);
    }

    sofaGroup.position.set(2, 0, 3);
    sofaGroup.rotation.y = Math.PI;
    scene.add(sofaGroup);
}

// Create a wooden rocking horse
function createWoodenHorse() {
    const horseGroup = new THREE.Group();
    const horseMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.horseColor,
        roughness: 0.6
    });

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.8, 8, 16);
    const body = new THREE.Mesh(bodyGeometry, horseMaterial);
    body.rotation.z = Math.PI / 2;
    body.position.y = 0.8;
    body.castShadow = true;
    horseGroup.add(body);

    // Head
    const headGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 8, 16);
    const head = new THREE.Mesh(headGeometry, horseMaterial);
    head.position.set(0.6, 1.2, 0);
    head.rotation.z = Math.PI / 4;
    head.castShadow = true;
    horseGroup.add(head);

    // Ears
    const earGeometry = new THREE.ConeGeometry(0.08, 0.15, 8);
    const leftEar = new THREE.Mesh(earGeometry, horseMaterial);
    leftEar.position.set(0.75, 1.5, -0.1);
    leftEar.rotation.z = -0.3;
    horseGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, horseMaterial);
    rightEar.position.set(0.75, 1.5, 0.1);
    rightEar.rotation.z = -0.3;
    horseGroup.add(rightEar);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6);
    const legPositions = [
        [-0.3, 0.3, -0.2],
        [-0.3, 0.3, 0.2],
        [0.3, 0.3, -0.2],
        [0.3, 0.3, 0.2]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, horseMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        horseGroup.add(leg);
    });

    // Rockers
    const rockerGeometry = new THREE.TorusGeometry(0.6, 0.05, 16, 100, Math.PI);
    const leftRocker = new THREE.Mesh(rockerGeometry, horseMaterial);
    leftRocker.position.set(0, 0.05, -0.2);
    leftRocker.rotation.x = Math.PI / 2;
    leftRocker.castShadow = true;
    horseGroup.add(leftRocker);

    const rightRocker = new THREE.Mesh(rockerGeometry, horseMaterial);
    rightRocker.position.set(0, 0.05, 0.2);
    rightRocker.rotation.x = Math.PI / 2;
    rightRocker.castShadow = true;
    horseGroup.add(rightRocker);

    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.1, 0.4, 8);
    const tailMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor2,
        roughness: 0.9
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.6, 0.9, 0);
    tail.rotation.z = Math.PI / 2;
    tail.rotation.y = Math.PI / 4;
    horseGroup.add(tail);

    // Mane
    const maneGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.15);
    const mane = new THREE.Mesh(maneGeometry, tailMaterial);
    mane.position.set(0.65, 1.4, 0);
    horseGroup.add(mane);

    horseGroup.position.set(-3, 0, 2);
    horseGroup.rotation.y = -Math.PI / 4;
    scene.add(horseGroup);
}

// Create rugs for floor decoration
function createRugs() {
    // Main rug
    const rugGeometry = new THREE.CircleGeometry(2, 32);
    const rugMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor1,
        roughness: 0.95
    });
    const rug = new THREE.Mesh(rugGeometry, rugMaterial);
    rug.rotation.x = -Math.PI / 2;
    rug.position.y = 0.01;
    rug.receiveShadow = true;
    scene.add(rug);

    // Small rug near bed
    const smallRugGeometry = new THREE.PlaneGeometry(1.5, 1);
    const smallRugMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor3,
        roughness: 0.95
    });
    const smallRug = new THREE.Mesh(smallRugGeometry, smallRugMaterial);
    smallRug.rotation.x = -Math.PI / 2;
    smallRug.position.set(-2, 0.02, -1.5);
    smallRug.receiveShadow = true;
    scene.add(smallRug);
}

// Create toy decorations
function createToys() {
    // Toy blocks
    const blockColors = [COLORS.accentColor1, COLORS.accentColor2, COLORS.accentColor3];
    for (let i = 0; i < 5; i++) {
        const blockGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const blockMaterial = new THREE.MeshStandardMaterial({
            color: blockColors[i % 3],
            roughness: 0.4
        });
        const block = new THREE.Mesh(blockGeometry, blockMaterial);
        block.position.set(
            -1 + Math.random() * 2,
            0.15 + i * 0.3,
            1 + Math.random() * 0.5
        );
        block.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        block.castShadow = true;
        scene.add(block);
    }

    // Toy ball
    const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.accentColor2,
        roughness: 0.3,
        metalness: 0.1
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-4, 0.25, 0);
    ball.castShadow = true;
    scene.add(ball);

    // Teddy bear
    createTeddyBear();
}

// Create a cute teddy bear
function createTeddyBear() {
    const teddyGroup = new THREE.Group();
    const teddyMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2691E,
        roughness: 0.95
    });

    // Body
    const bodyGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, teddyMaterial);
    body.scale.y = 1.3;
    body.castShadow = true;
    teddyGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const head = new THREE.Mesh(headGeometry, teddyMaterial);
    head.position.y = 0.4;
    head.castShadow = true;
    teddyGroup.add(head);

    // Ears
    const earGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const leftEar = new THREE.Mesh(earGeometry, teddyMaterial);
    leftEar.position.set(-0.15, 0.55, 0);
    teddyGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, teddyMaterial);
    rightEar.position.set(0.15, 0.55, 0);
    teddyGroup.add(rightEar);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.06, 0.25, 8, 16);
    const leftArm = new THREE.Mesh(armGeometry, teddyMaterial);
    leftArm.position.set(-0.25, 0.05, 0);
    leftArm.rotation.z = Math.PI / 4;
    teddyGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, teddyMaterial);
    rightArm.position.set(0.25, 0.05, 0);
    rightArm.rotation.z = -Math.PI / 4;
    teddyGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.08, 0.2, 8, 16);
    const leftLeg = new THREE.Mesh(legGeometry, teddyMaterial);
    leftLeg.position.set(-0.12, -0.35, 0);
    teddyGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, teddyMaterial);
    rightLeg.position.set(0.12, -0.35, 0);
    teddyGroup.add(rightLeg);

    teddyGroup.position.set(1.5, 1.3, 3);
    teddyGroup.rotation.y = Math.PI / 6;
    scene.add(teddyGroup);
}

// Create dynamic lighting
function createLighting() {
    // Ambient light - warm and soft
    const ambientLight = new THREE.AmbientLight(0xFFF8DC, 0.6);
    scene.add(ambientLight);

    // Main ceiling light
    const mainLight = new THREE.PointLight(0xFFE4B5, 1, 50);
    mainLight.position.set(0, 7, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    pointLights.push(mainLight);

    // Add glow sphere for main light
    const lightSphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const lightSphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFE0,
        transparent: true,
        opacity: 0.8
    });
    const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
    lightSphere.position.copy(mainLight.position);
    scene.add(lightSphere);

    // Warm corner lights
    const cornerLight1 = new THREE.PointLight(0xFFDAB9, 0.8, 20);
    cornerLight1.position.set(-5, 3, -5);
    cornerLight1.castShadow = true;
    scene.add(cornerLight1);
    pointLights.push(cornerLight1);

    const cornerLight2 = new THREE.PointLight(0xF4A460, 0.8, 20);
    cornerLight2.position.set(5, 3, 5);
    cornerLight2.castShadow = true;
    scene.add(cornerLight2);
    pointLights.push(cornerLight2);

    // Desk lamp light
    const deskLight = new THREE.SpotLight(0xFFFAF0, 0.5, 10, Math.PI / 6, 0.5);
    deskLight.position.set(3.8, 2.5, -4);
    deskLight.target.position.set(3, 1.5, -4);
    deskLight.castShadow = true;
    scene.add(deskLight);
    scene.add(deskLight.target);
    pointLights.push(deskLight);

    // Directional light for overall scene
    const dirLight = new THREE.DirectionalLight(0xFFF8DC, 0.4);
    dirLight.position.set(10, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    scene.add(dirLight);
}

// Setup audio for white noise
function setupAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API not supported');
    }
}

// Generate and play white noise
function playWhiteNoise() {
    if (!audioContext) return;

    // Create buffer for white noise
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    // Create source
    whiteNoiseNode = audioContext.createBufferSource();
    whiteNoiseNode.buffer = buffer;
    whiteNoiseNode.loop = true;

    // Create gain node for volume control
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1; // Low volume

    // Connect nodes
    whiteNoiseNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start playback
    whiteNoiseNode.start();
    isAudioPlaying = true;

    document.getElementById('audio-toggle').classList.add('active');
    document.getElementById('audio-toggle').textContent = '🔊 White Noise ON';
}

// Stop white noise
function stopWhiteNoise() {
    if (whiteNoiseNode) {
        whiteNoiseNode.stop();
        whiteNoiseNode = null;
        isAudioPlaying = false;

        document.getElementById('audio-toggle').classList.remove('active');
        document.getElementById('audio-toggle').textContent = '🔇 White Noise OFF';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Audio toggle
    document.getElementById('audio-toggle').addEventListener('click', () => {
        if (isAudioPlaying) {
            stopWhiteNoise();
        } else {
            playWhiteNoise();
        }
    });

    // Reset camera
    document.getElementById('reset-camera').addEventListener('click', () => {
        camera.position.set(8, 6, 8);
        camera.lookAt(0, 2, 0);
        controls.target.set(0, 2, 0);
        controls.update();
    });

    // Toggle lights
    document.getElementById('toggle-lights').addEventListener('click', () => {
        lightsOn = !lightsOn;
        pointLights.forEach(light => {
            light.intensity = lightsOn ? light.userData.originalIntensity || light.intensity : 0.2;
        });

        // Store original intensities
        if (lightsOn) {
            pointLights.forEach(light => {
                if (!light.userData.originalIntensity) {
                    light.userData.originalIntensity = light.intensity;
                }
            });
        }
    });

    // Window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Add subtle light pulsing for warmth
    const time = Date.now() * 0.001;
    if (pointLights[0]) {
        pointLights[0].intensity = 1 + Math.sin(time * 0.5) * 0.1;
    }

    // Render scene
    renderer.render(scene, camera);
}

// Start the application
window.addEventListener('load', init);
