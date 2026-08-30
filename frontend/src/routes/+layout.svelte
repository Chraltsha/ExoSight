<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { transitionState } from '$lib/transitionState.svelte.js';
	import StarBackground from '$lib/components/StarBackground.svelte';

	// Parallax strengths increase per layer — background is subtle, foreground layers pop more
	const LAYER_BASE       = 6;   // star-background.jpg  (furthest back)
	const LAYER_MID        = 14;  // star-layer2.png
	const LAYER_FRONT      = 24;  // star-layer3.png      (closest)

	let { children } = $props();

	const NAV_LINKS = [
		{ href: '/', label: 'home' },
		{ href: '/search', label: 'search' },
		{ href: '/about', label: 'about' }
	];

	const resolvedRoutes = NAV_LINKS.map((link) => resolve(link.href));

	onNavigate(({ from, to }) => {
		if (!from?.url || !to?.url) return;
		const fromIndex = resolvedRoutes.indexOf(from.url.pathname);
		const toIndex = resolvedRoutes.indexOf(to.url.pathname);
		if (fromIndex !== -1 && toIndex !== -1) {
			transitionState.direction = toIndex > fromIndex ? 1 : -1;
		}
		return new Promise((resolve) => setTimeout(resolve, 220));
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<StarBackground src="/star-background.jpg" strength={LAYER_BASE}  zIndex={-3} />
<StarBackground src="/star-layer2.png"      strength={LAYER_MID}   zIndex={-2} />
<StarBackground src="/star-layer3.png"      strength={LAYER_FRONT} zIndex={-1} />

<nav class="navigation-bar">
	{#each NAV_LINKS as link (link.href)}
		<a href={resolve(link.href)} class:active={page.url.pathname === resolve(link.href)}>
			{link.label}
		</a>
	{/each}
</nav>

<hr />

<div class="page-transition-wrapper">
	{@render children()}
</div>