<script>
	/** @type {{ onSend: (text: string) => void, disabled?: boolean }} */
	let { onSend, disabled = false } = $props();

	let inputValue = $state('');

	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey && inputValue.trim()) {
			send();
		}
	}

	function send() {
		const text = inputValue.trim();
		if (!text || disabled) return;
		inputValue = '';
		onSend(text);
	}
</script>

<div class="message-input-bar">
	<input
		class="message-input"
		type="text"
		placeholder="Ask about exoplanets..."
		bind:value={inputValue}
		onkeydown={handleKeydown}
		{disabled}
	/>
	<button class="send-btn" onclick={send} {disabled}>
		Send
	</button>
</div>
