import "../../../chunks/server.js";
import { t as PageTransition } from "../../../chunks/PageTransition.js";
//#region src/routes/about/+page.svelte
function _page($$renderer) {
	PageTransition($$renderer, {
		children: ($$renderer) => {
			$$renderer.push(`<h1>About us</h1>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
