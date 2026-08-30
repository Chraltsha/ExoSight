export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt","star-background.jpg","star-layer2.png","star-layer3.png"]),
	mimeTypes: {".txt":"text/plain",".jpg":"image/jpeg",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CcK1Qyyz.js",app:"_app/immutable/entry/app.DDr4hj4S.js",imports:["_app/immutable/entry/start.CcK1Qyyz.js","_app/immutable/chunks/Bh9z9wWx.js","_app/immutable/chunks/CCT0pYQH.js","_app/immutable/entry/app.DDr4hj4S.js","_app/immutable/chunks/CCT0pYQH.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
