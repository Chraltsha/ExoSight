import { b as attr } from "../../chunks/server.js";
import { t as PageTransition } from "../../chunks/PageTransition.js";
//#region src/lib/assets/ExoSight_HomePage.svg
var ExoSight_HomePage_default = "/_app/immutable/assets/ExoSight_HomePage.Deqo8-YQ.svg";
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer) {
	PageTransition($$renderer, {
		children: ($$renderer) => {
			$$renderer.push(`<div class="home-content"><img${attr("src", ExoSight_HomePage_default)} alt="ExoSight" class="home-title"/> <h3 class="home-subtitle">See beyond our solar system, <span class="subtitle-break">one exoplanet at a time.</span></h3> <div><input class="home-searchbar" placeholder="Search for Exoplanets  🔍︎"/></div></div>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
