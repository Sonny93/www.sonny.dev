import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STAR_COUNT = 700;
const DEPTH = 2000.0;
const FRAME_INTERVAL = 1000 / 24; // 24fps cap

// position.x = radius from center
// position.y = angle (radians)
// position.z = z-phase offset (0..DEPTH)
// All animation computed on GPU — zero CPU array writes per frame
const VERT = /* glsl */ `
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

const FRAG = /* glsl */ `
  varying float vAlpha;

  void main() {
    vec2 cxy = gl_PointCoord - 0.5;
    float dist = length(cxy);
    if (dist > 0.5) discard;

    float alpha = vAlpha * (1.0 - dist * 1.8);
    gl_FragColor = vec4(0.878, 0.918, 1.0, alpha);
  }
`;

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x030b1a);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, DEPTH);

    // Single draw call — position attribute encodes (radius, angle, zOffset)
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = Math.sqrt(Math.random()) * 500; // radius
      positions[i * 3 + 1] = Math.random() * Math.PI * 2; // angle
      positions[i * 3 + 2] = Math.random() * DEPTH; // z-phase
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false; // positions encode custom data, not world coords
    scene.add(points);

    // Warp speed
    let warpSpeed = 20; // units/sec
    let targetWarpSpeed = 20;
    let accTime = 0;
    let lastRenderTime = 0;

    const onInertiaStart = () => {
      targetWarpSpeed = 400;
      setTimeout(() => { targetWarpSpeed = 20; }, 850);
    };
    document.addEventListener('inertia:start', onInertiaStart);

    let animId: number;
    function animate(ts: number) {
      animId = requestAnimationFrame(animate);

      const elapsed = ts - lastRenderTime;
      if (elapsed < FRAME_INTERVAL) return;

      const dt = Math.min(elapsed / 1000, 0.1);
      lastRenderTime = ts;

      warpSpeed += (targetWarpSpeed - warpSpeed) * 0.12;
      accTime += warpSpeed * dt;
      mat.uniforms.uTime.value = accTime;

      renderer.render(scene, camera);
    }
    animate(0);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('inertia:start', onInertiaStart);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden
    />
  );
}
