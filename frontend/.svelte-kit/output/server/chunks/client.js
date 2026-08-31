import { t as index_server_exports } from './index-server.js';
import { _ as noop } from './shared.js';
import { c as initial_base, s as base } from './internal.js';
import './internal2.js';
import { h as add_data_suffix, s as resolve_route } from './exports.js';
import { T as writable, at as noop$1 } from './server.js';
import '@sveltejs/kit/internal';
import { try_get_request_store } from '@sveltejs/kit/internal/server';
//#region node_modules/@sveltejs/kit/src/runtime/app/paths/server.js
/** @type {import('./client.js').resolve} */
function resolve(id, params) {
	if (!id.startsWith('/'))
		throw new Error(
			`Cannot use \`resolve(...)\` with a non-absolute pathname or route ID (got "${id}"). \`resolve\` is only for internal pathnames and route IDs; external URLs should be used directly.`,
		);
	const resolved = resolve_route(id, params);
	{
		const store = try_get_request_store();
		if (store && !store.state.prerendering?.fallback)
			return (
				((store.event.isDataRequest
					? add_data_suffix(store.event.url.pathname)
					: store.event.url.pathname
				)
					.slice(initial_base.length)
					.split('/')
					.slice(2)
					.map(() => '..')
					.join('/') || '.') + resolved
			);
	}
	return base + resolved;
}
var PRELOAD_PRIORITIES = {
	tap: 1,
	hover: 2,
	viewport: 3,
	eager: 4,
	off: -1,
	false: -1,
};
(({ ...PRELOAD_PRIORITIES }), PRELOAD_PRIORITIES.hover);
/** @param {any} value */
function notifiable_store(value) {
	const store = writable(value);
	let ready = true;
	function notify() {
		ready = true;
		store.update((val) => val);
	}
	/** @param {any} new_value */
	function set(new_value) {
		ready = false;
		store.set(new_value);
	}
	/** @param {(value: any) => void} run */
	function subscribe(run) {
		/** @type {any} */
		let old_value;
		return store.subscribe((new_value) => {
			if (old_value === void 0 || (ready && new_value !== old_value)) run((old_value = new_value));
		});
	}
	return {
		notify,
		set,
		subscribe,
	};
}
var updated_listener = { v: noop };
function create_updated_store() {
	const { set, subscribe } = writable(false);
	return {
		subscribe,
		check: async () => false,
	};
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/state.svelte.js
var page;
var navigating;
var updated;
var is_legacy = noop$1.toString().includes('$$') || /function \w+\(\) \{\}/.test(noop$1.toString());
var placeholder_url = 'a:';
if (is_legacy) {
	page = {
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url),
	};
	navigating = { current: null };
	updated = { current: false };
} else {
	page = new (class Page {
		data = {};
		form = null;
		error = null;
		params = {};
		route = { id: null };
		state = {};
		status = -1;
		url = new URL(placeholder_url);
	})();
	navigating = new (class Navigating {
		current = null;
	})();
	updated = new (class Updated {
		current = false;
	})();
	updated_listener.v = () => (updated.current = true);
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
var { onMount, tick } = index_server_exports;
var stores = {
	url: /* @__PURE__ */ notifiable_store({}),
	page: /* @__PURE__ */ notifiable_store({}),
	navigating: /* @__PURE__ */ writable(null),
	updated: /* @__PURE__ */ create_updated_store(),
};
/** @type {Set<(navigation: import('@sveltejs/kit').OnNavigate) => import('types').MaybePromise<(() => void) | void>>} */
var on_navigate_callbacks = /* @__PURE__ */ new Set();
/**
 * @template {Function} T
 * @param {Set<T>} callbacks
 * @param {T} callback
 */
function add_navigation_callback(callbacks, callback) {
	onMount(() => {
		callbacks.add(callback);
		return () => {
			callbacks.delete(callback);
		};
	});
}
/**
 * A lifecycle function that runs the supplied `callback` immediately before we navigate to a new URL except during full-page navigations.
 *
 * If you return a `Promise`, SvelteKit will wait for it to resolve before completing the navigation. This allows you to — for example — use `document.startViewTransition`. Avoid promises that are slow to resolve, since navigation will appear stalled to the user.
 *
 * If a function (or a `Promise` that resolves to a function) is returned from the callback, it will be called once the DOM has updated.
 *
 * `onNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
 * @param {(navigation: import('@sveltejs/kit').OnNavigate) => import('types').MaybePromise<(() => void) | void>} callback
 * @returns {void}
 */
function onNavigate(callback) {
	add_navigation_callback(on_navigate_callbacks, callback);
}
//#endregion
export { updated as a, page as i, stores as n, resolve as o, navigating as r, onNavigate as t };
