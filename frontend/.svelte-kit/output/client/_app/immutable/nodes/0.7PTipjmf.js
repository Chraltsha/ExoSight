import {
	A as e,
	B as t,
	C as n,
	D as r,
	F as i,
	I as a,
	M as o,
	N as s,
	O as c,
	P as l,
	S as u,
	U as d,
	V as f,
	c as p,
	f as m,
	g as h,
	h as g,
	i as _,
	j as v,
	l as y,
	o as b,
	p as x,
	s as S,
	v as C,
} from '../chunks/DT5cZCHx.js';
import { l as w, n as T } from '../chunks/D5ASwX6m.js';
import '../chunks/xihTtKlq.js';
import { t as E } from '../chunks/BTah0wwC.js';
import '../chunks/1gcw06x5.js';
import { t as D } from '../chunks/BujJ8cV-.js';
var O = `data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e`,
	k = `` + new URL(`../assets/ExoSight_Logo_White.DnRkYyPV.svg`, import.meta.url).href,
	A = C(
		`<div class="parallax-layer svelte-nbk10w" aria-hidden="true"><img class="parallax-layer__image svelte-nbk10w" alt=""/></div>`,
	);
function j(t, o) {
	let s = _(o, `strength`, 3, 8),
		c = _(o, `zIndex`, 19, () => -1),
		l = a(0),
		f = a(0);
	function p(e) {
		let t = (e.clientX / window.innerWidth - 0.5) * 2,
			n = (e.clientY / window.innerHeight - 0.5) * 2;
		(i(l, t * s()), i(f, n * s()));
	}
	var m = A();
	u(`mousemove`, e, p);
	var g = v(m);
	(d(m),
		r(() => {
			(S(m, `z-index: ${c() ?? ``};`),
				b(g, `src`, o.src),
				S(g, `transform: translate(${n(l) ?? ``}px, ${n(f) ?? ``}px) scale(1.2);`));
		}),
		h(t, m));
}
var M = C(`<link rel="icon"/>`),
	N = C(`<a> </a>`),
	P = C(
		`<!> <!> <!> <nav class="navigation-bar"><img alt="ExoSight" class="nav-logo"/> <!> <div class="nav-indicator"></div></nav> <div class="page-transition-wrapper"><!></div>`,
		1,
	);
function F(e, i) {
	f(i, !0);
	let a = [
			{ href: `/`, label: `home` },
			{ href: `/search`, label: `search` },
			{ href: `/about`, label: `about` },
		],
		u = a.map((e) => w(e.href)),
		_ = l({ width: 0, left: 0 }),
		C = () => {
			setTimeout(() => {
				let e = document.querySelector(`.navigation-bar a.active`);
				e && ((_.width = e.offsetWidth), (_.left = e.offsetLeft));
			}, 0);
		};
	(c(() => {
		(E.url.pathname, C());
	}),
		T(({ from: e, to: t }) => {
			if (!e?.url || !t?.url) return;
			let n = u.indexOf(e.url.pathname),
				r = u.indexOf(t.url.pathname);
			return (
				n !== -1 && r !== -1 && (D.direction = r > n ? 1 : -1),
				new Promise((e) => setTimeout(e, 220))
			);
		}));
	var A = P();
	y(`12qhfyh`, (e) => {
		var t = M();
		(r(() => b(t, `href`, O)), h(e, t));
	});
	var F = o(A);
	j(F, { src: `/star-background.jpg`, strength: 6, zIndex: -3 });
	var I = s(F, 2);
	j(I, { src: `/star-layer2.png`, strength: 14, zIndex: -2 });
	var L = s(I, 2);
	j(L, { src: `/star-layer3.png`, strength: 24, zIndex: -1 });
	var R = s(L, 2),
		z = v(R),
		B = s(z, 2);
	x(
		B,
		17,
		() => a,
		(e) => e.href,
		(e, t) => {
			var i = N();
			let a;
			var o = v(i, !0);
			(d(i),
				r(
					(e, r) => {
						(b(i, `href`, e), (a = p(i, 1, ``, null, a, r)), g(o, n(t).label));
					},
					[() => w(n(t).href), () => ({ active: E.url.pathname === w(n(t).href) })],
				),
				h(e, i));
		},
	);
	var V = s(B, 2);
	d(R);
	var H = s(R, 2),
		U = v(H);
	(m(U, () => i.children),
		d(H),
		r(() => {
			(b(z, `src`, k), S(V, `width: ${_.width ?? ``}px; left: ${_.left ?? ``}px`));
		}),
		h(e, A),
		t());
}
export { F as component };
