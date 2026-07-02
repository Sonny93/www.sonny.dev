import * as THREE from 'three';

const CANVAS_SELECTOR = '#space-background';
const STAR_COUNT = 700;
const DEPTH = 2000.0;
const TARGET_FRAMES_PER_SECOND = 24;
const FRAME_INTERVAL_MS = 1000 / TARGET_FRAMES_PER_SECOND;
const MAX_STAR_RADIUS = 500;
const FULL_TURN_RADIANS = Math.PI * 2;
const CLEAR_COLOR = 0x030b1a;
const CAMERA_FIELD_OF_VIEW_DEGREES = 75;
const CAMERA_NEAR_PLANE = 0.1;
const IDLE_WARP_SPEED = 20;
const NAVIGATION_WARP_SPEED = 400;
const WARP_RESET_DELAY_MS = 850;
const WARP_EASING_FACTOR = 0.12;
const MAX_DELTA_SECONDS = 0.1;
const MILLISECONDS_PER_SECOND = 1000;

/**
 * Star positions encode polar coordinates instead of world coordinates:
 * position.x = radius from center, position.y = angle (radians),
 * position.z = z-phase offset (0..DEPTH). All animation is computed on
 * the GPU — zero CPU array writes per frame.
 */
const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying float vAlpha;

  void main() {
    float z = -mod(position.z + uTime, ${DEPTH.toFixed(1)});
    z = min(z, -0.5);

    float r = position.x;
    float a = position.y;
    vec3 pos = vec3(cos(a) * r, sin(a) * r, z);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;

    gl_PointSize = clamp(600.0 / dist, 1.0, 6.0);
    vAlpha = clamp(1.0 - dist / ${DEPTH.toFixed(1)}, 0.08, 0.95);

    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vAlpha;

  void main() {
    vec2 cxy = gl_PointCoord - 0.5;
    float dist = length(cxy);
    if (dist > 0.5) discard;

    float alpha = vAlpha * (1.0 - dist * 1.8);
    gl_FragColor = vec4(0.878, 0.918, 1.0, alpha);
  }
`;

type WarpState = {
	currentSpeed: number;
	targetSpeed: number;
	accumulatedTime: number;
	lastRenderTimestamp: number;
};

function createRenderer(
	canvas: HTMLCanvasElement
): THREE.WebGLRenderer | undefined {
	try {
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: false,
			powerPreference: 'low-power',
		});
		renderer.setPixelRatio(1);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(CLEAR_COLOR);
		return renderer;
	} catch {
		return undefined;
	}
}

/**
 * Builds a single-draw-call geometry whose position attribute encodes
 * (radius, angle, zOffset) per star.
 */
function createStarGeometry(): THREE.BufferGeometry {
	const positions = new Float32Array(STAR_COUNT * 3);
	for (let starIndex = 0; starIndex < STAR_COUNT; starIndex++) {
		positions[starIndex * 3] = Math.sqrt(Math.random()) * MAX_STAR_RADIUS;
		positions[starIndex * 3 + 1] = Math.random() * FULL_TURN_RADIANS;
		positions[starIndex * 3 + 2] = Math.random() * DEPTH;
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	return geometry;
}

function createStarMaterial(
	timeUniform: THREE.IUniform<number>
): THREE.ShaderMaterial {
	return new THREE.ShaderMaterial({
		vertexShader: VERTEX_SHADER,
		fragmentShader: FRAGMENT_SHADER,
		uniforms: { uTime: timeUniform },
		transparent: true,
		depthWrite: false,
	});
}

function createStarField(timeUniform: THREE.IUniform<number>): THREE.Points {
	const starField = new THREE.Points(
		createStarGeometry(),
		createStarMaterial(timeUniform)
	);
	starField.frustumCulled = false;
	return starField;
}

/**
 * Ramps the warp speed up when a view-transition navigation starts
 * (`astro:before-preparation` fires before any request is made), then
 * eases back to idle after the same fixed delay the Inertia version used.
 */
function listenForNavigationWarp(warpState: WarpState): void {
	document.addEventListener('astro:before-preparation', () => {
		warpState.targetSpeed = NAVIGATION_WARP_SPEED;
		setTimeout(() => {
			warpState.targetSpeed = IDLE_WARP_SPEED;
		}, WARP_RESET_DELAY_MS);
	});
}

function listenForResize(
	camera: THREE.PerspectiveCamera,
	renderer: THREE.WebGLRenderer
): void {
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}

function runAnimationLoop(
	renderer: THREE.WebGLRenderer,
	scene: THREE.Scene,
	camera: THREE.PerspectiveCamera,
	timeUniform: THREE.IUniform<number>,
	warpState: WarpState
): void {
	function renderFrame(timestamp: number): void {
		requestAnimationFrame(renderFrame);

		const elapsedMs = timestamp - warpState.lastRenderTimestamp;
		if (elapsedMs < FRAME_INTERVAL_MS) return;

		const deltaSeconds = Math.min(
			elapsedMs / MILLISECONDS_PER_SECOND,
			MAX_DELTA_SECONDS
		);
		warpState.lastRenderTimestamp = timestamp;

		warpState.currentSpeed +=
			(warpState.targetSpeed - warpState.currentSpeed) * WARP_EASING_FACTOR;
		warpState.accumulatedTime += warpState.currentSpeed * deltaSeconds;
		timeUniform.value = warpState.accumulatedTime;

		renderer.render(scene, camera);
	}

	renderFrame(0);
}

function createCamera(): THREE.PerspectiveCamera {
	return new THREE.PerspectiveCamera(
		CAMERA_FIELD_OF_VIEW_DEGREES,
		window.innerWidth / window.innerHeight,
		CAMERA_NEAR_PLANE,
		DEPTH
	);
}

let isInitialized = false;

/**
 * Initializes the starfield exactly once per full page load. The canvas is
 * marked `transition:persist`, so the element — and its WebGL context, the
 * animation loop, and every listener — survives view-transition navigations;
 * only the warp trigger reacts to them.
 */
function initializeSpaceBackground(): void {
	if (isInitialized) return;

	const canvas = document.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
	if (!canvas) return;

	const renderer = createRenderer(canvas);
	if (!renderer) return;

	isInitialized = true;

	const scene = new THREE.Scene();
	const camera = createCamera();
	const timeUniform: THREE.IUniform<number> = { value: 0 };
	scene.add(createStarField(timeUniform));

	const warpState: WarpState = {
		currentSpeed: IDLE_WARP_SPEED,
		targetSpeed: IDLE_WARP_SPEED,
		accumulatedTime: 0,
		lastRenderTimestamp: 0,
	};

	listenForNavigationWarp(warpState);
	listenForResize(camera, renderer);
	runAnimationLoop(renderer, scene, camera, timeUniform, warpState);
}

document.addEventListener('astro:page-load', initializeSpaceBackground);
