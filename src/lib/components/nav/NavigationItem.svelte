<script lang="ts">
	import { fade } from 'svelte/transition';

	export let isActive = false;

	export let href = '';
</script>

<li>
	<a
		{href}
		class={'relative block px-3 py-2.5 transition duration-200 ' +
			(isActive
				? 'text-cyan-500 dark:text-cyan-400'
				: 'hover:text-cyan-500 dark:hover:text-cyan-400')}
	>
		<slot />
		{#if isActive}
			<span
				transition:fade
				class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/40 dark:to-cyan-400/0"
			/>
		{/if}
	</a>
</li>
