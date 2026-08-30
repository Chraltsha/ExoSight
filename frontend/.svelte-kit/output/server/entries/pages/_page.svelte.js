import { x as attr } from "../../chunks/server.js";
import "../../chunks/navigation.js";
import { t as PageTransition } from "../../chunks/PageTransition.js";
//#region src/lib/assets/ExoSight_HomePage.svg
var ExoSight_HomePage_default = "/_app/immutable/assets/ExoSight_HomePage.CEWTj95M.svg";
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		PageTransition($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="home-content"><img${attr("src", ExoSight_HomePage_default)} alt="ExoSight" class="home-title"/> <h3 class="home-subtitle">See beyond our solar system, <span class="subtitle-break">one exoplanet at a time.</span></h3> <div><button class="home-searchbutton">Search for Exoplanets 🔍︎</button></div></div>`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
export { _page as default };
