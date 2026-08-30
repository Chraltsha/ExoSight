<script>
	import { onMount } from 'svelte';

	/** @type {{ lat: number, lon: number }} */
	let { lat = $bindable(0), lon = $bindable(0) } = $props();

	/** @type {HTMLDivElement | null} */
	let mapEl = $state(null);

	// Track whether a marker drag is currently updating lat/lon so $effect
	// doesn't loop back and move the marker again.
	let dragging = false;

	/** @type {import('leaflet').Map | null} */
	let map = null;
	/** @type {import('leaflet').Marker | null} */
	let marker = null;

	onMount(async () => {
		// Dynamically import Leaflet (browser only, SSR-safe)
		const [{ default: L }] = await Promise.all([
			import('leaflet'),
			import('leaflet/dist/leaflet.css'),
		]);

		// 1. Attempt geolocation; fall back to random coords on error/denial
		const position = await new Promise((resolve) => {
			if (!navigator.geolocation) {
				resolve(null);
				return;
			}
			navigator.geolocation.getCurrentPosition(
				(pos) => resolve(pos),
				() => resolve(null),
				{ timeout: 8000 },
			);
		});

		if (position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
		} else {
			lat = Math.random() * 120 - 60;
			lon = Math.random() * 360 - 180;
		}

		// 2. Build the Leaflet map
		map = L.map(mapEl).setView([lat, lon], 5);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		// 3. Draggable marker
		marker = L.marker([lat, lon], { draggable: true }).addTo(map);

		marker.on('dragstart', () => {
			dragging = true;
		});

		marker.on('dragend', () => {
			const pos = marker.getLatLng();
			lat = parseFloat(pos.lat.toFixed(6));
			lon = parseFloat(pos.lng.toFixed(6));
			dragging = false;
		});

		return () => {
			map?.remove();
			map = null;
			marker = null;
		};
	});

	// Watch lat/lon changes from the number inputs and move the marker.
	// Guard: skip when the change originated from a marker drag.
	$effect(() => {
		const _lat = lat;
		const _lon = lon;
		if (dragging) {
			return;
		}
		if (!map || !marker) {
			return;
		}
		marker.setLatLng([_lat, _lon]);
		map.setView([_lat, _lon]);
	});
</script>

<div class="search-section">
	<span class="search-section-label">Location</span>
	<div class="search-section-fields">
		<label class="search-field-label">
			Latitude
			<input
				class="search-field-input"
				type="number"
				min="-90"
				max="90"
				step="0.000001"
				bind:value={lat}
			/>
		</label>
		<label class="search-field-label">
			Longitude
			<input
				class="search-field-input"
				type="number"
				min="-180"
				max="180"
				step="0.000001"
				bind:value={lon}
			/>
		</label>
	</div>
	<div class="location-map" bind:this={mapEl}></div>
</div>
