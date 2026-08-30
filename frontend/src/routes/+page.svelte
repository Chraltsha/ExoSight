<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import homePageLogo from '$lib/assets/ExoSight_HomePage.svg';
</script>

<PageTransition>
  <div class="home-content">
    <img src={homePageLogo} alt="ExoSight" class="home-title" />
    <h3 class="home-subtitle">
      See beyond our solar system,
      <span class="subtitle-break">one exoplanet at a time.</span>
    </h3>

    <div>
      <input class="home-searchbar" placeholder="Search for Exoplanets  🔍︎"/>
    </div>
  </div>
</PageTransition>
