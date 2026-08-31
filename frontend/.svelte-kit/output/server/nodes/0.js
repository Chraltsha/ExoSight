export const index = 0;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/0.Bo-uPbBZ.js',
	'_app/immutable/chunks/CCT0pYQH.js',
	'_app/immutable/chunks/DUe5Sd0z.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/o6Geo_rG.js',
	'_app/immutable/chunks/CKszHoE5.js',
	'_app/immutable/chunks/CS3UNDLJ.js',
];
export const stylesheets = ['_app/immutable/assets/0.LpSKhGQx.css'];
export const fonts = [];
