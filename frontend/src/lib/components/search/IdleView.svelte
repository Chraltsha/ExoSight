<script>
	import { searchState, searchPlanets, loadMorePlanets } from '$lib/exoplanetSearchState.svelte.js';

	/**
	 * Called by the parent (+page.svelte) when the user confirms a planet selection.
	 * Receives the full result object so the page has RA/Dec without re-fetching.
	 *
	 * @type {{ onSelect: (planet: { name: string, hostname: string, ra: number, dec: number }) => void }}
	 */
	let { onSelect } = $props();

	let inputValue = $state('');

	/** @type {ReturnType<typeof setTimeout> | null} */
	let debounceTimer = null;

	const DEBOUNCE_MS = 350;
	const MIN_CHARS = 2;

	function handleInput() {
		clearTimeout(debounceTimer);

		if (inputValue.length < MIN_CHARS) {
			searchState.results = [];
			searchState.hasMore = false;
			searchState.nextCursor = null;
			searchState.error = null;
			return;
		}

		debounceTimer = setTimeout(() => {
			searchPlanets(inputValue.trim());
		}, DEBOUNCE_MS);
	}

	function handleKeydown(event) {
		if (event.key !== 'Enter') return;
		event.preventDefault(); // stop any native form submission

		if (searchState.results.length > 0) {
			// Results already loaded — select the first one
			onSelect(searchState.results[0]);
		} else if (inputValue.trim().length >= MIN_CHARS) {
			// No results yet — cancel debounce and search immediately
			clearTimeout(debounceTimer);
			searchPlanets(inputValue.trim());
		}
	}

	function handleSelect(planet) {
		onSelect(planet);
	}

	function handleLoadMore() {
		loadMorePlanets(inputValue.trim());
	}
</script>

<div class="idle-view">
	<h2 class="idle-heading">What exoplanet are you looking for?</h2>

	<div class="search-input-wrapper">
		<div class="search-input-row">
			<input
				class="idle-searchbar"
				type="text"
				placeholder="e.g. Kepler-22 b, TRAPPIST-1 b, HD 209458 b..."
				bind:value={inputValue}
				oninput={handleInput}
				onkeydown={handleKeydown}
			/>
			{#if searchState.isLoading}
				<span class="search-spinner" aria-label="Searching"></span>
			{/if}
		</div>

		{#if searchState.error}
			<p class="search-status search-status--error">{searchState.error}</p>
		{/if}

		{#if searchState.results.length > 0}
			<div class="search-results">
				<!-- Scrollable planet list — capped at ~5 rows -->
				<ul class="search-results-list">
					{#each searchState.results as planet (planet.name)}
						<li>
							<button class="search-result-item" onclick={() => handleSelect(planet)}>
								<span class="result-name">{planet.name}</span>
								<span class="result-host">{planet.hostname}</span>
							</button>
						</li>
					{/each}
				</ul>

				<!-- Load more pinned below the scroll area, never inside it -->
				{#if searchState.hasMore}
					<div class="search-results-footer">
						<button
							class="load-more-btn"
							onclick={handleLoadMore}
							disabled={searchState.isLoading}
						>
							{searchState.isLoading ? 'Loading…' : 'Load more'}
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
