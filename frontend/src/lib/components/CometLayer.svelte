<script>
	import { onMount } from 'svelte';

	/**
	 * @param {number} minDelay      - Minimum ms between comets (inclusive)
	 * @param {number} maxDelay      - Maximum ms between comets (inclusive)
	 * @param {number} fadeOffsetX   - Extra px to shift the GIF spawn point horizontally
	 * @param {number} fadeOffsetY   - Extra px to shift the GIF spawn point vertically
	 * @param {number} fadeZoomScale - Multiplier applied to the computed GIF position (1 = no change, 0.8 = treat as if zoom were 80%)
	 */
	let {
		minDelay = 4000,
		maxDelay = 12000,
		fadeOffsetX = 0,
		fadeOffsetY = 0,
		fadeZoomScale = 1,
	} = $props();

	/**
	 * @typedef {{
	 *   id: number;
	 *   startX: number; startY: number;  // px — converted from vw/vh at spawn time
	 *   spawnedAt: number;               // performance.now() when spawned
	 *   clicked: boolean;
	 *   fadeX: number; fadeY: number;    // px position for the GIF
	 * }} Comet
	 */
	/** @type {Comet[]} */
	let comets = $state([]);
	let nextId = 0;

	// How long the fly animation lasts (original 2200ms slowed to 0.6×)
	const COMET_DURATION_MS = 3667;

	// How long comet_fade.gif takes to play one full cycle
	const FADE_GIF_DURATION_MS = 1800;

	// Fixed-pixel travel — identical diagonal on every screen size/shape
	const TRAVEL_X_PX = 1200;
	const TRAVEL_Y_PX = 900;

	// Rendered comet image width (must match CSS .comet width)
	const COMET_WIDTH_PX = 180;

	// Rotation angle used in the CSS keyframe
	const ROTATION_DEG = 30;

	// Returns the current CSS zoom factor (e.g. 0.8 when html { zoom: 80% })
	function getCssZoom() {
		return parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
	}

	function spawnComet() {
		const id = nextId++;

		// position: fixed lives in zoomed CSS px space.
		// innerWidth/Height are in real px, so multiply by zoom to get zoomed px.
		const zoom = getCssZoom();
		const startX = ((Math.random() * 90 - 10) * window.innerWidth * zoom) / 100;
		const startY = ((Math.random() * 10 - 12) * window.innerHeight * zoom) / 100;

		comets.push({
			id,
			startX,
			startY,
			spawnedAt: performance.now(),
			clicked: false,
			fadeX: 0,
			fadeY: 0,
		});

		// Auto-remove after fly animation finishes (only if not clicked)
		setTimeout(() => {
			comets = comets.filter((c) => c.id !== id || c.clicked);
		}, COMET_DURATION_MS + 100);
	}

	/**
	 * @param {number} id
	 */
	function handleClick(id) {
		const idx = comets.findIndex((c) => c.id === id);
		if (idx === -1 || comets[idx].clicked) {
			return;
		}

		const comet = comets[idx];

		// How far through the animation are we? (0 → 1)
		const progress = Math.min((performance.now() - comet.spawnedAt) / COMET_DURATION_MS, 1);

		// All CSS px values (fixed positions, translate, width) live in zoomed space.
		// TRAVEL_X/Y_PX are the raw keyframe values — also in zoomed CSS px.
		// comet.startX/Y were stored in zoomed px at spawn time.
		// So all arithmetic here is consistently in zoomed CSS px — no conversion needed.
		const rad = (ROTATION_DEG * Math.PI) / 180;
		const cosR = Math.cos(rad);
		const sinR = Math.sin(rad);

		// Rotated translation vector (zoomed CSS px)
		const tx = progress * TRAVEL_X_PX;
		const ty = progress * TRAVEL_Y_PX;
		const rotTx = tx * cosR - ty * sinR;
		const rotTy = tx * sinR + ty * cosR;

		// Top-left of the image in zoomed CSS px
		const tlX = comet.startX + rotTx;
		const tlY = comet.startY + rotTy;

		// Bottom-right corner: rotate the width vector by the same angle
		const brX = tlX + COMET_WIDTH_PX * cosR;
		const brY = tlY + COMET_WIDTH_PX * sinR;

		comets[idx].clicked = true;
		comets[idx].fadeX = brX * fadeZoomScale + fadeOffsetX;
		comets[idx].fadeY = brY * fadeZoomScale + fadeOffsetY;

		// Remove after the GIF finishes playing
		setTimeout(() => {
			comets = comets.filter((c) => c.id !== id);
		}, FADE_GIF_DURATION_MS);
	}

	function scheduleNext() {
		const delay = minDelay + Math.random() * (maxDelay - minDelay);
		setTimeout(() => {
			spawnComet();
			scheduleNext();
		}, delay);
	}

	onMount(() => {
		scheduleNext();
	});
</script>

{#each comets as comet (comet.id)}
	{#if comet.clicked}
		<!-- Cache-bust src so the browser always starts the GIF from frame 1 -->
		<img
			src="/comet_fade.gif?t={comet.id}"
			alt=""
			aria-hidden="true"
			class="comet-fade"
			style="left: {comet.fadeX}px; top: {comet.fadeY}px;"
		/>
	{:else}
		<img
			src="/comet.webp"
			alt=""
			aria-hidden="true"
			class="comet"
			role="button"
			tabindex="-1"
			style="
				--start-x: {comet.startX}px;
				--start-y: {comet.startY}px;
				--duration: {COMET_DURATION_MS}ms;
			"
			onclick={() => handleClick(comet.id)}
		/>
	{/if}
{/each}

<style>
	.comet {
		position: fixed;
		width: 180px;
		height: auto;
		/* Larger hit area without affecting visual size */
		padding: 24px;
		box-sizing: content-box;
		pointer-events: auto;
		cursor: pointer;
		z-index: 9999;
		top: var(--start-y);
		left: var(--start-x);
		transform-origin: top left;
		animation: comet-fly var(--duration) ease-in forwards;
	}

	@keyframes comet-fly {
		0% {
			opacity: 0;
			transform: rotate(30deg) translate(0px, 0px);
		}
		8% {
			opacity: 0.9;
		}
		85% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
			/* Fixed px travel — same diagonal on every screen size */
			transform: rotate(30deg) translate(1200px, 900px);
		}
	}

	.comet-fade {
		position: fixed;
		width: 180px;
		height: auto;
		pointer-events: none;
		z-index: 9999;
		transform-origin: top left;
		transform: rotate(30deg);
		animation: comet-fade-out 1800ms ease-in forwards;
	}

	@keyframes comet-fade-out {
		0% {
			opacity: 1;
		}
		60% {
			opacity: 0.8;
		}
		100% {
			opacity: 0;
		}
	}
</style>
