<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
  import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	
	let { children } = $props();

	const routes = ['/home', '/friends', '/events'];
  let direction = $state(1);

  function updateDirection(targetRoute) {
    const currentPath = page.url.pathname;
    const resolvedRoutes = routes.map(r => resolve(r));
    const currentIndex = resolvedRoutes.indexOf(currentPath);
    const targetIndex = resolvedRoutes.indexOf(resolve(targetRoute));

    if (currentIndex !== -1 && targetIndex !== -1) {
      direction = targetIndex > currentIndex ? 1 : -1;
    }
  }
</script>

<nav class="navigation-bar">
	<a href={resolve("/")}
		class:active={page.url.pathname === resolve('/')}
		onclick={() => updateDirection('/')}
	>
		Home
	</a>
	<a href={resolve('/search')}
		class:active={page.url.pathname === resolve('/search')}
		onclick={() => updateDirection('/search')}
	>
		Search
	</a>
	<a href={resolve('/about')}
		class:active={page.url.pathname === resolve('/about')}
		onclick={() => updateDirection('/about')}
	>
		About
	</a>
</nav>

<hr/>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div 
	in:fly={{ x: direction * 300, duration: 300, delay: 150 }} 
	out:fly={{ x: direction * -300, duration: 300 }}
>
	{@render children()}
</div>

