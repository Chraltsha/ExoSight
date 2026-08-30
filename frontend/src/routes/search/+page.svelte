<script>
	import { onMount } from 'svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import TelescopeSettings from '$lib/components/TelescopeSettings.svelte';
	import DateTimeSettings from '$lib/components/DateTimeSettings.svelte';
	import LocationSettings from '$lib/components/LocationSettings.svelte';
	import { searchState, searchPlanets, loadMorePlanets } from '$lib/exoplanetSearchState.svelte.js';

	// ── helpers for default date/time ───────────────────────────────────────────
	function todayDate() {
		const d = new Date();
		return d.toISOString().slice(0, 10);
	}

	function currentTime() {
		const d = new Date();
		return d.toTimeString().slice(0, 5);
	}

	// ── local page state ─────────────────────────────────────────────────────────
	let planetName = $state('');
	let showDropdown = $state(false);

	let hFov = $state(10);
	let vFov = $state(7);

	let date = $state(todayDate());
	let time = $state(currentTime());
	let observationLength = $state(60);

	let lat = $state(0);
	let lon = $state(0);

	let isLoading = $state(false);
	let llmOutput = $state('');

	// ── autocomplete handlers ────────────────────────────────────────────────────
	function handlePlanetInput() {
		if (planetName.length >= 2) {
			searchPlanets(planetName);
			showDropdown = true;
		} else {
			searchState.results = [];
			searchState.hasMore = false;
			showDropdown = false;
		}
	}

	function selectResult(item) {
		planetName = item.name;
		showDropdown = false;
	}

	function handleLoadMore() {
		loadMorePlanets(planetName);
	}

	// Close dropdown when clicking outside
	function handleWindowClick(e) {
		if (!e.target.closest('.planet-autocomplete-wrapper')) {
			showDropdown = false;
		}
	}

	onMount(() => {
		window.addEventListener('click', handleWindowClick);
		return () => window.removeEventListener('click', handleWindowClick);
	});

	// ── LLM stub ─────────────────────────────────────────────────────────────────

	// TODO: wire to real endpoint
	async function sendToLLM(payload) {
		await new Promise((r) => setTimeout(r, 1500));
		return `[Stub] Observation analysis for ${payload.planetName} at (${payload.lat.toFixed(2)}, ${payload.lon.toFixed(2)}) on ${payload.date} ${payload.time} for ${payload.observationLength} min. HFOV: ${payload.hFov}°, VFOV: ${payload.vFov}°.`;
	}

	async function handleSearch() {
		isLoading = true;
		llmOutput = '';
		const payload = { planetName, hFov, vFov, date, time, observationLength, lat, lon };
		llmOutput = await sendToLLM(payload);
		isLoading = false;
	}
</script>

<PageTransition>
	<main class="search-new-page">
		<!-- BODY ROW: left column (heading + autocomplete + 3 panels + button) + right output -->
		<div class="search-body-row">
			<!-- LEFT column -->
			<div class="search-inputs-col">
				<!-- Heading + autocomplete stacked at top of left col -->
				<h2 class="search-page-heading">What exoplanet are we looking for?</h2>

				<div class="planet-autocomplete-wrapper">
					<input
						type="text"
						class="search-field-input planet-name-input"
						placeholder="e.g. Kepler-22 b"
						bind:value={planetName}
						oninput={handlePlanetInput}
						onfocus={() => {
							if (searchState.results.length > 0) {
								showDropdown = true;
							}
						}}
						autocomplete="off"
					/>

					{#if showDropdown && (searchState.results.length > 0 || searchState.isLoading)}
						<div class="search-results">
							<ul class="search-results-list">
								{#if searchState.isLoading && searchState.results.length === 0}
									<li class="search-result-item" style="cursor: default; pointer-events: none;">
										<span class="result-name">Searching…</span>
									</li>
								{/if}
								{#each searchState.results as item (item.name)}
									<li>
										<button class="search-result-item" onclick={() => selectResult(item)}>
											<span class="result-name">{item.name}</span>
											<span class="result-host">{item.hostname}</span>
										</button>
									</li>
								{/each}
							</ul>
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

				<!-- Three settings panels -->
				<div class="search-three-col">
					<TelescopeSettings bind:hFov bind:vFov />
					<DateTimeSettings bind:date bind:time bind:observationLength />
					<LocationSettings bind:lat bind:lon />
				</div>

				<button class="search-submit-btn" onclick={handleSearch} disabled={isLoading}>
					{isLoading ? 'Analysing…' : 'Search'}
				</button>
			</div>

			<!-- RIGHT: Exosight output -->
			<div class="search-output-col">
				<div class="search-section search-output-section">
					<span class="exosight-label">Exosight says…</span>
					<div class="exosight-output-box">
						{#if isLoading}
							<div class="typing-indicator">
								<span class="dot"></span>
								<span class="dot"></span>
								<span class="dot"></span>
							</div>
						{:else if llmOutput}
							{llmOutput}
						{:else}
							<span class="exosight-placeholder"
								>Fill in the fields above and hit Search to get your observation report</span
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
</PageTransition>
