<script>
	/** @type {{ date: string, time: string, observationLength: number }} */
	let { date = $bindable(''), time = $bindable(''), observationLength = $bindable(60) } = $props();
</script>

<div class="search-section">
	<span class="search-section-label">Date &amp; Time</span>
	<div class="search-section-fields">
		<label class="search-field-label">
			Date
			<input class="search-field-input" type="date" bind:value={date} />
		</label>
		<label class="search-field-label">
			Time
			<input class="search-field-input" type="time" bind:value={time} />
		</label>
		<label class="search-field-label">
			Observation Length (min)
			<input class="search-field-input" type="number" min="1" bind:value={observationLength} />
		</label>
	</div>
</div>
