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
const WARP_ACCELERATION_DURATION_MS = 450;
const WARP_DECELERATION_DURATION_MS = 900;
// Floor on how long the warp stays up before decelerating, so a fast page
// load (astro:page-load firing almost immediately) still shows the effect.
const WARP_MIN_VISIBLE_DURATION_MS = 500;
const ARRIVAL_WARP_SPEED = 600;
const ARRIVAL_EASE_DURATION_MS = 1800;
const STREAK_DURATION_SECONDS = 0.05;
const STREAK_ALPHA_FACTOR = 0.6;
const STREAK_WIDTH_FACTOR = 1.5;
const STREAK_MAX_LENGTH_PX = 120;
// Below this, only idle drift is happening — draw plain dots so streaks
// only appear during an actual warp transition (nav or arrival dive).
const STREAK_VISIBILITY_SPEED_THRESHOLD = IDLE_WARP_SPEED * 2;
const MAX_DELTA_SECONDS = 0.1;
const MILLISECONDS_PER_SECOND = 1000;
const DEGREES_PER_HALF_TURN = 180;

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

/**
 * `currentSpeed` is derived each frame by easing from `easeStartSpeed` to
 * `easeTargetSpeed` over `easeDurationMs`, starting at `easeStartTimestamp` —
 * a time-based ease (see `easeInOutCubic`) rather than a per-frame lerp, so
 * the curve looks the same regardless of the device's render fps tier.
 */
type WarpState = {
	currentSpeed: number;
	easeStartSpeed: number;
	easeTargetSpeed: number;
	easeStartTimestamp: number;
	easeDurationMs: number;
	accumulatedTime: number;
	lastRenderTimestamp: number;
};

/**
 * Camera + canvas framing needed to project a star to screen space.
 * `halfHeight` is fixed at animation start (see `runAnimationLoop`) so
 * resizes reframe the field instead of rescaling it.
 */
type Viewport = {
	focalLength: number;
	centerX: number;
	centerY: number;
	halfHeight: number;
};

type StarProjection = {
	screenX: number;
	screenY: number;
	pointRadius: number;
	alpha: number;
};

function createStars(): readonly Star[] {
	return Array.from({ length: STAR_COUNT }, () => ({
		radius: Math.sqrt(Math.random()) * MAX_STAR_RADIUS,
		angle: Math.random() * FULL_TURN_RADIANS,
		zPhase: Math.random() * DEPTH,
	}));
}

function lerp(start: number, end: number, progress: number): number {
	return start + (end - start) * progress;
}

function easeInOutCubic(progress: number): number {
	return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}

function wrapDepth(value: number): number {
	return ((value % DEPTH) + DEPTH) % DEPTH;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

function createIdleWarpState(): WarpState {
	return {
		currentSpeed: IDLE_WARP_SPEED,
		easeStartSpeed: IDLE_WARP_SPEED,
		easeTargetSpeed: IDLE_WARP_SPEED,
		easeStartTimestamp: 0,
		easeDurationMs: 1,
		accumulatedTime: 0,
		lastRenderTimestamp: 0,
	};
}

/**
 * Starts (or redirects, mid-flight) a timed ease of the warp speed toward
 * `targetSpeed`. Snapshotting the current interpolated speed as the new
 * ease's start means back-to-back triggers (e.g. rapid navigation) never
 * jump — they just redirect smoothly from wherever the curve currently is.
 */
function setWarpTarget(
	warpState: WarpState,
	targetSpeed: number,
	durationMs: number,
	timestamp: number
): void {
	warpState.easeStartSpeed = warpState.currentSpeed;
	warpState.easeTargetSpeed = targetSpeed;
	warpState.easeStartTimestamp = timestamp;
	warpState.easeDurationMs = durationMs;
}

/**
 * Kicks off the "arrival" dive: starts at warp speed and eases down to
 * idle, so streaks are long on load and shrink to dots as it settles.
 */
function startArrivalDive(warpState: WarpState): void {
	warpState.currentSpeed = ARRIVAL_WARP_SPEED;
	warpState.easeStartSpeed = ARRIVAL_WARP_SPEED;
	warpState.easeTargetSpeed = IDLE_WARP_SPEED;
	warpState.easeStartTimestamp = performance.now();
	warpState.easeDurationMs = ARRIVAL_EASE_DURATION_MS;
}

/**
 * Ramps the warp speed up as soon as a view-transition navigation starts
 * (`astro:before-preparation` fires before any request is made), and eases
 * back to idle on `astro:page-load` — the event Astro dispatches once the
 * new page has actually finished loading, so the effect stays in sync with
 * real load time instead of guessing a fixed duration. A fast load is
 * topped up to `WARP_MIN_VISIBLE_DURATION_MS` so the effect is never too
 * brief to notice.
 */
function listenForNavigationWarp(warpState: WarpState): void {
	let isNavigating = false;
	let navigationStartTimestamp = 0;

	document.addEventListener('astro:before-preparation', () => {
		isNavigating = true;
		navigationStartTimestamp = performance.now();
		setWarpTarget(
			warpState,
			NAVIGATION_WARP_SPEED,
			WARP_ACCELERATION_DURATION_MS,
			navigationStartTimestamp
		);
	});

	document.addEventListener('astro:page-load', () => {
		if (!isNavigating) return;
		isNavigating = false;

		const elapsedMs = performance.now() - navigationStartTimestamp;
		const remainingMs = Math.max(WARP_MIN_VISIBLE_DURATION_MS - elapsedMs, 0);

		setTimeout(() => {
			setWarpTarget(
				warpState,
				IDLE_WARP_SPEED,
				WARP_DECELERATION_DURATION_MS,
				performance.now()
			);
		}, remainingMs);
	});
}

function listenForResize(canvas: HTMLCanvasElement): void {
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
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
			(MILLISECONDS_PER_SECOND * (REFRESH_SAMPLE_FRAME_COUNT - 1)) / elapsedMs;
		onMeasured(measuredHz);
	}

	requestAnimationFrame(sampleFrame);
}

