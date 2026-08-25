/**
 * Shared transition direction for page-to-page fly animations.
 * Set by +layout.svelte's onNavigate before the DOM is swapped.
 */
export const transitionState = $state({ direction: 1 });
