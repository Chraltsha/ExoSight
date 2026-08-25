<script>
	/** @type {{ onSubmit: (query: string) => void }} */
	let { onSubmit } = $props();

	let inputValue = $state('');

	function handleKeydown(event) {
		if (event.key === 'Enter' && inputValue.trim()) {
			onSubmit(inputValue.trim());
		}
	}

	function handleSurpriseMe() {
		onSubmit('Tell me about a random exoplanet');
	}
</script>

<div class="idle-view">
	<h2 class="idle-heading">What exoplanet are you looking for?</h2>

	<input
		class="idle-searchbar"
		type="text"
		placeholder="e.g. Kepler-22b, hot Jupiters, habitable zone..."
		bind:value={inputValue}
		onkeydown={handleKeydown}
	/>

	<button class="surprise-btn" onclick={handleSurpriseMe}>
		Surprise me
	</button>
</div>
