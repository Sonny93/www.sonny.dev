const CANVAS_SELECTOR = '#space-background';
const STAR_COUNT = 700;
const DEPTH = 2000;
const REFRESH_SAMPLE_FRAME_COUNT = 10;
const HIGH_REFRESH_HZ_THRESHOLD = 90;
const MID_REFRESH_HZ_THRESHOLD = 50;
const HIGH_TIER_FRAMES_PER_SECOND = 60;
const MID_TIER_FRAMES_PER_SECOND = 30;
const LOW_TIER_FRAMES_PER_SECOND = 24;
const MAX_STAR_RADIUS = 500;
const FULL_TURN_RADIANS = Math.PI * 2;
const BACKGROUND_COLOR = '#030b1a';
const STAR_COLOR_RGB = '224, 234, 255';
const CAMERA_FIELD_OF_VIEW_DEGREES = 75;
const NEAR_DISTANCE = 0.5;
const POINT_RADIUS_FALLOFF = 300;
const MIN_POINT_RADIUS = 0.5;
const MAX_POINT_RADIUS = 3;
const MIN_ALPHA = 0.08;
const MAX_ALPHA = 0.95;
const IDLE_WARP_SPEED = 20;
const NAVIGATION_WARP_SPEED = 400;
const WARP_RESET_DELAY_MS = 850;
const WARP_EASING_FACTOR = 0.12;
const MAX_DELTA_SECONDS = 0.1;
const MILLISECONDS_PER_SECOND = 1000;

/**
 * Star positions encode polar coordinates instead of screen coordinates:
 * radius from center, angle, and a z-phase offset (0..DEPTH). Screen
 * position and size are re-derived from these every frame, so animating
 * a star is just advancing its z-phase — no per-star state mutation.
 */
type Star = {
	radius: number;
	angle: number;
	zPhase: number;
};

type WarpState = {
	currentSpeed: number;
	targetSpeed: number;
	accumulatedTime: number;
	lastRenderTimestamp: number;
};