function pickTargetFramesPerSecond(measuredHz: number): number {
	if (measuredHz >= HIGH_REFRESH_HZ_THRESHOLD)
		return HIGH_TIER_FRAMES_PER_SECOND;
	if (measuredHz >= MID_REFRESH_HZ_THRESHOLD) return MID_TIER_FRAMES_PER_SECOND;
	return LOW_TIER_FRAMES_PER_SECOND;
}

function logRefreshRateMeasurement(
	measuredHz: number,
	targetFramesPerSecond: number,
	measurementDurationMs: number
): void {
	console.log(
		`[space-background] refresh rate measured: ${measuredHz.toFixed(1)}Hz, target: ${targetFramesPerSecond}fps, took: ${measurementDurationMs.toFixed(1)}ms`
	);
}

function computeFocalLength(fieldOfViewDegrees: number): number {
	return (
		1 / Math.tan((fieldOfViewDegrees * Math.PI) / (2 * DEGREES_PER_HALF_TURN))
	);
}

function projectStar(
	star: Star,
	uTime: number,
	viewport: Viewport
): StarProjection {
	const depthPosition = Math.min(
		-wrapDepth(star.zPhase + uTime),
		-NEAR_DISTANCE
	);
	const distance = -depthPosition;
	const scale = (viewport.focalLength / distance) * viewport.halfHeight;

	const screenX = viewport.centerX + Math.cos(star.angle) * star.radius * scale;
	const screenY = viewport.centerY - Math.sin(star.angle) * star.radius * scale;
	const pointRadius = clamp(
		POINT_RADIUS_FALLOFF / distance,
		MIN_POINT_RADIUS,
		MAX_POINT_RADIUS
	);
	const alpha = clamp(1 - distance / DEPTH, MIN_ALPHA, MAX_ALPHA);

	return { screenX, screenY, pointRadius, alpha };
}

/**
 * Clamps how far the tail can sit from the head in screen space. Without
 * this, stars near the vanishing point (tiny distance, huge scale) draw
 * streaks far longer than everything else on screen — capping the length
 * keeps every streak reading at the same intensity regardless of depth.
 */
function clampStreakTail(
	head: StarProjection,
	tail: StarProjection
): { screenX: number; screenY: number } {
	const deltaX = head.screenX - tail.screenX;
	const deltaY = head.screenY - tail.screenY;
	const length = Math.hypot(deltaX, deltaY);
	if (length <= STREAK_MAX_LENGTH_PX) {
		return tail;
	}

	const lengthScale = STREAK_MAX_LENGTH_PX / length;
	return {
		screenX: head.screenX - deltaX * lengthScale,
		screenY: head.screenY - deltaY * lengthScale,
	};
}

function drawStreak(
	context: CanvasRenderingContext2D,
	star: Star,
	head: StarProjection,
	uTime: number,
	warpSpeed: number,
	viewport: Viewport
): void {
	const trailUTime = uTime - warpSpeed * STREAK_DURATION_SECONDS;
	const tail = clampStreakTail(head, projectStar(star, trailUTime, viewport));

	context.beginPath();
	context.moveTo(tail.screenX, tail.screenY);
	context.lineTo(head.screenX, head.screenY);
	context.lineWidth = head.pointRadius * STREAK_WIDTH_FACTOR;
	context.lineCap = 'round';
	context.strokeStyle = `rgba(${STAR_COLOR_RGB}, ${head.alpha * STREAK_ALPHA_FACTOR})`;
	context.stroke();
}

