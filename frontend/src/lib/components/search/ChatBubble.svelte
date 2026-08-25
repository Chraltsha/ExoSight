<script>
	/** @type {{ role: 'user' | 'bot', text: string }} */
	let { role, text } = $props();
</script>

<div class="bubble-row" class:bubble-row--user={role === 'user'} class:bubble-row--bot={role === 'bot'}>
	<div class="bubble" class:bubble--user={role === 'user'} class:bubble--bot={role === 'bot'}>
		{text}
	</div>
</div>
