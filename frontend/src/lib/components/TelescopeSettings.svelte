<script>
	/** @type {{ hFov: number, vFov: number }} */
	let { hFov = $bindable(10), vFov = $bindable(7) } = $props();
</script>

<div class="search-section">
	<span class="search-section-label">Telescope Settings</span>
	<div class="search-section-fields">
		<label class="search-field-label">
			Horizontal FOV (°)
			<input class="search-field-input" type="number" min="0" step="0.1" bind:value={hFov} />
		</label>
		<label class="search-field-label">
			Vertical FOV (°)
			<input class="search-field-input" type="number" min="0" step="0.1" bind:value={vFov} />
		</label>
	</div>
</div>
