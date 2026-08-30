export const index = 3;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/3.Ck7sQ94i.js',
	'_app/immutable/chunks/DT5cZCHx.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/DVdPPOhL.js',
	'_app/immutable/chunks/BujJ8cV-.js',
];
export const stylesheets = [];
export const fonts = [];
