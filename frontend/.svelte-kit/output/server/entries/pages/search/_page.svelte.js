import '../../../chunks/server.js';
import { t as PageTransition } from '../../../chunks/PageTransition.js';
//#region src/routes/search/+page.svelte
function _page($$renderer) {
	PageTransition($$renderer, {
		children: ($$renderer) => {
			$$renderer.push(`<div class="search-page"></div>`);
		},
		$$slots: { default: true },
	});
}
//#endregion
export { _page as default };
