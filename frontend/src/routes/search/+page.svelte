<script>
	import { tick } from 'svelte';
	import { chatState, sendToLLM } from '$lib/searchState.svelte.js';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import IdleView from '$lib/components/search/IdleView.svelte';
	import ChatBubble from '$lib/components/search/ChatBubble.svelte';
	import TypingIndicator from '$lib/components/search/TypingIndicator.svelte';
	import MessageInput from '$lib/components/search/MessageInput.svelte';
	import Sidebar from '$lib/components/search/Sidebar.svelte';

	let messageListEl = $state(null);

	async function scrollToBottom() {
		await tick();
		if (messageListEl) {
			messageListEl.scrollTop = messageListEl.scrollHeight;
		}
	}

	async function startChat(query) {
		chatState.messages.push({ role: 'user', text: query });
		chatState.chatStarted = true;
		chatState.isLoading = true;
		await scrollToBottom();

		const reply = await sendToLLM(query);

		chatState.messages.push({ role: 'bot', text: reply });
		chatState.isLoading = false;
		await scrollToBottom();
	}

	async function handleUserMessage(text) {
		chatState.messages.push({ role: 'user', text });
		chatState.isLoading = true;
		await scrollToBottom();

		const reply = await sendToLLM(text);

		chatState.messages.push({ role: 'bot', text: reply });
		chatState.isLoading = false;
		await scrollToBottom();
	}
</script>

<PageTransition>
	<div class="search-page">
		<Sidebar />

		<div class="search-main">
			{#if !chatState.chatStarted}
				<IdleView onSubmit={startChat} />
			{:else}
				<div class="chat-view">
					<div class="chat-window">
						<div class="message-list" bind:this={messageListEl}>
							{#each chatState.messages as message (message)}
								<ChatBubble role={message.role} text={message.text} />
							{/each}

							{#if chatState.isLoading}
								<TypingIndicator />
							{/if}
						</div>

						<MessageInput onSend={handleUserMessage} disabled={chatState.isLoading} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</PageTransition>
