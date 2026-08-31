/**
 * Module-level reactive state for the exoplanet search panel.
 * Kept separate from chatState so the two concerns don't mix.
 * Persists across in-app navigation, resets on hard refresh.
 */

/** @typedef {{ name: string, hostname: string, ra: number, dec: number }} ExoplanetResult */

export const searchState = $state({
	query: '',

	/** @type {ExoplanetResult[]} */
	results: [],

	isLoading: false,

	/** @type {string | null} */
	error: null,

	/** @type {string | null} */
	nextCursor: null,

	hasMore: false,
});

/** @type {AbortController | null} */
let activeController = null;

/**
 * Search NASA for planets whose name contains `q`.
 * Replaces the current results list (first-page / new query).
 * Cancels any in-flight request before starting a new one.
 *
 * @param {string} q
 */
export async function searchPlanets(q) {
	if (activeController) {
		activeController.abort();
	}

	activeController = new AbortController();

	searchState.isLoading = true;
	searchState.error = null;
	searchState.results = [];
	searchState.nextCursor = null;
	searchState.hasMore = false;

	try {
		const res = await fetch(`/api/exoplanets/search?q=${encodeURIComponent(q)}&limit=5`, {
			signal: activeController.signal,
		});

		if (!res.ok) {
			throw new Error(`Search failed (${res.status})`);
		}

		const data = await res.json();

		searchState.results = data.items;
		searchState.nextCursor = data.next_cursor;
		searchState.hasMore = data.has_more;
	} catch (err) {
		if (err.name !== 'AbortError') {
			searchState.error = err.message;
		}
	} finally {
		searchState.isLoading = false;
		activeController = null;
	}
}

/**
 * Load the next page and append to existing results.
 * Only call when searchState.hasMore is true.
 *
 * @param {string} q  The same query that produced the current page.
 */
export async function loadMorePlanets(q) {
	if (!searchState.hasMore || searchState.isLoading) {
		return;
	}

	searchState.isLoading = true;
	searchState.error = null;

	try {
		const url =
			`/api/exoplanets/search?q=${encodeURIComponent(q)}` +
			`&limit=20&cursor=${encodeURIComponent(searchState.nextCursor ?? '')}`;

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Load more failed (${res.status})`);
		}

		const data = await res.json();

		searchState.results.push(...data.items);
		searchState.nextCursor = data.next_cursor;
		searchState.hasMore = data.has_more;
	} catch (err) {
		searchState.error = err.message;
	} finally {
		searchState.isLoading = false;
	}
}
