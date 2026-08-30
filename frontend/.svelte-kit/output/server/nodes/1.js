export const index = 1;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/1.DK0g-8HQ.js',
	'_app/immutable/chunks/DT5cZCHx.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/BTah0wwC.js',
	'_app/immutable/chunks/D5ASwX6m.js',
];
export const stylesheets = [];
export const fonts = [];
