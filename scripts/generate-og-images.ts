import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, type Browser } from 'playwright';

import { SITE_NAME } from '../src/constants/site.ts';
import { escapeHtml } from '../src/lib/escape_html.ts';
import { postOpenGraphImageName } from '../src/lib/open_graph_image.ts';
import {
	readPostFrontmatters,
	type PostFrontmatter,
} from './read_post_frontmatters.ts';

const OUTPUT_DIRECTORY = fileURLToPath(
	new URL('../public/og/posts/', import.meta.url)
);

const CARD_VIEWPORT = { width: 1280, height: 720 } as const;
const FONT_STYLESHEET_URL =
	'https://fonts.bunny.net/css?family=poppins:400,700';
const FONT_TIMEOUT_MS = 15_000;
const MAX_TAGS = 3;
const PNG_COMPRESSION_LEVEL = 9;
const PNG_COMPRESSION_EFFORT = 10;

function buildCardHtml(post: PostFrontmatter): string {
	const tags = post.tags.slice(0, MAX_TAGS);
	const publishedYear = post.publishedAt.getUTCFullYear();

	return `<!doctype html>
<html lang="${post.lang}">
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="${FONT_STYLESHEET_URL}" />
		<style>
			* { margin: 0; padding: 0; box-sizing: border-box; }
			body {
				width: ${CARD_VIEWPORT.width}px;
				height: ${CARD_VIEWPORT.height}px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 80px;
				font-family: Poppins, system-ui, sans-serif;
				color: #f8fafc;
				background:
					radial-gradient(ellipse 70% 80% at 15% 20%, rgba(56, 189, 248, 0.16), transparent 70%),
					radial-gradient(ellipse 60% 70% at 90% 90%, rgba(56, 189, 248, 0.08), transparent 70%),
					#020617;
			}
			.brand { display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
			.dot { width: 14px; height: 14px; border-radius: 999px; background: #38bdf8; box-shadow: 0 0 18px 4px rgba(56, 189, 248, 0.7); }
			h1 {
				font-size: 68px;
				font-weight: 700;
				line-height: 1.14;
				letter-spacing: -0.02em;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			.rule { width: 96px; height: 5px; margin-top: 36px; border-radius: 999px; background: #38bdf8; box-shadow: 0 0 14px 2px rgba(56, 189, 248, 0.6); }
			.footer { display: flex; align-items: center; justify-content: space-between; font-size: 24px; color: #94a3b8; }
			.tags { display: flex; gap: 14px; }
			.tag { padding: 8px 20px; border: 1px solid rgba(148, 163, 184, 0.45); border-radius: 999px; font-size: 22px; }
		</style>
	</head>
	<body>
		<div class="brand"><span class="dot"></span>${escapeHtml(SITE_NAME)}</div>
		<div>
			<h1>${escapeHtml(post.title)}</h1>
			<div class="rule"></div>
		</div>
		<div class="footer">
			<span>${publishedYear}</span>
			<div class="tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
		</div>
	</body>
</html>`;
}

async function renderCard(
	browser: Browser,
	post: PostFrontmatter
): Promise<void> {
	const imageName = postOpenGraphImageName(post.lang, post.urlSlug);
	const page = await browser.newPage({ viewport: CARD_VIEWPORT });

	try {
		await page.setContent(buildCardHtml(post), { waitUntil: 'load' });
		await page.waitForFunction(() => document.fonts.ready.then(() => true), {
			timeout: FONT_TIMEOUT_MS,
		});

		const screenshot = await page.screenshot({ type: 'png' });
		const optimizedCard = await sharp(screenshot)
			.png({
				compressionLevel: PNG_COMPRESSION_LEVEL,
				effort: PNG_COMPRESSION_EFFORT,
			})
			.toBuffer();
		await writeFile(path.join(OUTPUT_DIRECTORY, imageName), optimizedCard);
		console.log(
			`[ok] ${post.lang}/${post.urlSlug} -> public/og/posts/${imageName}`
		);
	} finally {
		await page.close();
	}
}

async function main(): Promise<void> {
	const posts = await readPostFrontmatters();
	await mkdir(OUTPUT_DIRECTORY, { recursive: true });

	const browser = await chromium.launch();
	try {
		for (const post of posts) {
			await renderCard(browser, post);
		}
	} finally {
		await browser.close();
	}

	console.log(`[done] ${posts.length} OpenGraph images generated`);
}

await main();
