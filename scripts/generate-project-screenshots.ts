import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, type Browser } from 'playwright';

import { projects, type Project } from '../src/data/projects.ts';

const OUTPUT_DIRECTORY = fileURLToPath(
	new URL('../public/projects/', import.meta.url)
);

const ASPECT_RATIO = 16 / 9;
const SCREENSHOT_WIDTH = 1280;
const SCREENSHOT_VIEWPORT = {
	width: SCREENSHOT_WIDTH,
	height: Math.round(SCREENSHOT_WIDTH / ASPECT_RATIO),
} as const;
const NAVIGATION_TIMEOUT_MS = 15_000;
const RENDER_SETTLE_DELAY_MS = 1_000;
const WEBP_QUALITY = 80;

async function screenshotProject(
	browser: Browser,
	project: Project
): Promise<void> {
	if (!project.url) {
		console.warn(
			`[skip] ${project.name}: no live URL, placeholder will be used`
		);
		return;
	}

	const page = await browser.newPage({
		viewport: SCREENSHOT_VIEWPORT,
		colorScheme: 'dark',
	});

	try {
		const response = await page.goto(project.url, {
			waitUntil: 'networkidle',
			timeout: NAVIGATION_TIMEOUT_MS,
		});

		if (response && !response.ok()) {
			throw new Error(`page responded with status ${response.status()}`);
		}

		await page.waitForTimeout(RENDER_SETTLE_DELAY_MS);

		const screenshotBuffer = await page.screenshot({ type: 'png' });
		const webpBuffer = await sharp(screenshotBuffer)
			.resize({ width: SCREENSHOT_VIEWPORT.width })
			.webp({ quality: WEBP_QUALITY })
			.toBuffer();

		const outputPath = path.join(OUTPUT_DIRECTORY, project.thumbnailUrl);
		await mkdir(path.dirname(outputPath), { recursive: true });
		await writeFile(outputPath, webpBuffer);

		console.log(
			`[ok] ${project.name} -> public/projects/${project.thumbnailUrl}`
		);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`[fail] ${project.name}: ${reason}, placeholder will be used`);
	} finally {
		await page.close();
	}
}

async function main(): Promise<void> {
	const browser = await chromium.launch();

	try {
		for (const project of projects) {
			await screenshotProject(browser, project);
		}
	} finally {
		await browser.close();
	}
}

await main();
