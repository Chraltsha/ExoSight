/**
 * Module-level reactive state for the search/chat page.
 * Persists across in-app navigation but resets on a hard refresh.
 */

export const chatState = $state({
	/** @type {{ role: 'user' | 'bot', text: string }[]} */
	messages: [],
	chatStarted: false,
	isLoading: false
});

/** Stub: replace with a real API call once the backend is ready. */
export async function sendToLLM(query) {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return `[Stub response] You asked about: "${query}"`;
}
