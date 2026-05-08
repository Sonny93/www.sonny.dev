import { useEffect, useRef } from 'react';

interface Star {
	x: number;
	y: number;
	r: number;
	baseOpacity: number;
	phase: number;
	speed: number;
}

function generateStars(w: number, h: number, count: number): Star[] {
	return Array.from({ length: count }, () => ({
		x: Math.random() * w,
		y: Math.random() * h,
		r: Math.random() * 1.2 + 0.3,
		baseOpacity: Math.random() * 0.5 + 0.2,
		phase: Math.random() * Math.PI * 2,
		speed: Math.random() * 0.0008 + 0.0003,
	}));
}

export function Starfield({ count = 180 }: { count?: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		let stars: Star[] = [];

		function resize() {
			canvas!.width = window.innerWidth;
			canvas!.height = window.innerHeight;
			stars = generateStars(canvas!.width, canvas!.height, count);
		}

		function draw(time: number) {
			ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

			for (const s of stars) {
				const twinkle = Math.sin(time * s.speed + s.phase) * 0.3 + 0.7;
				const opacity = s.baseOpacity * twinkle;

				ctx!.beginPath();
				ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(255,255,255,${opacity})`;
				if (s.r > 1) {
					ctx!.shadowBlur = 6;
					ctx!.shadowColor = 'rgba(200,215,255,0.9)';
				}
				ctx!.fill();
				ctx!.shadowBlur = 0;
			}

			animId = requestAnimationFrame(draw);
		}

		resize();
		window.addEventListener('resize', resize);
		animId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	}, [count]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'fixed',
				inset: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				zIndex: 0,
			}}
			aria-hidden
		/>
	);
}
