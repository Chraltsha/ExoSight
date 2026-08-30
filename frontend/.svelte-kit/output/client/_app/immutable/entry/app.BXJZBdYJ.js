const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			'../nodes/0.7PTipjmf.js',
			'../chunks/DT5cZCHx.js',
			'../chunks/D5ASwX6m.js',
			'../chunks/xihTtKlq.js',
			'../chunks/BTah0wwC.js',
			'../chunks/1gcw06x5.js',
			'../chunks/BujJ8cV-.js',
			'../assets/0.C2dHITtw.css',
			'../nodes/1.DK0g-8HQ.js',
			'../nodes/2.DNF59wDN.js',
			'../chunks/DVdPPOhL.js',
			'../nodes/3.Ck7sQ94i.js',
			'../nodes/4.Bz2MNqvY.js',
		]),
) => i.map((i) => d[i]);
import {
	B as e,
	C as t,
	D as n,
	F as r,
	I as i,
	L as a,
	M as o,
	N as s,
	O as c,
	T as l,
	U as u,
	V as d,
	_ as f,
	a as p,
	d as m,
	g as h,
	h as g,
	i as _,
	j as v,
	k as y,
	m as b,
	n as x,
	r as S,
	v as C,
	y as w,
} from '../chunks/DT5cZCHx.js';
import '../chunks/xihTtKlq.js';
var T = `modulepreload`,
	E = function (e, t) {
		return new URL(e, t).href;
	},
	D = {},
	O = function (e, t, n) {
		let r = Promise.resolve();
		if (t && t.length > 0) {
			let e = document.getElementsByTagName(`link`),
				i = document.querySelector(`meta[property=csp-nonce]`),
				a = i?.nonce || i?.getAttribute(`nonce`);
			function o(e) {
				return Promise.all(
					e.map((e) =>
						Promise.resolve(e).then(
							(e) => ({ status: `fulfilled`, value: e }),
							(e) => ({ status: `rejected`, reason: e }),
						),
					),
				);
			}
			function s(e) {
				return import.meta.resolve ? import.meta.resolve(e) : new URL(e, import.meta.url).href;
			}
			r = o(
				t.map((t) => {
					if (((t = E(t, n)), (t = s(t)), t in D)) return;
					D[t] = !0;
					let r = t.endsWith(`.css`);
					for (let n = e.length - 1; n >= 0; n--) {
						let i = e[n];
						if (i.href === t && (!r || i.rel === `stylesheet`)) return;
					}
					let i = document.createElement(`link`);
					if (
						((i.rel = r ? `stylesheet` : T),
						r || (i.as = `script`),
						(i.crossOrigin = ``),
						(i.href = t),
						a && i.setAttribute(`nonce`, a),
						document.head.appendChild(i),
						r)
					)
						return new Promise((e, n) => {
							(i.addEventListener(`load`, e),
								i.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`))));
						});
				}),
			);
		}
		function i(e) {
			let t = new Event(`vite:preloadError`, { cancelable: !0 });
			if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
		}
		return r.then((t) => {
			for (let e of t || []) e.status === `rejected` && i(e.reason);
			return e().catch(i);
		});
	},
	k = {},
	A = C(
		`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`,
	),
	j = C(`<!> <!>`, 1);
function M(S, C) {
	d(C, !0);
	let T = _(C, `components`, 23, () => []),
		E = _(C, `data_0`, 3, null),
		D = _(C, `data_1`, 3, null);
	(y(() => C.stores.page.set(C.page)),
		c(() => {
			(C.stores, C.page, C.constructors, T(), C.form, E(), D(), C.stores.page.notify());
		}));
	let O = i(!1),
		k = i(!1),
		M = i(null);
	x(() => {
		let e = C.stores.page.subscribe(() => {
			t(O) &&
				(r(k, !0),
				l().then(() => {
					r(M, document.title || `untitled page`, !0);
				}));
		});
		return (r(O, !0), e);
	});
	let N = a(() => C.constructors[1]);
	var P = j(),
		F = o(P),
		I = (e) => {
			let n = a(() => C.constructors[0]);
			var r = f(),
				i = o(r);
			(m(
				i,
				() => t(n),
				(e, n) => {
					p(
						n(e, {
							get data() {
								return E();
							},
							get form() {
								return C.form;
							},
							get params() {
								return C.page.params;
							},
							children: (e, n) => {
								var r = f(),
									i = o(r);
								(m(
									i,
									() => t(N),
									(e, t) => {
										p(
											t(e, {
												get data() {
													return D();
												},
												get form() {
													return C.form;
												},
												get params() {
													return C.page.params;
												},
											}),
											(e) => (T()[1] = e),
											() => T()?.[1],
										);
									},
								),
									h(e, r));
							},
							$$slots: { default: !0 },
						}),
						(e) => (T()[0] = e),
						() => T()?.[0],
					);
				},
			),
				h(e, r));
		},
		L = (e) => {
			let n = a(() => C.constructors[0]);
			var r = f(),
				i = o(r);
			(m(
				i,
				() => t(n),
				(e, t) => {
					p(
						t(e, {
							get data() {
								return E();
							},
							get form() {
								return C.form;
							},
							get params() {
								return C.page.params;
							},
						}),
						(e) => (T()[0] = e),
						() => T()?.[0],
					);
				},
			),
				h(e, r));
		};
	b(F, (e) => {
		C.constructors[1] ? e(I) : e(L, -1);
	});
	var R = s(F, 2),
		z = (e) => {
			var r = A(),
				i = v(r),
				a = (e) => {
					var r = w();
					(n(() => g(r, t(M))), h(e, r));
				};
			(b(i, (e) => {
				t(k) && e(a);
			}),
				u(r),
				h(e, r));
		};
	(b(R, (e) => {
		t(O) && e(z);
	}),
		h(S, P),
		e());
}
var N = S(M),
	P = [
		() =>
			O(
				() => import(`../nodes/0.7PTipjmf.js`),
				__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
				import.meta.url,
			),
		() =>
			O(() => import(`../nodes/1.DK0g-8HQ.js`), __vite__mapDeps([8, 1, 3, 4, 2]), import.meta.url),
		() =>
			O(
				() => import(`../nodes/2.DNF59wDN.js`),
				__vite__mapDeps([9, 1, 2, 3, 5, 10, 6]),
				import.meta.url,
			),
		() =>
			O(
				() => import(`../nodes/3.Ck7sQ94i.js`),
				__vite__mapDeps([11, 1, 3, 10, 6]),
				import.meta.url,
			),
		() =>
			O(
				() => import(`../nodes/4.Bz2MNqvY.js`),
				__vite__mapDeps([12, 1, 3, 10, 6]),
				import.meta.url,
			),
	],
	F = [],
	I = { '/': [2], '/about': [3], '/search': [4] },
	L = {
		handleError: ({ error: e }) => {
			console.error(e);
		},
		reroute: () => {},
		transport: {},
	},
	R = Object.fromEntries(Object.entries(L.transport).map(([e, t]) => [e, t.decode])),
	z = Object.fromEntries(Object.entries(L.transport).map(([e, t]) => [e, t.encode])),
	B = !1,
	V = (e, t) => R[e](t),
	H = () => O(() => import(`../chunks/Bjy-W4x2.js`).then((e) => e.default), [], import.meta.url);
export {
	V as decode,
	R as decoders,
	I as dictionary,
	z as encoders,
	H as get_error_template,
	B as hash,
	L as hooks,
	k as matchers,
	P as nodes,
	N as root,
	F as server_loads,
};
