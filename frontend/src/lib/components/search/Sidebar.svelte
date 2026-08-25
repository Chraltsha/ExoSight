<script>
	import { fly } from 'svelte/transition';

	let isOpen = $state(false);
</script>

<!-- Hover zone + pull-tab -->
<div
	class="sidebar-hover-zone"
	role="button"
	tabindex="0"
	aria-label="Open search settings"
	onkeydown={(e) => e.key === 'Enter' && (isOpen = true)}
	onclick={() => (isOpen = true)}
>
	<div class="pull-tab">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="9 18 15 12 9 6" />
		</svg>
	</div>
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
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
		</div>

		<div class="sidebar-content">
			<p class="sidebar-placeholder">Configuration options will appear here.</p>
		</div>
	</div>
{/if}
