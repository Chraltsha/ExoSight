<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { fly } from 'svelte/transition';

  let { children } = $props();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/about', label: 'About' }
  ];

  let direction = $state(1);
  let navEl = $state();
  let indicatorStyle = $state('');

  const resolvedHrefs = links.map(l => resolve(l.href));
  const activeIndex = $derived.by(() => {
    const i = resolvedHrefs.indexOf(page.url.pathname);
    return i === -1 ? 0 : i;
  });

  function goTo(i) {
    direction = i > activeIndex ? 1 : -1;
  }

  $effect(() => {
    activeIndex;
    if (!navEl) return;
    const el = navEl.querySelectorAll('a')[activeIndex];
    if (el) indicatorStyle = `width:${el.offsetWidth}px; transform: translateX(${el.offsetLeft}px);`;
  });
</script>

<nav class="navigation-bar" bind:this={navEl}>
  {#each links as link, i (link.href)}
    <a href={resolve(link.href)} class:active={activeIndex === i} onclick={() => goTo(i)}>
      {link.label}
    </a>
  {/each}
  <div class="nav-indicator" style={indicatorStyle}></div>
</nav>

<hr class="mt-px mb-0 border-t border-current" />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div in:fly={{ x: direction * 300, duration: 300, delay: 150 }} out:fly={{ x: direction * -300, duration: 300 }}>
  {@render children()}
</div>