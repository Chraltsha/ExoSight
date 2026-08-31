import './server.js';
import './transitionState.svelte.js';
//#region src/lib/components/PageTransition.svelte
function PageTransition($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		$$renderer.push(`<div class="h-full">`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { PageTransition as t };
