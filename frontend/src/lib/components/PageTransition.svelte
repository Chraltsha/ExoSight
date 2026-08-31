<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { transitionState } from '$lib/transitionState.svelte.js';

	let { children } = $props();

	const inOpts = (x) => ({ x, duration: 220, easing: cubicOut, delay: 30 });
	const outOpts = (x) => ({ x, duration: 220, easing: cubicOut });
</script>

<div
	class="h-full"
	in:fly={inOpts(transitionState.direction * 300)}
	out:fly={outOpts(transitionState.direction * -300)}
>
	{@render children()}
</div>
