<script>
	import PageTransition from '$lib/components/PageTransition.svelte';

	/* ============================================================
	   EDIT THIS ARRAY ONLY — the list renders itself automatically.
	   Add, remove, or change entries and the layout (icon left/right,
	   alternating) updates on its own.
	   ============================================================ */

	let people = [
		{ name: 'Justin Kenneth Co', email: 'justinkennethco@gmail.com', linkedin: 'linkedin.com/justin-kenneth-co', github: 'github.com/Chraltsha', image: '/team/kenneth.png' },
		{ name: 'Martin Darius Alba', email: 'albamartindarius@gmail.com', linkedin: 'linkedin.com/martin-darius-alba', github: 'github.com/LegitAgent', image: '/team/alba.png' },
		{ name: 'Kolleen Geri Aguilar', email: 'kolleenaguilar@gmail.com', linkedin: 'linkedin.com/kolleen-geri-aguilar', github: 'github.com/kolleengeri', image: '/team/kolleen.png' },
		{ name: 'Jerold Luther Aquino', email: 'lutherjerold@gmail.com', linkedin: 'linkedin.com/aquino-jerold', github: 'github.com/DyloreAquino', image: '/team/jerold.png' },
	];
</script>

<PageTransition>
	<main class="about-main">
		{#each people as p, i (p.email)}
			<div class="about-row {i % 2 === 0 ? 'left' : 'right'}">
			<div class="about-avatar">
				<img src={p.image} alt={p.name} />
				</div>
				<div class="about-card">
					<p class="about-name">{p.name}</p>
					<div class="about-meta">
						<a class="about-meta-link" href="mailto:{p.email}">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="2" y="4" width="20" height="16" rx="2" />
								<path d="M2 6l10 7 10-7" />
							</svg>
							{p.email}
						</a>
						<a class="about-meta-link" href="https://{p.linkedin}" target="_blank" rel="noopener noreferrer">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8.5 8h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.8c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.77-2.6 3.6V23h-4V8z" />
							</svg>
							{p.linkedin}
						</a>
						<a class="about-meta-link" href="https://{p.github}" target="_blank" rel="noopener noreferrer">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.25.8-.57v-2c-3.2.7-3.9-1.55-3.9-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .32.21.68.8.56A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
							</svg>
							{p.github}
						</a>
					</div>
				</div>
			</div>
		{/each}
	</main>
</PageTransition>