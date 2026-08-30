import { n as tick } from "../../../chunks/index-server.js";
import { b as attr, i as ensure_array_like, t as attr_class, x as escape_html } from "../../../chunks/server.js";
import { t as PageTransition } from "../../../chunks/PageTransition.js";
//#region src/lib/searchState.svelte.js
var chatState = {
	messages: [],
	chatStarted: false,
	isLoading: false
};
async function sendToLLM(query) {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return `[Stub response] You asked about: "${query}"`;
}
//#endregion
//#region src/lib/exoplanetSearchState.svelte.js
var searchState = {
	query: "",
	results: [],
	isLoading: false,
	error: null,
	nextCursor: null,
	hasMore: false
};
//#endregion
//#region src/lib/components/search/IdleView.svelte
function IdleView($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* Called by the parent (+page.svelte) when the user confirms a planet selection.
		* Receives the full result object so the page has RA/Dec without re-fetching.
		*
		* @type {{ onSelect: (planet: { name: string, hostname: string, ra: number, dec: number }) => void }}
		*/
		let { onSelect } = $$props;
		$$renderer.push(`<div class="idle-view"><h2 class="idle-heading">What exoplanet are you looking for?</h2> <div class="search-input-wrapper"><div class="search-input-row"><input class="idle-searchbar" type="text" placeholder="e.g. Kepler-22 b, TRAPPIST-1 b, HD 209458 b..."${attr("value", "")}/> `);
		if (searchState.isLoading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="search-spinner" aria-label="Searching"></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (searchState.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="search-status search-status--error">${escape_html(searchState.error)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (searchState.results.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="search-results"><ul class="search-results-list"><!--[-->`);
			const each_array = ensure_array_like(searchState.results);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let planet = each_array[$$index];
				$$renderer.push(`<li><button class="search-result-item"><span class="result-name">${escape_html(planet.name)}</span> <span class="result-host">${escape_html(planet.hostname)}</span></button></li>`);
			}
			$$renderer.push(`<!--]--></ul> `);
			if (searchState.hasMore) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="search-results-footer"><button class="load-more-btn"${attr("disabled", searchState.isLoading, true)}>${escape_html(searchState.isLoading ? "Loading…" : "Load more")}</button></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/lib/components/search/ChatBubble.svelte
function ChatBubble($$renderer, $$props) {
	/** @type {{ role: 'user' | 'bot', text: string }} */
	let { role, text } = $$props;
	$$renderer.push(`<div${attr_class("bubble-row", void 0, {
		"bubble-row--user": role === "user",
		"bubble-row--bot": role === "bot"
	})}><div${attr_class("bubble", void 0, {
		"bubble--user": role === "user",
		"bubble--bot": role === "bot"
	})}>${escape_html(text)}</div></div>`);
}
//#endregion
//#region src/lib/components/search/TypingIndicator.svelte
function TypingIndicator($$renderer) {
	$$renderer.push(`<div class="bubble-row bubble-row--bot"><div class="bubble bubble--bot typing-indicator"><span class="dot"></span> <span class="dot"></span> <span class="dot"></span></div></div>`);
}
//#endregion
//#region src/lib/components/search/MessageInput.svelte
function MessageInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {{ onSend: (text: string) => void, disabled?: boolean }} */
		let { onSend, disabled = false } = $$props;
		$$renderer.push(`<div class="message-input-bar"><input class="message-input" type="text" placeholder="Ask about exoplanets..."${attr("value", "")}${attr("disabled", disabled, true)}/> <button class="send-btn"${attr("disabled", disabled, true)}>Send</button></div>`);
	});
}
//#endregion
//#region src/lib/components/search/Sidebar.svelte
function Sidebar($$renderer) {
	$$renderer.push(`<div class="sidebar-hover-zone" role="button" tabindex="0" aria-label="Open search settings"><div class="pull-tab"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div></div> `);
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/routes/search/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		async function scrollToBottom() {
			await tick();
		}
		/**
		* Called when the user clicks a planet in the search results.
		* The planet object carries RA/Dec so we never need to re-resolve.
		*
		* @param {{ name: string, hostname: string, ra: number, dec: number }} planet
		*/
		async function handlePlanetSelect(planet) {
			const query = `Tell me about ${planet.name} (RA: ${planet.ra.toFixed(4)}°, Dec: ${planet.dec.toFixed(4)}°)`;
			chatState.messages.push({
				role: "user",
				text: `Selected: ${planet.name}`
			});
			chatState.chatStarted = true;
			chatState.isLoading = true;
			await scrollToBottom();
			const reply = await sendToLLM(query);
			chatState.messages.push({
				role: "bot",
				text: reply
			});
			chatState.isLoading = false;
			await scrollToBottom();
		}
		async function handleUserMessage(text) {
			chatState.messages.push({
				role: "user",
				text
			});
			chatState.isLoading = true;
			await scrollToBottom();
			const reply = await sendToLLM(text);
			chatState.messages.push({
				role: "bot",
				text: reply
			});
			chatState.isLoading = false;
			await scrollToBottom();
		}
		PageTransition($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="search-page">`);
				Sidebar($$renderer, {});
				$$renderer.push(`<!----> <div class="search-main">`);
				if (!chatState.chatStarted) {
					$$renderer.push("<!--[0-->");
					IdleView($$renderer, { onSelect: handlePlanetSelect });
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="chat-view"><div class="chat-window"><div class="message-list"><!--[-->`);
					const each_array = ensure_array_like(chatState.messages);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let message = each_array[$$index];
						ChatBubble($$renderer, {
							role: message.role,
							text: message.text
						});
					}
					$$renderer.push(`<!--]--> `);
					if (chatState.isLoading) {
						$$renderer.push("<!--[0-->");
						TypingIndicator($$renderer, {});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> `);
					MessageInput($$renderer, {
						onSend: handleUserMessage,
						disabled: chatState.isLoading
					});
					$$renderer.push(`<!----></div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
export { _page as default };
