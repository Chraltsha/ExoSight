export const index = 0;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/0.7PTipjmf.js',
	'_app/immutable/chunks/DT5cZCHx.js',
	'_app/immutable/chunks/D5ASwX6m.js',
	'_app/immutable/chunks/xihTtKlq.js',
	'_app/immutable/chunks/BTah0wwC.js',
	'_app/immutable/chunks/1gcw06x5.js',
	'_app/immutable/chunks/BujJ8cV-.js',
];
export const stylesheets = ['_app/immutable/assets/0.C2dHITtw.css'];
export const fonts = [];
