import {
	B as e,
	D as t,
	N as n,
	U as r,
	V as i,
	b as a,
	g as o,
	j as s,
	o as c,
	v as l,
	x as u,
} from '../chunks/DT5cZCHx.js';
import { t as d } from '../chunks/D5ASwX6m.js';
import '../chunks/xihTtKlq.js';
import '../chunks/1gcw06x5.js';
import { t as f } from '../chunks/DVdPPOhL.js';
var p = `` + new URL(`../assets/ExoSight_HomePage.CEWTj95M.svg`, import.meta.url).href,
	m = l(
		`<div class="home-content"><img alt="ExoSight" class="home-title"/> <h3 class="home-subtitle">See beyond our solar system, <span class="subtitle-break">one exoplanet at a time.</span></h3> <div><button class="home-searchbutton">Search for Exoplanets  🔍︎</button></div></div>`,
	);
function h(a, l) {
	i(l, !0);
	let h = () => d(`/search`);
	(f(a, {
		children: (e, i) => {
			var a = m(),
				l = s(a),
				d = n(l, 4),
				f = s(d);
			(r(d), r(a), t(() => c(l, `src`, p)), u(`click`, f, h), o(e, a));
		},
		$$slots: { default: !0 },
	}),
		e());
}
a([`click`]);
export { h as component };
