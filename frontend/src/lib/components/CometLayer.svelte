<script>
	import { onMount } from 'svelte';

	/**
	 * @param {number} minDelay  - Minimum ms between comets (inclusive)
	 * @param {number} maxDelay  - Maximum ms between comets (inclusive)
	 */
	let { minDelay = 4000, maxDelay = 12000 } = $props();

	/** @type {{ id: number; startX: number; startY: number }[]} */
	let comets = $state([]);
	let nextId = 0;

	// Each comet lives for exactly this long before being removed from the DOM
	const COMET_DURATION_MS = 2200;

	function spawnComet() {
		const id = nextId++;

		// Start randomly along the top edge OR the left edge so the comet
		// always travels from top-left quadrant toward bottom-right.
		// startX: -10vw … 60vw  (negative = off-screen left)
		// startY: -10vh … 50vh
		const startX = Math.random() * 70 - 10; // vw
		const startY = Math.random() * 60 - 10; // vh

		comets.push({ id, startX, startY });

		// Clean up after the animation finishes
		setTimeout(() => {
			comets = comets.filter((c) => c.id !== id);
		}, COMET_DURATION_MS + 100);
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
	<img
		src="/comet.webp"
		alt=""
		aria-hidden="true"
		class="comet"
		style="
			--start-x: {comet.startX}vw;
			--start-y: {comet.startY}vh;
			--duration: {COMET_DURATION_MS}ms;
		"
	/>
{/each}

<style>
	.comet {
		position: fixed;
		/* Size — tweak here to make it bigger/smaller */
		width: 180px;
		height: auto;
		pointer-events: none;
		z-index: 0;
		/* Start at the randomised position */
		top: var(--start-y);
		left: var(--start-x);
		/* Slight clockwise tilt to match the diagonal travel direction */
		transform-origin: top left;
		animation: comet-fly var(--duration) ease-in forwards;
	}

	@keyframes comet-fly {
		0% {
			opacity: 0;
			transform: rotate(30deg) translate(0, 0);
		}
		8% {
			opacity: 0.9;
		}
		85% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
			/* Travel about 80vw right + 80vh down */
			transform: rotate(30deg) translate(80vw, 80vh);
		}
	}
</style>
