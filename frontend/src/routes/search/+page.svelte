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
	let elevation = $state(0);

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

	// ── prediction pipeline ───────────────────────────────────────────────────────

	// Planet name: letters, digits, spaces, hyphens, dots, +, apostrophes — max 100 chars
	const PLANET_NAME_RE = /^[\w\s\-.+'']{1,100}$/;

	async function handleSearch() {
		const trimmed = planetName.trim();

		if (!trimmed) {
			llmOutput = 'Please enter a planet name.';
			return;
		}

		if (!PLANET_NAME_RE.test(trimmed)) {
			llmOutput = 'Planet name contains invalid characters.';
			return;
		}

		isLoading = true;
		llmOutput = '';

		// Build observation_time from the date + time fields (treated as UTC)
		const observationTime = new Date(`${date}T${time}:00Z`).toISOString();

		// exposure_duration in seconds
		const exposureDuration = observationLength * 60;

		try {
			const res = await fetch('/api/predict/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					observer: {
						latitude: lat,
						longitude: lon,
						elevation: elevation,
					},
					observation_time: observationTime,
					exposure_duration: exposureDuration,
					target: {
						object_name: trimmed,
					},
					fov: {
						horizontal: hFov,
						vertical: vFov,
					},
				}),
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: res.statusText }));
				if (res.status === 404) {
					llmOutput = `Planet "${trimmed}" was not found in the NASA Exoplanet Archive.`;
				} else {
					llmOutput = `Error ${res.status}: ${err.detail ?? 'Unknown error'}`;
				}
				return;
			}

			const data = await res.json();
			llmOutput = data.interpretation ?? (data.obstructed
				? `${data.satellites.length} satellite(s) will obstruct your observation.`
				: 'No satellite interference detected.');
		} catch (err) {
			llmOutput = `Network error: ${err.message}`;
		} finally {
			isLoading = false;
		}
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
					<!-- input row: icon stays anchored to just the input, not the dropdown -->
					<div class="planet-input-row">
						<svg
							class="planet-search-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="11" cy="11" r="7" />
							<line x1="16.5" y1="16.5" x2="22" y2="22" />
						</svg>
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
					</div>

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
					<LocationSettings bind:lat bind:lon bind:elevation />
				</div>
			</div>

			<!-- RIGHT: Exosight output (search button on top) -->
			<div class="search-output-col">
				<button class="search-submit-btn" onclick={handleSearch} disabled={isLoading}>
					<!-- planet/orbit icon -->
					<svg
						class="search-btn-icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="4" />
						<ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(-30 12 12)" />
					</svg>
					{isLoading ? 'Analysing…' : 'Search'}
				</button>
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
