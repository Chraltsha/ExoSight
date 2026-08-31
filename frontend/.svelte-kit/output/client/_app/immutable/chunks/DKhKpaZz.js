import { G as e, H as t, N as n, U as r, b as i, f as a, m as o, v as s } from './CCT0pYQH.js';
import './xihTtKlq.js';
import { t as c } from './CS3UNDLJ.js';
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
var p = i(`<div class="h-full"><!></div>`);
function m(i, l) {
	r(l, !0);
	let u = (e) => ({ x: e, duration: 220, easing: f, delay: 30 }),
		m = (e) => ({ x: e, duration: 220, easing: f });
	var h = p(),
		g = n(h);
	(o(g, () => l.children),
		e(h),
		a(
			1,
			h,
			() => d,
			() => u(c.direction * 300),
		),
		a(
			2,
			h,
			() => d,
			() => m(c.direction * -300),
		),
		s(i, h),
		t());
}
export { m as t };
