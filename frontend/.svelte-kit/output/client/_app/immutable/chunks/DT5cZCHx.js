var e = Object.defineProperty,
	t = (t, n) => {
		let r = {};
		for (var i in t) e(r, i, { get: t[i], enumerable: !0 });
		return (n || e(r, Symbol.toStringTag, { value: `Module` }), r);
	},
	n = Array.isArray,
	r = Array.prototype.indexOf,
	i = Array.prototype.includes,
	a = Array.from,
	o = Object.defineProperty,
	s = Object.getOwnPropertyDescriptor,
	c = Object.getOwnPropertyDescriptors,
	l = Object.prototype,
	u = Array.prototype,
	d = Object.getPrototypeOf,
	f = Object.isExtensible;
function p(e) {
	return typeof e == `function`;
}
var m = () => {};
function h(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function g() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			((e = n), (t = r));
		}),
		resolve: e,
		reject: t,
	};
}
var _ = 1024,
	v = 2048,
	y = 4096,
	b = 8192,
	x = 16384,
	S = 32768,
	ee = 1 << 25,
	C = 65536,
	te = 1 << 18,
	ne = 1 << 19,
	re = 1 << 20,
	ie = 1 << 25,
	ae = 65536,
	oe = 1 << 21,
	se = 1 << 22,
	ce = 1 << 23,
	le = Symbol(`$state`),
	ue = Symbol(`legacy props`),
	de = Symbol(``),
	fe = Symbol(`attributes`),
	pe = Symbol(`class`),
	me = Symbol(`style`),
	he = Symbol(`text`),
	ge = new (class extends Error {
		name = `StaleReactionError`;
		message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
	})(),
	_e = !!globalThis.document?.contentType && globalThis.document.contentType.includes(`xml`);
