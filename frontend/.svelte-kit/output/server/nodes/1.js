export const index = 1;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/1.BodvHXIp.js',
	'_app/immutable/chunks/CCT0pYQH.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/o6Geo_rG.js',
	'_app/immutable/chunks/DUe5Sd0z.js',
];
export const stylesheets = [];
export const fonts = [];
