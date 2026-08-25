<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let { children } = $props();

	const NAV_LINKS = [
		{ href: '/', label: 'Home' },
		{ href: '/search', label: 'Search' },
		{ href: '/about', label: 'About' }
	];

	const resolvedRoutes = NAV_LINKS.map((link) => resolve(link.href));

	let direction = $state(1);

	afterNavigate(({ from, to }) => {
		if (!from?.url || !to?.url) return;
		const fromIndex = resolvedRoutes.indexOf(from.url.pathname);
		const toIndex = resolvedRoutes.indexOf(to.url.pathname);
		if (fromIndex !== -1 && toIndex !== -1) {
			direction = toIndex > fromIndex ? 1 : -1;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navigation-bar">
	{#each NAV_LINKS as link (link.href)}
		<a href={resolve(link.href)} class:active={page.url.pathname === resolve(link.href)}>
			{link.label}
		</a>
	{/each}
</nav>

<hr />

<div in:fly={{ x: direction * 300, duration: 300, delay: 150 }} out:fly={{ x: direction * -300, duration: 300 }}>
	{@render children()}
</div>