import { B as e, U as t, V as n, f as r, g as i, j as a, u as o, v as s } from './DT5cZCHx.js';
import './xihTtKlq.js';
import { t as c } from './BujJ8cV-.js';
function l(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function u(e) {
	let t = typeof e == `string` && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || `px`] : [e, `px`];
}
function d(
	e,
	{ delay: t = 0, duration: n = 400, easing: r = l, x: i = 0, y: a = 0, opacity: o = 0 } = {},
) {
	let s = getComputedStyle(e),
		c = +s.opacity,
		d = s.transform === `none` ? `` : s.transform,
		f = c * (1 - o),
		[p, m] = u(i),
		[h, g] = u(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${d} translate(${(1 - e) * p}${m}, ${(1 - e) * h}${g});
			opacity: ${c - f * t}`,
	};
}
function f(e) {
	let t = e - 1;
	return t * t * t + 1;
}
var p = s(`<div class="h-full"><!></div>`);
function m(s, l) {
	n(l, !0);
	let u = (e) => ({ x: e, duration: 220, easing: f, delay: 30 }),
		m = (e) => ({ x: e, duration: 220, easing: f });
	var h = p(),
		g = a(h);
	(r(g, () => l.children),
		t(h),
		o(
			1,
			h,
			() => d,
			() => u(c.direction * 300),
		),
		o(
			2,
			h,
			() => d,
			() => m(c.direction * -300),
		),
		i(s, h),
		e());
}
export { m as t };
