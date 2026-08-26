<script>
	/**
	 * @param {string} src        - Path to the image (served from /static)
	 * @param {number} strength   - How many px the layer shifts at full mouse travel
	 * @param {number} zIndex     - Stacking order (more negative = further back)
	 */
	let { src, strength = 8, zIndex = -1 } = $props();

	let offsetX = $state(0);
	let offsetY = $state(0);

	function handleMouseMove(event) {
		// Normalise mouse position to [-1, +1] relative to viewport centre
		const cx = (event.clientX / window.innerWidth  - 0.5) * 2;
		const cy = (event.clientY / window.innerHeight - 0.5) * 2;

		offsetX = cx * strength;
		offsetY = cy * strength;
	}
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="parallax-layer" aria-hidden="true" style="z-index: {zIndex};">
	<img
		class="parallax-layer__image"
		{src}
		alt=""
		style="transform: translate({offsetX}px, {offsetY}px) scale(1.2);"
	/>
</div>

<style>
	.parallax-layer {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.parallax-layer__image {
		width: 180%;
		height: 130%;
		margin: -5% 0 0 0;
		object-fit: cover;
		will-change: transform;
		transition: transform 0.12s ease-out;
		filter: brightness(80%);
	}
</style>