function ve(e) {
	throw Error(`https://svelte.dev/e/experimental_async_required`);
}
function ye(e) {
	throw Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
function be() {
	throw Error(`https://svelte.dev/e/missing_context`);
}
function xe() {
	throw Error(`https://svelte.dev/e/async_derived_orphan`);
}
function Se(e, t, n) {
	throw Error(`https://svelte.dev/e/each_key_duplicate`);
}
function Ce(e) {
	throw Error(`https://svelte.dev/e/effect_in_teardown`);
}
function we() {
	throw Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
function Te(e) {
	throw Error(`https://svelte.dev/e/effect_orphan`);
}
function Ee() {
	throw Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
function De() {
	throw Error(`https://svelte.dev/e/fork_discarded`);
}
function Oe() {
	throw Error(`https://svelte.dev/e/fork_timing`);
}
function ke() {
	throw Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
}
function Ae() {
	throw Error(`https://svelte.dev/e/hydration_failed`);
}
function je(e) {
	throw Error(`https://svelte.dev/e/lifecycle_legacy_only`);
}
function Me(e) {
	throw Error(`https://svelte.dev/e/props_invalid_value`);
}
function Ne() {
	throw Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
function Pe() {
	throw Error(`https://svelte.dev/e/state_prototype_fixed`);
}
function Fe() {
	throw Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
function Ie() {
	throw Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
var Le = {},
	w = Symbol(`uninitialized`),
	Re = `http://www.w3.org/1999/xhtml`;
function ze() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
function Be(e) {
	console.warn(`https://svelte.dev/e/hydratable_missing_but_expected`);
}
function Ve(e) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
function He() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
var T = !1;
function E(e) {
	T = e;
}
var D;
function O(e) {
	if (e === null) throw (Ve(), Le);
	return (D = e);
}
function Ue() {
	return O(z(D));
}
function We(e) {
	if (T) {
		if (z(D) !== null) throw (Ve(), Le);
		D = e;
	}
}
function Ge(e = 1) {
	if (T) {
		for (var t = e, n = D; t--;) n = z(n);
		D = n;
	}
}
function Ke(e = !0) {
	for (var t = 0, n = D; ;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === `]`) {
				if (t === 0) return n;
				--t;
			} else (r === `[` || r === `[!` || (r[0] === `[` && !isNaN(Number(r.slice(1))))) && (t += 1);
		}
		var i = z(n);
		(e && n.remove(), (n = i));
	}
}
function qe(e) {
	if (!e || e.nodeType !== 8) throw (Ve(), Le);
	return e.data;
}
function Je(e) {
	return e === this.v;
}
function Ye(e, t) {
	return e == e ? e !== t || (typeof e == `object` && !!e) || typeof e == `function` : t == t;
}
function Xe(e) {
	return !Ye(e, this.v);
}
var k = null;
function Ze(e) {
	k = e;
}
function Qe() {
	let e = {};
	return [() => (tt(e) || be(), $e(e)), (t) => et(e, t)];
}
function $e(e) {
	return ot(`getContext`).get(e);
}
function et(e, t) {
	return (ot(`setContext`).set(e, t), t);
}
function tt(e) {
	return ot(`hasContext`).has(e);
}
function nt() {
	return ot(`getAllContexts`);
}
function rt(e, t = !1, n) {
	k = { p: k, i: !1, c: null, e: null, s: e, x: null, r: q, l: null };
}
function it(e) {
	var t = k,
		n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Nn(r);
	}
	return (e !== void 0 && (t.x = e), (t.i = !0), (k = t.p), e ?? {});
}
function at() {
	return !0;
}
function ot(e) {
	return (k === null && ye(e), (k.c ??= new Map(st(k) || void 0)));
}
function st(e) {
	let t = e.p;
	for (; t !== null;) {
		let e = t.c;
		if (e !== null) return e;
		t = t.p;
	}
	return null;
}
var ct = [];
function lt() {
	var e = ct;
	((ct = []), h(e));
}
function A(e) {
	if (ct.length === 0 && !Ut) {
		var t = ct;
		queueMicrotask(() => {
			t === ct && lt();
		});
	}
	ct.push(e);
}
function ut() {
	for (; ct.length > 0;) lt();
}
function dt(e) {
	var t = q;
	if (t === null) return ((W.f |= ce), e);
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	ft(e, t);
}
function ft(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
var pt = ~(v | y | _);
function j(e, t) {
	e.f = (e.f & pt) | t;
}
function mt(e) {
	e.f & 512 || e.deps === null ? j(e, _) : j(e, y);
}
function ht(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || ((t.f ^= ae), ht(t.deps));
}
function gt(e, t, n) {
	(e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), ht(e.deps), j(e, _));
}
var _t = [];
function vt(e, t = m) {
	let n = null,
		r = new Set();
	function i(t) {
		if (Ye(e, t) && ((e = t), n)) {
			let t = !_t.length;
			for (let t of r) (t[1](), _t.push(t, e));
			if (t) {
				for (let e = 0; e < _t.length; e += 2) _t[e][0](_t[e + 1]);
				_t.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = m) {
		let c = [o, s];
		return (
			r.add(c),
			r.size === 1 && (n = t(i, a) || m),
			o(e),
			() => {
				(r.delete(c), r.size === 0 && n && (n(), (n = null)));
			}
		);
	}
	return { set: i, update: a, subscribe: o };
}
var yt = !1;
function bt(e) {
	var t = yt;
	try {
		return ((yt = !1), [e(), yt]);
	} finally {
		yt = t;
	}
}
function xt(e) {
	var t = W,
		n = q;
	(K(null), J(null));
	try {
		return e();
	} finally {
		(K(t), J(n));
	}
}
function St(e) {
	let t = 0,
		n = ln(0),
		r;
	return () => {
		An() &&
			($(n),
			Rn(
				() => (
					t === 0 && (r = _r(() => e(() => pn(n)))),
					(t += 1),
					() => {
						A(() => {
							(--t, t === 0 && (r?.(), (r = void 0), pn(n)));
						});
					}
				),
			));
	};
}
var Ct = C | ne;
function wt(e, t, n, r) {
	new Tt(e, t, n, r);
}
var Tt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = T ? D : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = new Set();
	#p = new Set();
	#m = null;
	#h = St(
		() => (
			(this.#m = ln(this.#l)),
			() => {
				this.#m = null;
			}
		),
	);
	constructor(e, t, n, r) {
		((this.#e = e),
			(this.#n = t),
			(this.#r = (e) => {
				var t = q;
				((t.b = this), (t.f |= 128), n(e));
			}),
			(this.parent = q.b),
			(this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e)),
			(this.#i = Bn(() => {
				if (T) {
					let e = this.#t;
					Ue();
					let t = e.data === `[!`;
					if (e.data.startsWith(`[?`)) {
						let t = JSON.parse(e.data.slice(2));
						this.#_(t);
					} else t ? this.#y() : this.#g();
				} else this.#b();
			}, Ct)),
			T && (this.#e = D));
	}
	#g() {
		try {
			this.#a = V(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed,
			{ reset: n, invoke_onerror: r } = this.#v(e);
		(A(r),
			t &&
				(this.#s = V(() => {
					t(
						this.#e,
						() => e,
						() => n,
					);
				})));
	}
	#v(e) {
		var t = !1,
			n = !1;
		let r = () => {
			if (t) {
				He();
				return;
			}
			((t = !0),
				n && Ie(),
				this.#s !== null &&
					Kn(this.#s, () => {
						this.#s = null;
					}),
				this.#S(() => {
					this.#b();
				}));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				try {
					((n = !0), this.#n.onerror?.(e, r), (n = !1));
				} catch (e) {
					ft(e, this.#i && this.#i.parent);
				}
			},
		};
	}
	#y() {
		let e = this.#n.pending;
		e &&
			((this.is_pending = !0),
			(this.#o = V(() => e(this.#e))),
			A(() => {
				var e = (this.#c = document.createDocumentFragment()),
					t = L();
				(e.append(t),
					(this.#a = this.#S(() => V(() => this.#r(t)))),
					this.#u === 0 &&
						(this.#e.before(e),
						(this.#c = null),
						Kn(this.#o, () => {
							this.#o = null;
						}),
						this.#x(M)));
			}));
	}
	#b() {
		try {
			if (
				((this.is_pending = this.has_pending_snippet()),
				(this.#u = 0),
				(this.#l = 0),
				(this.#a = V(() => {
					this.#r(this.#e);
				})),
				this.#u > 0)
			) {
				var e = (this.#c = document.createDocumentFragment());
				Xn(this.#a, e);
				let t = this.#n.pending;
				this.#o = V(() => t(this.#e));
			} else this.#x(M);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		((this.is_pending = !1), e.transfer_effects(this.#f, this.#p));
	}
	defer_effect(e) {
		gt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = q,
			n = W,
			r = k;
		(J(this.#i), K(this.#i), Ze(this.#i.ctx));
		try {
			return (Yt.ensure(), e());
		} catch (e) {
			return (dt(e), null);
		} finally {
			(J(t), K(n), Ze(r));
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		((this.#u += e),
			this.#u === 0 &&
				(this.#x(t),
				this.#o &&
					Kn(this.#o, () => {
						this.#o = null;
					}),
				(this.#c &&= (this.#e.before(this.#c), null))));
	}
	update_pending_count(e, t) {
		(this.#C(e, t),
			(this.#l += e),
			!(!this.#m || this.#d) &&
				((this.#d = !0),
				A(() => {
					((this.#d = !1), this.#m && dn(this.#m, this.#l));
				})));
	}
	get_effect_pending() {
		return (this.#h(), $(this.#m));
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		M?.is_fork
			? (this.#a && M.skip_effect(this.#a),
				this.#o && M.skip_effect(this.#o),
				this.#s && M.skip_effect(this.#s),
				M.oncommit(() => {
					this.#w(e);
				}))
			: this.#w(e);
	}
	#w(e) {
		((this.#a &&= (H(this.#a), null)),
			(this.#o &&= (H(this.#o), null)),
			(this.#s &&= (H(this.#s), null)),
			T && (O(this.#t), Ge(), O(Ke())));
		let t = this.#n.failed,
			n = (e) => {
				let { reset: n, invoke_onerror: r } = this.#v(e);
				(r(),
					t &&
						(this.#s = this.#S(() => {
							try {
								return V(() => {
									var r = q;
									((r.b = this),
										(r.f |= 128),
										t(
											this.#e,
											() => e,
											() => n,
										));
								});
							} catch (e) {
								return (ft(e, this.#i.parent), null);
							}
						})));
			};
		A(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				ft(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == `object` && t && typeof t.then == `function`
				? t.then(n, (e) => ft(e, this.#i && this.#i.parent))
				: n(t);
		});
	}
};
function Et(e, t, n, r) {
	let i = at() ? At : Pt;
	var a = e.filter((e) => !e.settled),
		o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q,
		c = Dt(),
		l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				ft(e, s);
			}
			Ot();
		}
	}
	var d = kt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => Mt(e)))
			.then(u)
			.catch((e) => ft(e, s))
			.finally(d);
	}
	l
		? l.then(() => {
				(c(), f(), Ot());
			})
		: f();
}
function Dt() {
	var e = q,
		t = W,
		n = k,
		r = M;
	return function (i = !0) {
		(J(e), K(t), Ze(n), i && !(e.f & 16384) && (r?.activate(), r?.apply()));
	};
}
function Ot(e = !0) {
	(J(null), K(null), Ze(null), e && M?.deactivate());
}
function kt() {
	var e = q,
		t = e.b,
		n = M,
		r = !!t?.is_rendered();
	return (
		t?.update_pending_count(1, n),
		n.increment(r, e),
		() => {
			(t?.update_pending_count(-1, n), n.decrement(r, e));
		}
	);
}
function At(e) {
	var t = 2 | v;
	return (
		q !== null && (q.f |= ne),
		{
			ctx: k,
			deps: null,
			effects: null,
			equals: Je,
			f: t,
			fn: e,
			reactions: null,
			rv: 0,
			v: w,
			wv: 0,
			parent: q,
			ac: null,
		}
	);
}
var jt = Symbol(`obsolete`);
function Mt(e, t, n) {
	let r = q;
	r === null && xe();
	var i = void 0,
		a = ln(w),
		o = !W,
		s = new Set();
	return (
		Ln(() => {
			var t = q,
				n = g();
			i = n.promise;
			try {
				Promise.resolve(e())
					.then(n.resolve, (e) => {
						e !== ge && n.reject(e);
					})
					.finally(Ot);
			} catch (e) {
				(n.reject(e), Ot());
			}
			var c = M;
			if (o) {
				if (t.f & 32768) var l = kt();
				if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(jt);
				else for (let e of s.values()) e.reject(jt);
				(s.add(n), c.async_deriveds.set(t, n));
			}
			let u = (e, t = void 0) => {
				(l?.(),
					s.delete(n),
					t !== jt &&
						(c.activate(),
						t ? ((a.f |= ce), dn(a, t)) : (a.f & 8388608 && (a.f ^= ce), dn(a, e)),
						c.deactivate()));
			};
			n.promise.then(u, (e) => u(null, e || `unknown`));
		}),
		jn(() => {
			for (let e of s) e.reject(jt);
		}),
		new Promise((e) => {
			function t(n) {
				function r() {
					n === i ? e(a) : t(i);
				}
				n.then(r, r);
			}
			t(i);
		})
	);
}
function Nt(e) {
	let t = At(e);
	return (er(t), t);
}
function Pt(e) {
	let t = At(e);
	return ((t.equals = Xe), t);
}
function Ft(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function It(e) {
	var t,
		n = q,
		r = e.parent;
	if (!U && r !== null && e.v !== w && r.f & 24576) return (ze(), e.v);
	J(r);
	try {
		((e.f &= ~ae), Ft(e), (t = lr(e)));
	} finally {
		J(n);
	}
	return t;
}
function Lt(e) {
	var t = It(e);
	if (
		!e.equals(t) &&
		((e.wv = or()),
		(!M?.is_fork || e.deps === null) &&
			(M === null ? (e.v = t) : (M.capture(e, t, !0), Vt?.capture(e, t, !0)), e.deps === null))
	) {
		j(e, _);
		return;
	}
	U || (N === null ? mt(e) : (An() || M?.is_fork) && N.set(e, t));
}
function Rt(e) {
	if (e.effects !== null)
		for (let t of e.effects)
			(t.teardown || t.ac) &&
				(t.teardown?.(),
				t.ac !== null &&
					xt(() => {
						(t.ac.abort(ge), (t.ac = null));
					}),
				t.fn !== null && (t.teardown = m),
				dr(t, 0),
				Hn(t));
}
function zt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
var Bt = null,
	M = null,
	Vt = null,
	N = null,
	Ht = null,
	Ut = !1,
	Wt = !1,
	Gt = null,
	Kt = null,
	qt = 0,
	Jt = 1,
	Yt = class e {
		id = Jt++;
		#e = !1;
		linked = !0;
		#t = null;
		#n = null;
		async_deriveds = new Map();
		current = new Map();
		previous = new Map();
		#r = new Set();
		#i = new Set();
		#a = 0;
		#o = new Map();
		#s = null;
		#c = [];
		#l = [];
		#u = new Set();
		#d = new Set();
		#f = new Map();
		#p = new Set();
		is_fork = !1;
		#m = !1;
		constructor() {
			(Bt === null ? (Bt = this) : ((Bt.#n = this), (this.#t = Bt)), (Bt = this));
		}
		#h() {
			if (this.is_fork) return !0;
			for (let n of this.#o.keys()) {
				for (var e = n, t = !1; e.parent !== null;) {
					if (this.#f.has(e)) {
						t = !0;
						break;
					}
					e = e.parent;
				}
				if (!t) return !0;
			}
			return !1;
		}
		skip_effect(e) {
			(this.#f.has(e) || this.#f.set(e, { d: [], m: [] }), this.#p.delete(e));
		}
		unskip_effect(e, t = (e) => this.schedule(e)) {
			var n = this.#f.get(e);
			if (n) {
				this.#f.delete(e);
				for (var r of n.d) (j(r, v), t(r));
				for (r of n.m) (j(r, y), t(r));
			}
			this.#p.add(e);
		}
		#g() {
			((this.#e = !0), qt++ > 1e3 && (this.#x(), Zt()));
			for (let e of this.#u) (this.#d.delete(e), j(e, v), this.schedule(e));
			for (let e of this.#d) (j(e, y), this.schedule(e));
			let t = this.#c;
			((this.#c = []), this.apply());
			var n = (Gt = []),
				r = [],
				i = (Kt = []);
			for (let e of t)
				try {
					this.#_(e, n, r);
				} catch (t) {
					throw (nn(e), this.#h() || this.discard(), t);
				}
			if (((M = null), i.length > 0)) {
				var a = e.ensure();
				for (let e of i) a.schedule(e);
			}
			if (((Gt = null), (Kt = null), this.#h())) {
				(this.#b(r), this.#b(n));
				for (let [e, t] of this.#f) tn(e, t);
				i.length > 0 && M.#g();
				return;
			}
			let o = this.#v();
			if (o) {
				(this.#b(r), this.#b(n), o.#y(this));
				return;
			}
			(this.#u.clear(), this.#d.clear());
			for (let e of this.#r) e(this);
			(this.#r.clear(), (Vt = this), Qt(r), Qt(n), (Vt = null), this.#s?.resolve());
			var s = M;
			if (
				(this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0)
			) {
				if (s !== null) {
					let e = s;
					e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
				} else s = this;
			}
			s !== null && s.#g();
		}
		#_(e, t, n) {
			e.f ^= _;
			for (var r = e.first; r !== null;) {
				var i = r.f,
					a = !!(i & 96);
				if (!((a && i & 1024) || i & 8192 || this.#f.has(r)) && r.fn !== null) {
					a ? (r.f ^= _) : i & 4 ? t.push(r) : sr(r) && (i & 16 && this.#d.add(r), fr(r));
					var o = r.first;
					if (o !== null) {
						r = o;
						continue;
					}
				}
				for (; r !== null;) {
					var s = r.next;
					if (s !== null) {
						r = s;
						break;
					}
					r = r.parent;
				}
			}
		}
		#v() {
			for (var e = this.#t; e !== null;) {
				if (!e.is_fork) {
					for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
				}
				e = e.#t;
			}
			return null;
		}
		#y(e) {
			for (let [t, n] of e.current)
				(!this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)),
					this.current.set(t, n));
			for (let [t, n] of e.async_deriveds) {
				let e = this.async_deriveds.get(t);
				e && n.promise.then(e.resolve).catch(e.reject);
			}
			(e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d));
			let t = (e) => {
				var n = e.reactions;
				if (n !== null && !(e.f & 2 && !(e.f & 6144)))
					for (let e of n) {
						var r = e.f;
						if (r & 2) t(e);
						else {
							var i = e;
							r & 4194320 &&
								!this.async_deriveds.has(i) &&
								(this.#d.delete(i), j(i, v), this.schedule(i));
						}
					}
			};
			for (let e of this.current.keys()) t(e);
			(this.oncommit(() => e.discard()), e.#x(), (M = this), this.#g());
		}
		#b(e) {
			for (var t = 0; t < e.length; t += 1) gt(e[t], this.#u, this.#d);
		}
		capture(e, t, n = !1) {
			(e.v !== w && !this.previous.has(e) && this.previous.set(e, e.v),
				e.f & 8388608 || (this.current.set(e, [t, n]), N?.set(e, t)),
				this.is_fork || (e.v = t));
		}
		activate() {
			M = this;
		}
		deactivate() {
			((M = null), (N = null));
		}
		flush() {
			try {
				((Wt = !0), (M = this), this.#g());
			} finally {
				((qt = 0),
					(Ht = null),
					(Gt = null),
					(Kt = null),
					(Wt = !1),
					(M = null),
					(N = null),
					on.clear());
			}
		}
		discard() {
			for (let e of this.#i) e(this);
			this.#i.clear();
			for (let e of this.async_deriveds.values()) e.reject(jt);
			(this.#x(), this.#s?.resolve());
		}
		register_created_effect(e) {
			this.#l.push(e);
		}
		increment(e, t) {
			if (((this.#a += 1), e)) {
				let e = this.#o.get(t) ?? 0;
				this.#o.set(t, e + 1);
			}
		}
		decrement(e, t) {
			if ((--this.#a, e)) {
				let e = this.#o.get(t) ?? 0;
				e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
			}
			this.#m ||
				((this.#m = !0),
				A(() => {
					((this.#m = !1), this.linked && this.flush());
				}));
		}
		transfer_effects(e, t) {
			for (let t of e) this.#u.add(t);
			for (let e of t) this.#d.add(e);
			(e.clear(), t.clear());
		}
		oncommit(e) {
			this.#r.add(e);
		}
		ondiscard(e) {
			this.#i.add(e);
		}
		settled() {
			return (this.#s ??= g()).promise;
		}
		static ensure() {
			if (M === null) {
				let t = (M = new e());
				!Wt &&
					!Ut &&
					A(() => {
						t.#e || t.flush();
					});
			}
			return M;
		}
		apply() {
			N = null;
		}
		schedule(e) {
			if (((Ht = e), e.b?.is_pending && e.f & 16777228 && !(e.f & 32768))) {
				e.b.defer_effect(e);
				return;
			}
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (Gt !== null && t === q && (W === null || !(W.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= _;
				}
			}
			this.#c.push(t);
		}
		#x() {
			if (this.linked) {
				var e = this.#t,
					t = this.#n;
				(e === null || (e.#n = t), t === null ? (Bt = e) : (t.#t = e), (this.linked = !1));
			}
		}
	};
function Xt(e) {
	var t = Ut;
	Ut = !0;
	try {
		var n;
		for (e && (M !== null && !M.is_fork && M.flush(), (n = e())); ;) {
			if ((ut(), M === null)) return n;
			M.flush();
		}
	} finally {
		Ut = t;
	}
}
function Zt() {
	try {
		Ee();
	} catch (e) {
		ft(e, Ht);
	}
}
var P = null;
function Qt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (
				!(r.f & 24576) &&
				sr(r) &&
				((P = new Set()),
				fr(r),
				r.deps === null &&
					r.first === null &&
					r.nodes === null &&
					r.teardown === null &&
					r.ac === null &&
					Gn(r),
				P?.size > 0)
			) {
				on.clear();
				for (let e of P) {
					if (e.f & 24576) continue;
					let t = [e],
						n = e.parent;
					for (; n !== null;) (P.has(n) && (P.delete(n), t.push(n)), (n = n.parent));
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || fr(n);
					}
				}
				P.clear();
			}
		}
		P = null;
	}
}
function $t(e, t) {
	if (e.reactions !== null)
		for (let n of e.reactions) {
			let e = n.f;
			e & 2 ? $t(n, t) : e & 131072 && (j(n, v), t.add(n));
		}
}
function en(e) {
	M.schedule(e);
}
function tn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		(e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), j(e, _));
		for (var n = e.first; n !== null;) (tn(n, t), (n = n.next));
	}
}
function nn(e) {
	j(e, _);
	for (var t = e.first; t !== null;) (nn(t), (t = t.next));
}
function rn(e) {
	(ve(`fork`), M !== null && Oe());
	var t = Yt.ensure();
	((t.is_fork = !0), (N = new Map()));
	var n = !1,
		r = t.settled();
	return (
		Xt(e),
		{
			commit: async () => {
				if (n) {
					await r;
					return;
				}
				(t.linked || De(), (n = !0), (t.is_fork = !1));
				for (var [e, [i]] of t.current) ((e.v = i), (e.wv = or()));
				(Xt(() => {
					var e = new Set();
					for (var n of t.current.keys()) $t(n, e);
					(sn(e), fn());
				}),
					t.flush(),
					await r);
			},
			discard: () => {
				for (var e of t.current.keys()) e.wv = or();
				!n && t.linked && t.discard();
			},
		}
	);
}
var an = new Set(),
	on = new Map();
function sn(e) {
	an = e;
}
var cn = !1;
function ln(e, t) {
	return { f: 0, v: e, reactions: null, equals: Je, rv: 0, wv: 0 };
}
function F(e, t) {
	let n = ln(e, t);
	return (er(n), n);
}
function un(e, t = !1, n = !0) {
	let r = ln(e);
	return (t || (r.equals = Xe), r);
}
function I(e, t, n = !1) {
	return (
		W !== null &&
			(!G || W.f & 131072) &&
			at() &&
			W.f & 4325394 &&
			(Y === null || !Y.has(e)) &&
			Fe(),
		dn(e, n ? hn(t) : t, Kt)
	);
}
function dn(e, t, n = null) {
	if (!e.equals(t)) {
		on.set(e, U ? t : e.v);
		var r = Yt.ensure();
		if ((r.capture(e, t), e.f & 2)) {
			let t = e;
			(e.f & 2048 && It(t), N === null && mt(t));
		}
		((e.wv = or()),
			mn(e, v, n),
			at() && q !== null && q.f & 1024 && !(q.f & 96) && (Q === null ? tr([e]) : Q.push(e)),
			!r.is_fork && an.size > 0 && !cn && fn());
	}
	return t;
}
function fn() {
	cn = !1;
	for (let e of an) {
		e.f & 1024 && j(e, y);
		let t;
		try {
			t = sr(e);
		} catch {
			t = !0;
		}
		t && fr(e);
	}
	an.clear();
}
function pn(e) {
	I(e, e.v + 1);
}
function mn(e, t, n) {
	var r = e.reactions;
	if (r !== null)
		for (var i = at(), a = r.length, o = 0; o < a; o++) {
			var s = r[o],
				c = s.f;
			if (!(!i && s === q)) {
				var l = (c & v) === 0;
				if ((l && j(s, t), c & 131072)) an.add(s);
				else if (c & 2) {
					var u = s;
					(N?.delete(u),
						c & 65536 || (c & 512 && (q === null || !(q.f & 2097152)) && (s.f |= ae), mn(u, y, n)));
				} else if (l) {
					var d = s;
					(c & 16 && P !== null && P.add(d), n === null ? en(d) : n.push(d));
				}
			}
		}
}
function hn(e) {
	if (typeof e != `object` || !e || le in e) return e;
	let t = d(e);
	if (t !== l && t !== u) return e;
	var r = new Map(),
		i = n(e),
		a = F(0),
		o = null,
		c = ir,
		f = (e) => {
			if (ir === c) return e();
			var t = W,
				n = ir;
			(K(null), ar(c));
			var r = e();
			return (K(t), ar(n), r);
		};
	return (
		i && r.set(`length`, F(e.length, o)),
		new Proxy(e, {
			defineProperty(e, t, n) {
				(!(`value` in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) &&
					Ne();
				var i = r.get(t);
				return (
					i === void 0
						? f(() => {
								var e = F(n.value, o);
								return (r.set(t, e), e);
							})
						: I(i, n.value, !0),
					!0
				);
			},
			deleteProperty(e, t) {
				var n = r.get(t);
				if (n === void 0) {
					if (t in e) {
						let e = f(() => F(w, o));
						(r.set(t, e), pn(a));
					}
				} else (I(n, w), pn(a));
				return !0;
			},
			get(t, n, i) {
				if (n === le) return e;
				var a = r.get(n),
					c = n in t;
				if (
					(a === void 0 &&
						(!c || s(t, n)?.writable) &&
						((a = f(() => F(hn(c ? t[n] : w), o))), r.set(n, a)),
					a !== void 0)
				) {
					var l = $(a);
					return l === w ? void 0 : l;
				}
				return Reflect.get(t, n, i);
			},
			getOwnPropertyDescriptor(e, t) {
				var n = Reflect.getOwnPropertyDescriptor(e, t);
				if (n && `value` in n) {
					var i = r.get(t);
					i && (n.value = $(i));
				} else if (n === void 0) {
					var a = r.get(t),
						o = a?.v;
					if (a !== void 0 && o !== w)
						return { enumerable: !0, configurable: !0, value: o, writable: !0 };
				}
				return n;
			},
			has(e, t) {
				if (t === le) return !0;
				var n = r.get(t),
					i = (n !== void 0 && n.v !== w) || Reflect.has(e, t);
				return (n !== void 0 || (q !== null && (!i || s(e, t)?.writable))) &&
					(n === void 0 && ((n = f(() => F(i ? hn(e[t]) : w, o))), r.set(t, n)), $(n) === w)
					? !1
					: i;
			},
			set(e, t, n, c) {
				var l = r.get(t),
					u = t in e;
				if (i && t === `length`)
					for (var d = n; d < l.v; d += 1) {
						var p = r.get(d + ``);
						p === void 0 ? d in e && ((p = f(() => F(w, o))), r.set(d + ``, p)) : I(p, w);
					}
				if (l === void 0)
					(!u || s(e, t)?.writable) && ((l = f(() => F(void 0, o))), I(l, hn(n)), r.set(t, l));
				else {
					u = l.v !== w;
					var m = f(() => hn(n));
					I(l, m);
				}
				var h = Reflect.getOwnPropertyDescriptor(e, t);
				if ((h?.set && h.set.call(c, n), !u)) {
					if (i && typeof t == `string`) {
						var g = r.get(`length`),
							_ = Number(t);
						Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
					}
					pn(a);
				}
				return !0;
			},
			ownKeys(e) {
				$(a);
				var t = Reflect.ownKeys(e).filter((e) => {
					var t = r.get(e);
					return t === void 0 || t.v !== w;
				});
				for (var [n, i] of r) i.v !== w && !(n in e) && t.push(n);
				return t;
			},
			setPrototypeOf() {
				Pe();
			},
		})
	);
}
var gn, _n, vn, yn;
function bn() {
	if (gn === void 0) {
		((gn = window), (_n = /Firefox/.test(navigator.userAgent)));
		var e = Element.prototype,
			t = Node.prototype,
			n = Text.prototype;
		((vn = s(t, `firstChild`).get),
			(yn = s(t, `nextSibling`).get),
			f(e) && ((e[pe] = void 0), (e[fe] = null), (e[me] = void 0), (e.__e = void 0)),
			f(n) && (n[he] = void 0));
	}
}
function L(e = ``) {
	return document.createTextNode(e);
}
function R(e) {
	return vn.call(e);
}
function z(e) {
	return yn.call(e);
}
function xn(e, t) {
	if (!T) return R(e);
	var n = R(D);
	if (n === null) n = D.appendChild(L());
	else if (t && n.nodeType !== 3) {
		var r = L();
		return (n?.before(r), O(r), r);
	}
	return (t && Dn(n), O(n), n);
}
function Sn(e, t = !1) {
	if (!T) {
		var n = R(e);
		return n instanceof Comment && n.data === `` ? z(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = L();
			return (D?.before(r), O(r), r);
		}
		Dn(D);
	}
	return D;
}
function Cn(e, t = 1, n = !1) {
	let r = T ? D : e;
	for (var i; t--;) ((i = r), (r = z(r)));
	if (!T) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = L();
			return (r === null ? i?.after(a) : r.before(a), O(a), a);
		}
		Dn(r);
	}
	return (O(r), r);
}
function wn(e) {
	e.textContent = ``;
}
function Tn() {
	return !1;
}
function En(e, t, n) {
	return t == null || t === `http://www.w3.org/1999/xhtml`
		? n
			? document.createElement(e, { is: n })
			: document.createElement(e)
		: n
			? document.createElementNS(t, e, { is: n })
			: document.createElementNS(t, e);
}
function Dn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;)
		(t.remove(), (e.nodeValue += t.nodeValue), (t = e.nextSibling));
}
function On(e) {
	(q === null && (W === null && Te(e), we()), U && Ce(e));
}
function kn(e, t) {
	var n = t.last;
	n === null ? (t.last = t.first = e) : ((n.next = e), (e.prev = n), (t.last = e));
}
function B(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: k,
		deps: null,
		nodes: null,
		f: e | v | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null,
	};
	M?.register_created_effect(r);
	var i = r;
	if (e & 4) Gt === null ? Yt.ensure().schedule(r) : Gt.push(r);
	else if (t !== null) {
		try {
			fr(r);
		} catch (e) {
			throw (H(r), e);
		}
		i.deps === null &&
			i.teardown === null &&
			i.nodes === null &&
			i.first === i.last &&
			!(i.f & 524288) &&
			((i = i.first), e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && ((i.parent = n), n !== null && kn(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function An() {
	return W !== null && !G;
}
function jn(e) {
	let t = B(8, null);
	return (j(t, _), (t.teardown = e), t);
}
function Mn(e) {
	On(`$effect`);
	var t = q.f;
	if (!W && t & 32 && k !== null && !k.i) {
		var n = k;
		(n.e ??= []).push(e);
	} else return Nn(e);
}
function Nn(e) {
	return B(4 | re, e);
}
function Pn(e) {
	return (On(`$effect.pre`), B(8 | re, e));
}
function Fn(e) {
	Yt.ensure();
	let t = B(64 | ne, e);
	return (e = {}) =>
		new Promise((n) => {
			e.outro
				? Kn(t, () => {
						(H(t), n(void 0));
					})
				: (H(t), n(void 0));
		});
}
function In(e) {
	return B(4, e);
}
function Ln(e) {
	return B(se | ne, e);
}
function Rn(e, t = 0) {
	return B(8 | t, e);
}
function zn(e, t = [], n = [], r = []) {
	Et(r, t, n, (t) => {
		B(8, () => {
			e(...t.map($));
		});
	});
}
function Bn(e, t = 0) {
	return B(16 | t, e);
}
function V(e) {
	return B(32 | ne, e);
}
function Vn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = U,
			n = W;
		($n(!0), K(null));
		try {
			t.call(null);
		} finally {
			($n(e), K(n));
		}
	}
}
function Hn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null &&
			xt(() => {
				e.abort(ge);
			});
		var r = n.next;
		(n.f & 64 ? (n.parent = null) : H(n, t), (n = r));
	}
}
function Un(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		(t.f & 32 || H(t), (t = n));
	}
}
function H(e, t = !0) {
	var n = !1;
	((t || e.f & 262144) &&
		e.nodes !== null &&
		e.nodes.end !== null &&
		(Wn(e.nodes.start, e.nodes.end), (n = !0)),
		(e.f |= ee),
		Hn(e, t && !n),
		dr(e, 0));
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	(Vn(e), (e.f ^= ee), (e.f |= x));
	var i = e.parent;
	(i !== null && i.first !== null && Gn(e),
		(e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null));
}
function Wn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : z(e);
		(e.remove(), (e = n));
	}
}
function Gn(e) {
	var t = e.parent,
		n = e.prev,
		r = e.next;
	(n !== null && (n.next = r),
		r !== null && (r.prev = n),
		t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n)));
}
function Kn(e, t, n = !0) {
	var r = [];
	qn(e, r, !0);
	var i = () => {
			(n && H(e), t && t());
		},
		a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function qn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= b;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || (!!(i.f & 32) && !!(e.f & 16));
				qn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Jn(e) {
	Yn(e, !0);
}
function Yn(e, t) {
	if (e.f & 8192) {
		((e.f ^= b), e.f & 1024 || (j(e, v), Yt.ensure().schedule(e)));
		for (var n = e.first; n !== null;) {
			var r = n.next,
				i = !!(n.f & 65536) || !!(n.f & 32);
			(Yn(n, i ? t : !1), (n = r));
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Xn(e, t) {
	if (e.nodes)
		for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
			var i = n === r ? null : z(n);
			(t.append(n), (n = i));
		}
}
var Zn = null,
	Qn = !1,
	U = !1;
function $n(e) {
	U = e;
}
var W = null,
	G = !1;
function K(e) {
	W = e;
}
var q = null;
function J(e) {
	q = e;
}
var Y = null;
function er(e) {
	W !== null && (Y ??= new Set()).add(e);
}
var X = null,
	Z = 0,
	Q = null;
function tr(e) {
	Q = e;
}
var nr = 1,
	rr = 0,
	ir = rr;
function ar(e) {
	ir = e;
}
function or() {
	return ++nr;
}
function sr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if ((t & 2 && (e.f &= ~ae), t & 4096)) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if ((sr(a) && Lt(a), a.wv > e.wv)) return !0;
		}
		t & 512 && N === null && j(e, _);
	}
	return !1;
}
function cr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Y !== null && Y.has(e)))
		for (var i = 0; i < r.length; i++) {
			var a = r[i];
			a.f & 2 ? cr(a, t, !1) : t === a && (n ? j(a, v) : a.f & 1024 && j(a, y), en(a));
		}
}
function lr(e) {
	var t = X,
		n = Z,
		r = Q,
		i = W,
		a = Y,
		o = k,
		s = G,
		c = ir,
		l = e.f;
	((X = null),
		(Z = 0),
		(Q = null),
		(W = l & 96 ? null : e),
		(Y = null),
		Ze(e.ctx),
		(G = !1),
		(ir = ++rr),
		e.ac !== null &&
			(xt(() => {
				e.ac.abort(ge);
			}),
			(e.ac = null)));
	try {
		e.f |= oe;
		var u = e.fn,
			d = u();
		e.f |= S;
		var f = e.deps,
			p = M?.is_fork;
		if (X !== null) {
			var m;
			if ((p || dr(e, Z), f !== null && Z > 0))
				for (f.length = Z + X.length, m = 0; m < X.length; m++) f[Z + m] = X[m];
			else e.deps = f = X;
			if (An() && e.f & 512) for (m = Z; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Z < f.length && (dr(e, Z), (f.length = Z));
		if (at() && Q !== null && !G && f !== null && !(e.f & 6146))
			for (m = 0; m < Q.length; m++) cr(Q[m], e);
		if (i !== null && i !== e) {
			if ((rr++, i.deps !== null)) for (let e = 0; e < n; e += 1) i.deps[e].rv = rr;
			if (t !== null) for (let e of t) e.rv = rr;
			Q !== null && (r === null ? (r = Q) : r.push(...Q));
		}
		return (e.f & 8388608 && (e.f ^= ce), d);
	} catch (e) {
		return dt(e);
	} finally {
		((e.f ^= oe), (X = t), (Z = n), (Q = r), (W = i), (Y = a), Ze(o), (G = s), (ir = c));
	}
}
function ur(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var a = r.call(n, e);
		if (a !== -1) {
			var o = n.length - 1;
			o === 0 ? (n = t.reactions = null) : ((n[a] = n[o]), n.pop());
		}
	}
	if (n === null && t.f & 2 && (X === null || !i.call(X, t))) {
		var s = t;
		(s.f & 512 && ((s.f ^= 512), (s.f &= ~ae)),
			s.v !== w && mt(s),
			s.ac !== null &&
				xt(() => {
					(s.ac.abort(ge), (s.ac = null), j(s, v));
				}),
			Rt(s),
			dr(s, 0));
	}
}
function dr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ur(e, n[r]);
}
function fr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		j(e, _);
		var n = q,
			r = Qn;
		((q = e), (Qn = !(t & 96)));
		try {
			(t & 16777232 ? Un(e) : Hn(e), Vn(e));
			var i = lr(e);
			((e.teardown = typeof i == `function` ? i : null), (e.wv = nr));
		} finally {
			((Qn = r), (q = n));
		}
	}
}
async function pr() {
	(await Promise.resolve(), Xt());
}
function mr() {
	return Yt.ensure().settled();
}
function $(e) {
	var t = !!(e.f & 2);
	if ((Zn?.add(e), W !== null && !G && !(q !== null && q.f & 16384) && (Y === null || !Y.has(e)))) {
		var n = W.deps;
		if (W.f & 2097152)
			e.rv < rr &&
				((e.rv = rr),
				X === null && n !== null && n[Z] === e ? Z++ : X === null ? (X = [e]) : X.push(e));
		else {
			((W.deps ??= []), i.call(W.deps, e) || W.deps.push(e));
			var r = e.reactions;
			r === null ? (e.reactions = [W]) : i.call(r, W) || r.push(W);
		}
	}
	if (U && on.has(e)) return on.get(e);
	if (t) {
		var a = e;
		if (U) {
			var o = a.v;
			return (((!(a.f & 1024) && a.reactions !== null) || gr(a)) && (o = It(a)), on.set(a, o), o);
		}
		var s = !(a.f & 512) && !G && W !== null && (Qn || !!(W.f & 512)),
			c = (a.f & S) === 0;
		(sr(a) && (s && (a.f |= 512), Lt(a)), s && !c && (zt(a), hr(a)));
	}
	if (N?.has(e)) return N.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function hr(e) {
	if (((e.f |= 512), e.deps !== null))
		for (let t of e.deps) ((t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (zt(t), hr(t)));
}
function gr(e) {
	if (e.v === w) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (on.has(t) || (t.f & 2 && gr(t))) return !0;
	return !1;
}
function _r(e) {
	var t = G;
	try {
		return ((G = !0), e());
	} finally {
		G = t;
	}
}
[
	...`allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback`.split(
		`.`,
	),
];
var vr = [`touchstart`, `touchmove`];
function yr(e) {
	return vr.includes(e);
}
var br = Symbol(`events`),
	xr = new Set(),
	Sr = new Set();
function Cr(e, t, n, r = {}) {
	function i(e) {
		if ((r.capture || Or.call(t, e), !e.cancelBubble)) return xt(() => n?.call(this, e));
	}
	return (
		e.startsWith(`pointer`) || e.startsWith(`touch`) || e === `wheel`
			? A(() => {
					t.addEventListener(e, i, r);
				})
			: t.addEventListener(e, i, r),
		i
	);
}
function wr(e, t, n, r, i) {
	var a = { capture: r, passive: i },
		o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) &&
		jn(() => {
			t.removeEventListener(e, o, a);
		});
}
function Tr(e, t, n) {
	(t[br] ??= {})[e] = n;
}
function Er(e) {
	for (var t = 0; t < e.length; t++) xr.add(e[t]);
	for (var n of Sr) n(e);
}
var Dr = null;
function Or(e) {
	var t = this,
		n = t.ownerDocument,
		r = e.type,
		i = e.composedPath?.() || [],
		a = i[0] || e.target;
	Dr = e;
	var s = 0,
		c = Dr === e && e[br];
	if (c) {
		var l = i.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[br] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (((a = i[s] || e.target), a !== t)) {
		o(e, `currentTarget`, {
			configurable: !0,
			get() {
				return a || n;
			},
		});
		var d = W,
			f = q;
		(K(null), J(null));
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[br]?.[r];
					h != null && (!a.disabled || e.target === a) && h.call(a, e);
				} catch (e) {
					p ? m.push(e) : (p = e);
				}
				if (e.cancelBubble) break;
				(s++, (a = s < i.length ? i[s] : null));
			}
			if (p) {
				for (let e of m)
					queueMicrotask(() => {
						throw e;
					});
				throw p;
			}
		} finally {
			((e[br] = t), delete e.currentTarget, K(d), J(f));
		}
	}
}
var kr =
	globalThis?.window?.trustedTypes &&
	globalThis.window.trustedTypes.createPolicy(`svelte-trusted-html`, { createHTML: (e) => e });
function Ar(e) {
	return kr?.createHTML(e) ?? e;
}
function jr(e) {
	var t = En(`template`);
	return ((t.innerHTML = Ar(e.replaceAll(`<!>`, `<!---->`))), t.content);
}
function Mr(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
function Nr(e, t) {
	var n = !!(t & 1),
		r = !!(t & 2),
		i,
		a = !e.startsWith(`<!>`);
	return () => {
		if (T) return (Mr(D, null), D);
		i === void 0 && ((i = jr(a ? e : `<!>` + e)), n || (i = R(i)));
		var t = r || _n ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = R(t),
				s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
function Pr(e = ``) {
	if (!T) {
		var t = L(e + ``);
		return (Mr(t, t), t);
	}
	var n = D;
	return (n.nodeType === 3 ? Dn(n) : (n.before((n = L())), O(n)), Mr(n, n), n);
}
function Fr() {
	if (T) return (Mr(D, null), D);
	var e = document.createDocumentFragment(),
		t = document.createComment(``),
		n = L();
	return (e.append(t, n), Mr(t, n), e);
}
function Ir(e, t) {
	if (T) {
		var n = q;
		((!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = D), Ue());
		return;
	}
	e !== null && e.before(t);
}
var Lr = !0;
function Rr(e, t) {
	var n = t == null ? `` : typeof t == `object` ? `${t}` : t;
	n !== (e[he] ??= e.nodeValue) && ((e[he] = n), (e.nodeValue = `${n}`));
}
function zr(e, t) {
	return Hr(e, t);
}
function Br(e, t) {
	(bn(), (t.intro = t.intro ?? !1));
	let n = t.target,
		r = T,
		i = D;
	try {
		for (var a = R(n); a && (a.nodeType !== 8 || a.data !== `[`);) a = z(a);
		if (!a) throw Le;
		(E(!0), O(a));
		let r = Hr(e, { ...t, anchor: a });
		return (E(!1), r);
	} catch (r) {
		if (
			r instanceof Error &&
			r.message
				.split(
					`
`,
				)
				.some((e) => e.startsWith(`https://svelte.dev/e/`))
		)
			throw r;
		return (
			r !== Le && console.warn(`Failed to hydrate: `, r),
			t.recover === !1 && Ae(),
			bn(),
			wn(n),
			E(!1),
			zr(e, t)
		);
	} finally {
		(E(r), O(i));
	}
}
var Vr = new Map();
function Hr(
	e,
	{ target: t, anchor: n, props: r = {}, events: i, context: o, intro: s = !0, transformError: c },
) {
	bn();
	var l = void 0,
		u = Fn(() => {
			var u = n ?? t.appendChild(L());
			wt(
				u,
				{ pending: () => {} },
				(t) => {
					rt({});
					var n = k;
					if (
						(o && (n.c = o),
						i && (r.$$events = i),
						T && Mr(t, null),
						(Lr = s),
						(l = e(t, r) || {}),
						(Lr = !0),
						T && ((q.nodes.end = D), D === null || D.nodeType !== 8 || D.data !== `]`))
					)
						throw (Ve(), Le);
					it();
				},
				c,
			);
			var d = new Set(),
				f = (e) => {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						if (!d.has(r)) {
							d.add(r);
							var i = yr(r);
							for (let e of [t, document]) {
								var a = Vr.get(e);
								a === void 0 && ((a = new Map()), Vr.set(e, a));
								var o = a.get(r);
								o === void 0
									? (e.addEventListener(r, Or, { passive: i }), a.set(r, 1))
									: a.set(r, o + 1);
							}
						}
					}
				};
			return (
				f(a(xr)),
				Sr.add(f),
				() => {
					for (var e of d)
						for (let n of [t, document]) {
							var r = Vr.get(n),
								i = r.get(e);
							--i == 0
								? (n.removeEventListener(e, Or), r.delete(e), r.size === 0 && Vr.delete(n))
								: r.set(e, i);
						}
					(Sr.delete(f), u !== n && u.parentNode?.removeChild(u));
				}
			);
		});
	return (Ur.set(l, u), l);
}
var Ur = new WeakMap();
function Wr(e, t) {
	let n = Ur.get(e);
	return n ? (Ur.delete(e), n(t)) : Promise.resolve();
}
var Gr = class {
	anchor;
	#e = new Map();
	#t = new Map();
	#n = new Map();
	#r = new Set();
	#i = !0;
	constructor(e, t = !0) {
		((this.anchor = e), (this.#i = t));
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e),
				n = this.#t.get(t);
			if (n) (Jn(n), this.#r.delete(t));
			else {
				var r = this.#n.get(t);
				r &&
					(Jn(r.effect),
					this.#t.set(t, r.effect),
					this.#n.delete(t),
					r.fragment.lastChild.remove(),
					this.anchor.before(r.fragment),
					(n = r.effect));
			}
			for (let [t, n] of this.#e) {
				if ((this.#e.delete(t), t === e)) break;
				let r = this.#n.get(n);
				r && (H(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						(Xn(r, t), t.append(L()), this.#n.set(e, { effect: r, fragment: t }));
					} else H(r);
					(this.#r.delete(e), this.#t.delete(e));
				};
				this.#i || !n ? (this.#r.add(e), Kn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M,
			r = Tn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(),
					a = L();
				(i.append(a), this.#n.set(e, { effect: V(() => t(a)), fragment: i }));
			} else
				this.#t.set(
					e,
					V(() => t(this.anchor)),
				);
		}
		if ((this.#e.set(n, e), r)) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			(n.oncommit(this.#a), n.ondiscard(this.#o));
		} else (T && (this.anchor = D), this.#a(n));
	}
};
function Kr(e, t, n = !1) {
	var r;
	T && ((r = D), Ue());
	var i = new Gr(e),
		a = n ? C : 0;
	function o(e, t) {
		if (T) {
			var n = qe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ke();
				(O(a), (i.anchor = a), E(!1), i.ensure(e, t), E(!0));
				return;
			}
		}
		i.ensure(e, t);
	}
	Bn(() => {
		var e = !1;
		(t((t, n = 0) => {
			((e = !0), o(n, t));
		}),
			e || o(-1, null));
	}, a);
}
function qr(e, t, n) {
	for (var r = [], i = t.length, o, s = t.length, c = 0; c < i; c++) {
		let n = t[c];
		Kn(
			n,
			() => {
				if (o) {
					if ((o.pending.delete(n), o.done.add(n), o.pending.size === 0)) {
						var t = e.outrogroups;
						(Jr(e, a(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null));
					}
				} else --s;
			},
			!1,
		);
	}
	if (s === 0) {
		var l = r.length === 0 && n !== null;
		if (l) {
			var u = n,
				d = u.parentNode;
			(wn(d), d.append(u), e.items.clear());
		}
		Jr(e, t, !l);
	} else ((o = { pending: new Set(t), done: new Set() }), (e.outrogroups ??= new Set()).add(o));
}
function Jr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? ((a.f |= ie), Xn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var Yr;
function Xr(e, t, r, i, o, s = null) {
	var c = e,
		l = new Map();
	if (t & 4) {
		var u = e;
		c = T ? O(R(u)) : u.appendChild(L());
	}
	T && Ue();
	var d = null,
		f = Pt(() => {
			var e = r();
			return n(e) ? e : e == null ? [] : a(e);
		}),
		p,
		m = new Map(),
		h = !0;
	function g(e) {
		v.effect.f & 16384 ||
			(v.pending.delete(e),
			(v.fallback = d),
			Qr(v, p, c, t, i),
			d !== null &&
				(p.length === 0
					? d.f & 33554432
						? ((d.f ^= ie), ei(d, null, c))
						: Jn(d)
					: Kn(d, () => {
							d = null;
						})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Bn(() => {
			p = $(f);
			var e = p.length;
			let n = !1;
			T && (qe(c) === `[!`) != (e === 0) && ((c = Ke()), O(c), E(!1), (n = !0));
			for (var a = new Set(), u = M, v = Tn(), y = 0; y < e; y += 1) {
				T && D.nodeType === 8 && D.data === `]` && ((c = D), (n = !0), E(!1));
				var b = p[y],
					x = i(b, y),
					S = h ? null : l.get(x);
				(S
					? (S.v && dn(S.v, b), S.i && dn(S.i, y), v && u.unskip_effect(S.e))
					: ((S = $r(l, h ? c : (Yr ??= L()), b, x, y, o, t, r)), h || (S.e.f |= ie), l.set(x, S)),
					a.add(x));
			}
			if (
				(e === 0 &&
					s &&
					!d &&
					(h ? (d = V(() => s(c))) : ((d = V(() => s((Yr ??= L())))), (d.f |= ie))),
				e > a.size && Se(``, ``, ``),
				T && e > 0 && O(Ke()),
				!h)
			) {
				if ((m.set(u, a), v)) {
					for (let [e, t] of l) a.has(e) || u.skip_effect(t.e);
					(u.oncommit(g), u.ondiscard(_));
				} else g(u);
			}
			(n && E(!0), $(f));
		}),
		flags: t,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d,
	};
	((h = !1), T && (c = D));
}
function Zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Qr(e, t, n, r, i) {
	var o = !!(r & 8),
		s = t.length,
		c = e.items,
		l = Zr(e.effect.first),
		u,
		d = null,
		f,
		p = [],
		m = [],
		h,
		g,
		_,
		v;
	if (o)
		for (v = 0; v < s; v += 1)
			((h = t[v]),
				(g = i(h, v)),
				(_ = c.get(g).e),
				_.f & 33554432 || (_.nodes?.a?.measure(), (f ??= new Set()).add(_)));
	for (v = 0; v < s; v += 1) {
		if (((h = t[v]), (g = i(h, v)), (_ = c.get(g).e), e.outrogroups !== null))
			for (let t of e.outrogroups) (t.pending.delete(_), t.done.delete(_));
		if (
			(_.f & 8192 && (Jn(_), o && (_.nodes?.a?.unfix(), (f ??= new Set()).delete(_))),
			_.f & 33554432)
		) {
			if (((_.f ^= ie), _ === l)) ei(_, null, n);
			else {
				var y = d ? d.next : l;
				(_ === e.effect.last && (e.effect.last = _.prev),
					_.prev && (_.prev.next = _.next),
					_.next && (_.next.prev = _.prev),
					ti(e, d, _),
					ti(e, _, y),
					ei(_, y, n),
					(d = _),
					(p = []),
					(m = []),
					(l = Zr(d.next)));
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0],
						x;
					d = b.prev;
					var S = p[0],
						ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ei(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					(ti(e, S.prev, ee.next),
						ti(e, d, S),
						ti(e, ee, b),
						(l = b),
						(d = ee),
						--v,
						(p = []),
						(m = []));
				} else
					(u.delete(_),
						ei(_, l, n),
						ti(e, _.prev, _.next),
						ti(e, _, d === null ? e.effect.first : d.next),
						ti(e, d, _),
						(d = _));
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;)
				((u ??= new Set()).add(l), m.push(l), (l = Zr(l.next)));
			if (l === null) continue;
		}
		(_.f & 33554432 || p.push(_), (d = _), (l = Zr(_.next)));
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups)
			t.pending.size === 0 && (Jr(e, a(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) (!(l.f & 8192) && l !== e.fallback && C.push(l), (l = Zr(l.next)));
		var te = C.length;
		if (te > 0) {
			var ne = r & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) C[v].nodes?.a?.fix();
			}
			qr(e, C, ne);
		}
	}
	o &&
		A(() => {
			if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
		});
}
function $r(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? (o & 16 ? ln(n) : un(n, !1, !1)) : null,
		l = o & 2 ? ln(i) : null;
	return {
		v: c,
		i: l,
		e: V(
			() => (
				a(t, c ?? n, l ?? i, s),
				() => {
					e.delete(r);
				}
			),
		),
	};
}
function ei(e, t, n) {
	if (e.nodes)
		for (
			var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n;
			r !== null;
		) {
			var o = z(r);
			if ((a.before(r), r === i)) return;
			r = o;
		}
}
function ti(e, t, n) {
	(t === null ? (e.effect.first = n) : (t.next = n),
		n === null ? (e.effect.last = t) : (n.prev = t));
}
function ni(e, t, ...n) {
	var r = new Gr(e);
	Bn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, C);
}
function ri(e) {
	return (t, ...n) => {
		var r = e(...n),
			i;
		T ? ((i = D), Ue()) : ((i = R(jr(r.render().trim()))), t.before(i));
		let a = r.setup?.(i);
		(Mr(i, i), typeof a == `function` && jn(a));
	};
}
function ii(e, t, n) {
	var r;
	T && ((r = D), Ue());
	var i = new Gr(e);
	Bn(() => {
		var e = t() ?? null;
		if (T && (qe(r) === `[`) != (e !== null)) {
			var a = Ke();
			(O(a), (i.anchor = a), E(!1), i.ensure(e, e && ((t) => n(t, e))), E(!0));
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, C);
}
var ai = () => performance.now(),
	oi = { tick: (e) => requestAnimationFrame(e), now: () => ai(), tasks: new Set() };
function si() {
	let e = oi.now();
	(oi.tasks.forEach((t) => {
		t.c(e) || (oi.tasks.delete(t), t.f());
	}),
		oi.tasks.size !== 0 && oi.tick(si));
}
function ci(e) {
	let t;
	return (
		oi.tasks.size === 0 && oi.tick(si),
		{
			promise: new Promise((n) => {
				oi.tasks.add((t = { c: e, f: n }));
			}),
			abort() {
				oi.tasks.delete(t);
			},
		}
	);
}
function li(e, t) {
	xt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ui(e) {
	if (e === `float`) return `cssFloat`;
	if (e === `offset`) return `cssOffset`;
	if (e.startsWith(`--`)) return e;
	let t = e.split(`-`);
	return t.length === 1
		? t[0]
		: t[0] +
				t
					.slice(1)
					.map((e) => e[0].toUpperCase() + e.slice(1))
					.join(``);
}
function di(e) {
	let t = {},
		n = e.split(`;`);
	for (let e of n) {
		let [n, r] = e.split(`:`);
		if (!n || r === void 0) break;
		let i = ui(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var fi = (e) => e;
function pi(e, t, n, r) {
	var i = !!(e & 1),
		a = !!(e & 2),
		o = i && a,
		s = !!(e & 4),
		c = o ? `both` : i ? `in` : `out`,
		l,
		u = t.inert,
		d = t.style.overflow,
		f,
		p;
	function m() {
		return xt(() => (l ??= n()(t, r?.() ?? {}, { direction: c })));
	}
	var h = {
			is_global: s,
			in() {
				if (((t.inert = u), !i)) {
					(p?.abort(), p?.reset?.());
					return;
				}
				(a || f?.abort(),
					(f = mi(
						t,
						m(),
						p,
						1,
						() => {
							li(t, `introstart`);
						},
						() => {
							(li(t, `introend`), f?.abort(), (f = l = void 0), (t.style.overflow = d));
						},
					)));
			},
			out(e) {
				if (!a) {
					(e?.(), (l = void 0));
					return;
				}
				((t.inert = !0),
					(p = mi(
						t,
						m(),
						f,
						0,
						() => {
							li(t, `outrostart`);
						},
						() => {
							(li(t, `outroend`), e?.());
						},
					)));
			},
			stop: () => {
				(f?.abort(), p?.abort());
			},
		},
		g = q;
	if (((g.nodes.t ??= []).push(h), i && Lr)) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ &&
			In(() => {
				_r(() => h.in());
			});
	}
}
function mi(e, t, n, r, i, a) {
	var o = r === 1;
	if (p(t)) {
		var s,
			c = !1;
		return (
			A(() => {
				c || (s = mi(e, t({ direction: o ? `in` : `out` }), n, r, i, a));
			}),
			{
				abort: () => {
					((c = !0), s?.abort());
				},
				deactivate: () => s.deactivate(),
				reset: () => s.reset(),
				t: () => s.t(),
			}
		);
	}
	if ((n?.deactivate(), !t?.duration && !t?.delay))
		return (i(), a(), { abort: m, deactivate: m, reset: m, t: () => r });
	let { delay: l = 0, css: u, tick: d, easing: f = fi } = t;
	var h = [];
	if (o && n === void 0 && (d && d(0, 1), u)) {
		var g = di(u(0, 1));
		h.push(g, g);
	}
	var _ = () => 1 - r,
		v = e.animate(h, { duration: l, fill: `forwards` });
	return (
		(v.onfinish = () => {
			(v.cancel(), i());
			var o = n?.t() ?? 1 - r;
			n?.abort();
			var s = r - o,
				c = t.duration * Math.abs(s),
				l = [];
			if (c > 0) {
				var p = !1;
				if (u)
					for (var m = Math.ceil(c / (1e3 / 60)), h = 0; h <= m; h += 1) {
						var g = o + s * f(h / m),
							y = di(u(g, 1 - g));
						(l.push(y), (p ||= y.overflow === `hidden`));
					}
				(p && (e.style.overflow = `hidden`),
					(_ = () => {
						var e = v.currentTime;
						return o + s * f(e / c);
					}),
					d &&
						ci(() => {
							if (v.playState !== `running`) return !1;
							var e = _();
							return (d(e, 1 - e), !0);
						}));
			}
			((v = e.animate(l, { duration: c, fill: `forwards` })),
				(v.onfinish = () => {
					((_ = () => r), d?.(r, 1 - r), a());
				}));
		}),
		{
			abort: () => {
				v && (v.cancel(), (v.effect = null), (v.onfinish = m));
			},
			deactivate: () => {
				a = m;
			},
			reset: () => {
				r === 0 && d?.(1, 0);
			},
			t: () => _(),
		}
	);
}
function hi(e, t) {
	let n = null,
		r = T;
	var i;
	if (T) {
		n = D;
		for (var a = R(document.head); a !== null && (a.nodeType !== 8 || a.data !== e);) a = z(a);
		if (a === null) E(!1);
		else {
			var o = z(a);
			(a.remove(), O(o));
		}
	}
	T || (i = document.head.appendChild(L()));
	try {
		Bn(() => {
			var e = V(() => t(i));
			e.f |= te;
		});
	} finally {
		r && (E(!0), O(n));
	}
}
var gi = [
	...` 	
\r\f\xA0\v﻿`,
];
function _i(e, t, n) {
	var r = e == null ? `` : `` + e;
	if ((t && (r = r ? r + ` ` + t : t), n)) {
		for (var i of Object.keys(n))
			if (n[i]) r = r ? r + ` ` + i : i;
			else if (r.length)
				for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
					var s = o + a;
					(o === 0 || gi.includes(r[o - 1])) && (s === r.length || gi.includes(r[s]))
						? (r = (o === 0 ? `` : r.substring(0, o)) + r.substring(s + 1))
						: (o = s);
				}
	}
	return r === `` ? null : r;
}
function vi(e, t = !1) {
	var n = t ? ` !important;` : `;`,
		r = ``;
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== `` && (r += ` ` + i + `: ` + a + n);
	}
	return r;
}
function yi(e) {
	return e[0] !== `-` || e[1] !== `-` ? e.toLowerCase() : e;
}
function bi(e, t) {
	if (t) {
		var n = ``,
			r,
			i;
		if ((Array.isArray(t) ? ((r = t[0]), (i = t[1])) : (r = t), e)) {
			e = String(e)
				.replaceAll(/\s*\/\*.*?\*\/\s*/g, ``)
				.trim();
			var a = !1,
				o = 0,
				s = !1,
				c = [];
			(r && c.push(...Object.keys(r).map(yi)), i && c.push(...Object.keys(i).map(yi)));
			var l = 0,
				u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (
					(s
						? f === `/` && e[d - 1] === `*` && (s = !1)
						: a
							? a === f && (a = !1)
							: f === `/` && e[d + 1] === `*`
								? (s = !0)
								: f === `"` || f === `'`
									? (a = f)
									: f === `(`
										? o++
										: f === `)` && o--,
					!s && a === !1 && o === 0)
				) {
					if (f === `:` && u === -1) u = d;
					else if (f === `;` || d === t - 1) {
						if (u !== -1) {
							var p = yi(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== `;` && d++;
								var m = e.substring(l, d).trim();
								n += ` ` + m + `;`;
							}
						}
						((l = d + 1), (u = -1));
					}
				}
			}
		}
		return (r && (n += vi(r)), i && (n += vi(i, !0)), (n = n.trim()), n === `` ? null : n);
	}
	return e == null ? null : String(e);
}
function xi(e, t, n, r, i, a) {
	var o = e[pe];
	if (T || o !== n || o === void 0) {
		var s = _i(n, r, a);
		((!T || s !== e.getAttribute(`class`)) &&
			(s == null ? e.removeAttribute(`class`) : t ? (e.className = s) : e.setAttribute(`class`, s)),
			(e[pe] = n));
	} else if (a && i !== a)
		for (var c in a) {
			var l = !!a[c];
			(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
		}
	return a;
}
function Si(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ci(e, t, n, r) {
	var i = e[me];
	if (T || i !== t) {
		var a = bi(t, r);
		((!T || a !== e.getAttribute(`style`)) &&
			(a == null ? e.removeAttribute(`style`) : (e.style.cssText = a)),
			(e[me] = t));
	} else
		r && (Array.isArray(r) ? (Si(e, n?.[0], r[0]), Si(e, n?.[1], r[1], `important`)) : Si(e, n, r));
	return r;
}
var wi = Symbol(`is custom element`),
	Ti = Symbol(`is html`),
	Ei = _e ? `link` : `LINK`;
function Di(e, t, n, r) {
	var i = Oi(e);
	(T &&
		((i[t] = e.getAttribute(t)),
		t === `src` || t === `srcset` || (t === `href` && e.nodeName === Ei))) ||
		(i[t] !== (i[t] = n) &&
			(t === `loading` && (e[de] = n),
			n == null
				? e.removeAttribute(t)
				: typeof n != `string` && Ai(e).includes(t)
					? (e[t] = n)
					: e.setAttribute(t, n)));
}
function Oi(e) {
	return (e[fe] ??= { [wi]: e.nodeName.includes(`-`), [Ti]: e.namespaceURI === Re });
}
var ki = new Map();
function Ai(e) {
	var t = e.getAttribute(`is`) || e.nodeName,
		n = ki.get(t);
	if (n) return n;
	ki.set(t, (n = []));
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in ((r = c(i)), r))
			r[o].set && o !== `innerHTML` && o !== `textContent` && o !== `innerText` && n.push(o);
		i = d(i);
	}
	return n;
}
function ji(e, t) {
	return e === t || e?.[le] === t;
}
function Mi(e = {}, t, n, r) {
	var i = k.r,
		a = q;
	return (
		In(() => {
			var o, s;
			return (
				Rn(() => {
					((o = s),
						(s = r?.() || []),
						_r(() => {
							ji(n(...s), e) || (t(e, ...s), o && ji(n(...o), e) && t(null, ...o));
						}));
				}),
				() => {
					let r = a;
					for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
					let o = () => {
							s && ji(n(...s), e) && t(null, ...s);
						},
						c = r.teardown;
					r.teardown = () => {
						(o(), c?.());
					};
				}
			);
		}),
		e
	);
}
function Ni(e, t, n, r) {
	var i = !0,
		a = !!(n & 8),
		o = !!(n & 16),
		c = r,
		l = !0,
		u = void 0,
		d = () => (o && i ? ((u ??= At(r)), $(u)) : (l && ((l = !1), (c = o ? _r(r) : r)), c));
	let f;
	if (a) {
		var p = le in e || ue in e;
		f = s(e, t)?.set ?? (p && t in e ? (n) => (e[t] = n) : void 0);
	}
	var m,
		h = !1;
	(a ? ([m, h] = bt(() => e[t])) : (m = e[t]),
		m === void 0 && r !== void 0 && ((m = d()), f && (i && Me(t), f(m))));
	var g = i
		? () => {
				var n = e[t];
				return n === void 0 ? d() : ((l = !0), n);
			}
		: () => {
				var n = e[t];
				return (n !== void 0 && (c = void 0), n === void 0 ? c : n);
			};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return function (e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		};
	}
	var v = !1,
		y = (n & 1 ? At : Pt)(() => ((v = !1), g()));
	a && $(y);
	var b = q;
	return function (e, t) {
		if (arguments.length > 0) {
			let n = t ? $(y) : i && a ? hn(e) : e;
			return (I(y, n), (v = !0), c !== void 0 && (c = n), e);
		}
		return (U && v) || b.f & 16384 ? y.v : $(y);
	};
}
function Pi(e) {
	return class extends Fi {
		constructor(t) {
			super({ component: e, ...t });
		}
	};
}
var Fi = class {
	#e;
	#t;
	constructor(e) {
		var t = new Map(),
			n = (e, n) => {
				var r = un(n, !1, !1);
				return (t.set(e, r), r);
			};
		let r = new Proxy(
			{ ...(e.props || {}), $$events: {} },
			{
				get(e, r) {
					return $(t.get(r) ?? n(r, Reflect.get(e, r)));
				},
				has(e, r) {
					return r === ue || ($(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
				},
				set(e, r, i) {
					return (I(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i));
				},
			},
		);
		((this.#t = (e.hydrate ? Br : zr)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError,
		})),
			(!e?.props?.$$host || e.sync === !1) && Xt(),
			(this.#e = r.$$events));
		for (let e of Object.keys(this.#t))
			e !== `$set` &&
				e !== `$destroy` &&
				e !== `$on` &&
				o(this, e, {
					get() {
						return this.#t[e];
					},
					set(t) {
						this.#t[e] = t;
					},
					enumerable: !0,
				});
		((this.#t.$set = (e) => {
			Object.assign(r, e);
		}),
			(this.#t.$destroy = () => {
				Wr(this.#t);
			}));
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		let n = (...e) => t.call(this, ...e);
		return (
			this.#e[e].push(n),
			() => {
				this.#e[e] = this.#e[e].filter((e) => e !== n);
			}
		);
	}
	$destroy() {
		this.#t.$destroy();
	}
};
function Ii(e, t) {
	if ((ve(`hydratable`), T)) {
		let t = window.__svelte?.h;
		if (t?.has(e)) return t.get(e);
		Be(e);
	}
	return t();
}
var Li = t({
	afterUpdate: () => Wi,
	beforeUpdate: () => Ui,
	createContext: () => Qe,
	createEventDispatcher: () => Hi,
	createRawSnippet: () => ri,
	flushSync: () => Xt,
	fork: () => rn,
	getAbortSignal: () => Ri,
	getAllContexts: () => nt,
	getContext: () => $e,
	hasContext: () => tt,
	hydratable: () => Ii,
	hydrate: () => Br,
	mount: () => zr,
	onDestroy: () => Bi,
	onMount: () => zi,
	setContext: () => et,
	settled: () => mr,
	tick: () => pr,
	unmount: () => Wr,
	untrack: () => _r,
});
function Ri() {
	return (W === null && ke(), (W.ac ??= new AbortController()).signal);
}
function zi(e) {
	(k === null && ye(`onMount`),
		Mn(() => {
			let t = _r(e);
			if (typeof t == `function`) return t;
		}));
}
function Bi(e) {
	(k === null && ye(`onDestroy`), zi(() => () => _r(e)));
}
function Vi(e, t, { bubbles: n = !1, cancelable: r = !1 } = {}) {
	return new CustomEvent(e, { detail: t, bubbles: n, cancelable: r });
}
function Hi() {
	let e = k;
	return (
		e === null && ye(`createEventDispatcher`),
		(t, r, i) => {
			let a = e.s.$$events?.[t];
			if (a) {
				let o = n(a) ? a.slice() : [a],
					s = Vi(t, r, i);
				for (let t of o) t.call(e.x, s);
				return !s.defaultPrevented;
			}
			return !0;
		}
	);
}
function Ui(e) {
	(k === null && ye(`beforeUpdate`), k.l === null && je(`beforeUpdate`), Gi(k).b.push(e));
}
function Wi(e) {
	(k === null && ye(`afterUpdate`), k.l === null && je(`afterUpdate`), Gi(k).a.push(e));
}
function Gi(e) {
	var t = e.l;
	return (t.u ??= { a: [], b: [], m: [] });
}
export {
	gn as A,
	it as B,
	$ as C,
	zn as D,
	_r as E,
	I as F,
	et as H,
	F as I,
	Nt as L,
	Sn as M,
	Cn as N,
	Mn as O,
	hn as P,
	vt as R,
	wr as S,
	pr as T,
	We as U,
	rt as V,
	Fr as _,
	Mi as a,
	Er as b,
	xi as c,
	ii as d,
	ni as f,
	Ir as g,
	Rr as h,
	Ni as i,
	xn as j,
	Pn as k,
	hi as l,
	Kr as m,
	zi as n,
	Di as o,
	Xr as p,
	Pi as r,
	Ci as s,
	Li as t,
	pi as u,
	Nr as v,
	mr as w,
	Tr as x,
	Pr as y,
	$e as z,
};