function drawStarHead(
	context: CanvasRenderingContext2D,
	head: StarProjection
): void {
	context.beginPath();
	context.fillStyle = `rgba(${STAR_COLOR_RGB}, ${head.alpha})`;
	context.arc(
		head.screenX,
		head.screenY,
		head.pointRadius,
		0,
		FULL_TURN_RADIANS
	);
	context.fill();
}

/**
 * Draws each star as a bright head, plus — only while warp speed is above
 * idle cruising (i.e. during a nav transition or the arrival dive) — a dim
 * comet streak trailing back to where it was `STREAK_DURATION_SECONDS` ago.
 * At idle speed it's always a plain dot.
 */
function drawStar(
	context: CanvasRenderingContext2D,
	star: Star,
	uTime: number,
	warpSpeed: number,
	viewport: Viewport
): void {
	const head = projectStar(star, uTime, viewport);

	if (warpSpeed > STREAK_VISIBILITY_SPEED_THRESHOLD) {
		drawStreak(context, star, head, uTime, warpSpeed, viewport);
	}

	drawStarHead(context, head);
}

function clearCanvas(
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement
): void {
	context.fillStyle = BACKGROUND_COLOR;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFrame(
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	stars: readonly Star[],
	warpState: WarpState,
	viewport: Viewport
): void {
	clearCanvas(context, canvas);

	for (const star of stars) {
		drawStar(
			context,
			star,
			warpState.accumulatedTime,
			warpState.currentSpeed,
			viewport
		);
	}
}

function isFrameTooSoon(
	timestamp: number,
	lastRenderTimestamp: number,
	frameIntervalMs: number
): boolean {
	return timestamp - lastRenderTimestamp < frameIntervalMs;
}

function computeDeltaSeconds(
	timestamp: number,
	lastRenderTimestamp: number
): number {
	return Math.min(
		(timestamp - lastRenderTimestamp) / MILLISECONDS_PER_SECOND,
		MAX_DELTA_SECONDS
	);
}

function advanceWarpState(
	warpState: WarpState,
	timestamp: number,
	deltaSeconds: number
): void {
	const easeProgress = clamp(
		(timestamp - warpState.easeStartTimestamp) / warpState.easeDurationMs,
		0,
		1
	);
	warpState.currentSpeed = lerp(
		warpState.easeStartSpeed,
		warpState.easeTargetSpeed,
		easeInOutCubic(easeProgress)
	);
	warpState.accumulatedTime += warpState.currentSpeed * deltaSeconds;
}

function runAnimationLoop(
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	stars: readonly Star[],
	warpState: WarpState,
	frameIntervalMs: number
): void {
	const focalLength = computeFocalLength(CAMERA_FIELD_OF_VIEW_DEGREES);
	// Fixed at init so window resizes reframe the field (recentering) instead
	// of rescaling it — a live canvas.height would otherwise make every star
	// jump the instant the viewport height changes.
	const scaleReferenceHalfHeight = canvas.height / 2;

	startArrivalDive(warpState);

	function renderFrame(timestamp: number): void {
		requestAnimationFrame(renderFrame);

		if (
			isFrameTooSoon(timestamp, warpState.lastRenderTimestamp, frameIntervalMs)
		)
			return;

		const deltaSeconds = computeDeltaSeconds(
			timestamp,
			warpState.lastRenderTimestamp
		);
		warpState.lastRenderTimestamp = timestamp;
		advanceWarpState(warpState, timestamp, deltaSeconds);

		const viewport: Viewport = {
			focalLength,
			centerX: canvas.width / 2,
			centerY: canvas.height / 2,
			halfHeight: scaleReferenceHalfHeight,
		};

		drawFrame(context, canvas, stars, warpState, viewport);
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
	const warpState = createIdleWarpState();

	listenForNavigationWarp(warpState);
	listenForResize(canvas);

	const measurementStartTime = performance.now();
	measureRefreshRate((measuredHz) => {
		const measurementDurationMs = performance.now() - measurementStartTime;
		const targetFramesPerSecond = pickTargetFramesPerSecond(measuredHz);
		logRefreshRateMeasurement(
			measuredHz,
			targetFramesPerSecond,
			measurementDurationMs
		);

		const frameIntervalMs = MILLISECONDS_PER_SECOND / targetFramesPerSecond;
		runAnimationLoop(context, canvas, stars, warpState, frameIntervalMs);
	});
}

document.addEventListener('astro:page-load', initializeSpaceBackground);
