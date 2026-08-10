<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<!--TODO: Implement navigation on top-->

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative w-full">
	{@render children()}
</div>

