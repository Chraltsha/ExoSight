import "../../../chunks/index-server.js";
import { S as escape_html, r as bind_props, x as attr } from "../../../chunks/server.js";
import { t as PageTransition } from "../../../chunks/PageTransition.js";
//#region src/lib/components/TelescopeSettings.svelte
function TelescopeSettings($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {{ hFov: number, vFov: number }} */
		let { hFov = 10, vFov = 7 } = $$props;
		$$renderer.push(`<div class="search-section"><span class="search-section-label">Telescope Settings</span> <div class="search-section-fields"><label class="search-field-label">Horizontal FOV (°) <input class="search-field-input" type="number" min="0" step="0.1"${attr("value", hFov)}/></label> <label class="search-field-label">Vertical FOV (°) <input class="search-field-input" type="number" min="0" step="0.1"${attr("value", vFov)}/></label></div></div>`);
		bind_props($$props, {
			hFov,
			vFov
		});
	});
}
//#endregion
//#region src/lib/components/DateTimeSettings.svelte
function DateTimeSettings($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {{ date: string, time: string, observationLength: number }} */
		let { date = "", time = "", observationLength = 60 } = $$props;
		$$renderer.push(`<div class="search-section"><span class="search-section-label">Date &amp; Time</span> <div class="search-section-fields"><label class="search-field-label">Date <input class="search-field-input" type="date"${attr("value", date)}/></label> <label class="search-field-label">Time <input class="search-field-input" type="time"${attr("value", time)}/></label> <label class="search-field-label">Observation Length (min) <input class="search-field-input" type="number" min="1"${attr("value", observationLength)}/></label></div></div>`);
		bind_props($$props, {
			date,
			time,
			observationLength
		});
	});
}
//#endregion
//#region src/lib/components/LocationSettings.svelte
function LocationSettings($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {{ lat: number, lon: number }} */
		let { lat = 0, lon = 0 } = $$props;
		$$renderer.push(`<div class="search-section"><span class="search-section-label">Location</span> <div class="search-section-fields"><label class="search-field-label">Latitude <input class="search-field-input" type="number" min="-90" max="90" step="0.000001"${attr("value", lat)}/></label> <label class="search-field-label">Longitude <input class="search-field-input" type="number" min="-180" max="180" step="0.000001"${attr("value", lon)}/></label></div> <div class="location-map"></div></div>`);
		bind_props($$props, {
			lat,
			lon
		});
	});
}
//#endregion
//#region src/routes/search/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		function todayDate() {
			return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		}
		function currentTime() {
			return (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5);
		}
		let planetName = "";
		let hFov = 10;
		let vFov = 7;
		let date = todayDate();
		let time = currentTime();
		let observationLength = 60;
		let lat = 0;
		let lon = 0;
		let isLoading = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			PageTransition($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<main class="search-new-page"><div class="search-body-row"><div class="search-inputs-col"><h2 class="search-page-heading">What exoplanet are we looking for?</h2> <div class="planet-autocomplete-wrapper"><div class="planet-input-row"><svg class="planet-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="22" y2="22"></line></svg> <input type="text" class="search-field-input planet-name-input" placeholder="e.g. Kepler-22 b"${attr("value", planetName)} autocomplete="off"/></div> `);
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="search-three-col">`);
					TelescopeSettings($$renderer, {
						get hFov() {
							return hFov;
						},
						set hFov($$value) {
							hFov = $$value;
							$$settled = false;
						},
						get vFov() {
							return vFov;
						},
						set vFov($$value) {
							vFov = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----> `);
					DateTimeSettings($$renderer, {
						get date() {
							return date;
						},
						set date($$value) {
							date = $$value;
							$$settled = false;
						},
						get time() {
							return time;
						},
						set time($$value) {
							time = $$value;
							$$settled = false;
						},
						get observationLength() {
							return observationLength;
						},
						set observationLength($$value) {
							observationLength = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----> `);
					LocationSettings($$renderer, {
						get lat() {
							return lat;
						},
						set lat($$value) {
							lat = $$value;
							$$settled = false;
						},
						get lon() {
							return lon;
						},
						set lon($$value) {
							lon = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----></div></div> <div class="search-output-col"><button class="search-submit-btn"${attr("disabled", isLoading, true)}><svg class="search-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(-30 12 12)"></ellipse></svg> ${escape_html("Search")}</button> <div class="search-section search-output-section"><span class="exosight-label">Exosight says…</span> <div class="exosight-output-box">`);
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="exosight-placeholder">Fill in the fields above and hit Search to get your observation report</span>`);
					$$renderer.push(`<!--]--></div></div></div></div></main>`);
				},
				$$slots: { default: true }
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };
