export const index = 4;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/search/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/4.Bz2MNqvY.js',
	'_app/immutable/chunks/DT5cZCHx.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/DVdPPOhL.js',
	'_app/immutable/chunks/BujJ8cV-.js',
];
export const stylesheets = [];
export const fonts = [];