function createStars(): readonly Star[] {
	return Array.from({ length: STAR_COUNT }, () => ({
		radius: Math.sqrt(Math.random()) * MAX_STAR_RADIUS,
		angle: Math.random() * FULL_TURN_RADIANS,
		zPhase: Math.random() * DEPTH,
	}));
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

function listenForResize(canvas: HTMLCanvasElement): void {
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Samples raw `requestAnimationFrame` deltas (no throttling) to estimate the
 * device's real refresh rate, so the render loop can target it instead of a
 * single fixed rate for every device.
 */
function measureRefreshRate(onMeasured: (measuredHz: number) => void): void {
	let sampledFrameCount = 0;
	let firstSampleTimestamp = 0;

	function sampleFrame(timestamp: number): void {
		if (sampledFrameCount === 0) {
			firstSampleTimestamp = timestamp;
		}
		sampledFrameCount += 1;

		if (sampledFrameCount < REFRESH_SAMPLE_FRAME_COUNT) {
			requestAnimationFrame(sampleFrame);
			return;
		}

		const elapsedMs = timestamp - firstSampleTimestamp;
		const measuredHz =
			(MILLISECONDS_PER_SECOND * (REFRESH_SAMPLE_FRAME_COUNT - 1)) /
			elapsedMs;
		onMeasured(measuredHz);
	}

	requestAnimationFrame(sampleFrame);
}

function pickTargetFramesPerSecond(measuredHz: number): number {
	if (measuredHz >= HIGH_REFRESH_HZ_THRESHOLD) return HIGH_TIER_FRAMES_PER_SECOND;
	if (measuredHz >= MID_REFRESH_HZ_THRESHOLD) return MID_TIER_FRAMES_PER_SECOND;
	return LOW_TIER_FRAMES_PER_SECOND;
}

function drawStar(
	context: CanvasRenderingContext2D,
	star: Star,
	uTime: number,
	focalLength: number,
	centerX: number,
	centerY: number,
	halfHeight: number
): void {
	const depthPosition = Math.min(
		-((star.zPhase + uTime) % DEPTH),
		-NEAR_DISTANCE
	);
	const distance = -depthPosition;
	const scale = (focalLength / distance) * halfHeight;

	const screenX = centerX + Math.cos(star.angle) * star.radius * scale;
	const screenY = centerY - Math.sin(star.angle) * star.radius * scale;
	const pointRadius = clamp(
		POINT_RADIUS_FALLOFF / distance,
		MIN_POINT_RADIUS,
		MAX_POINT_RADIUS
	);
	const alpha = clamp(1 - distance / DEPTH, MIN_ALPHA, MAX_ALPHA);

	context.beginPath();
	context.fillStyle = `rgba(${STAR_COLOR_RGB}, ${alpha})`;
	context.arc(screenX, screenY, pointRadius, 0, FULL_TURN_RADIANS);
	context.fill();
}

function runAnimationLoop(
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	stars: readonly Star[],
	warpState: WarpState,
	frameIntervalMs: number
): void {
	const focalLength =
		1 / Math.tan((CAMERA_FIELD_OF_VIEW_DEGREES * Math.PI) / 360);
	// Fixed at init so window resizes reframe the field (recentering) instead
	// of rescaling it — a live canvas.height would otherwise make every star
	// jump the instant the viewport height changes.
	const scaleReferenceHalfHeight = canvas.height / 2;

	function renderFrame(timestamp: number): void {
		requestAnimationFrame(renderFrame);

		const elapsedMs = timestamp - warpState.lastRenderTimestamp;
		if (elapsedMs < frameIntervalMs) return;

		const deltaSeconds = Math.min(
			elapsedMs / MILLISECONDS_PER_SECOND,
			MAX_DELTA_SECONDS
		);
		warpState.lastRenderTimestamp = timestamp;

		warpState.currentSpeed +=
			(warpState.targetSpeed - warpState.currentSpeed) * WARP_EASING_FACTOR;
		warpState.accumulatedTime += warpState.currentSpeed * deltaSeconds;

		context.fillStyle = BACKGROUND_COLOR;
		context.fillRect(0, 0, canvas.width, canvas.height);

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		for (const star of stars) {
			drawStar(
				context,
				star,
				warpState.accumulatedTime,
				focalLength,
				centerX,
				centerY,
				scaleReferenceHalfHeight
			);
		}
	}

	renderFrame(0);
}

let isInitialized = false;

/**
 * Initializes the starfield exactly once per full page load. The canvas is
 * marked `transition:persist`, so the element — and its animation loop and
 * every listener — survives view-transition navigations; only the warp
 * trigger reacts to them.
 */
function initializeSpaceBackground(): void {
	if (isInitialized) return;

	const canvas = document.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
	if (!canvas) return;

	const context = canvas.getContext('2d');
	if (!context) return;

	isInitialized = true;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const stars = createStars();
	const warpState: WarpState = {
		currentSpeed: IDLE_WARP_SPEED,
		targetSpeed: IDLE_WARP_SPEED,
		accumulatedTime: 0,
		lastRenderTimestamp: 0,
	};

	listenForNavigationWarp(warpState);
	listenForResize(canvas);

	const measurementStartTime = performance.now();
	measureRefreshRate((measuredHz) => {
		const measurementDurationMs = performance.now() - measurementStartTime;
		const targetFramesPerSecond = pickTargetFramesPerSecond(measuredHz);
		console.log(
			`[space-background] refresh rate measured: ${measuredHz.toFixed(1)}Hz, target: ${targetFramesPerSecond}fps, took: ${measurementDurationMs.toFixed(1)}ms`
		);
		const frameIntervalMs = MILLISECONDS_PER_SECOND / targetFramesPerSecond;
		runAnimationLoop(context, canvas, stars, warpState, frameIntervalMs);
	});
}

document.addEventListener('astro:page-load', initializeSpaceBackground);
