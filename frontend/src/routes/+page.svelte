<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import homePageLogo from '$lib/assets/ExoSight_HomePage.svg';
	import { goto } from '$app/navigation';

	const navigateToSearch = () => goto('/search');
</script>

<PageTransition>
  <div class="home-content">
    <img src={homePageLogo} alt="ExoSight" class="home-title" />
    <h3 class="home-subtitle">
      See beyond our solar system,
      <span class="subtitle-break">one exoplanet at a time.</span>
    </h3>

    <div>
      <button class="home-searchbutton" onclick={navigateToSearch}>
        Search for Exoplanets  🔍︎
      </button>
    </div>
  </div>
</PageTransition>
