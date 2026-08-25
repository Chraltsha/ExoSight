<script>
	import { fly } from 'svelte/transition';

	let isOpen = $state(false);
	let isHovering = $state(false);
</script>

<!-- Hover zone + pull-tab -->
<div
	class="sidebar-hover-zone"
	class:sidebar-hover-zone--hovered={isHovering}
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
	role="button"
	tabindex="0"
	aria-label="Open search settings"
	onkeydown={(e) => e.key === 'Enter' && (isOpen = true)}
	onclick={() => (isOpen = true)}
>
	<div class="pull-tab" class:pull-tab--visible={isHovering || isOpen}>›</div>
</div>

<!-- Sidebar panel -->
{#if isOpen}
	<div
		class="sidebar-panel"
		in:fly={{ x: -320, duration: 300 }}
		out:fly={{ x: -320, duration: 300 }}
	>
		<div class="sidebar-header">
			<span class="sidebar-title">Search Settings</span>
			<button class="sidebar-close" onclick={() => (isOpen = false)} aria-label="Close sidebar">
				‹
			</button>
		</div>

		<div class="sidebar-content">
			<p class="sidebar-placeholder">Configuration options will appear here.</p>
		</div>
	</div>
{/if}
