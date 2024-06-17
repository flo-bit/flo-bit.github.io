<script lang="ts">
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade, slide } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});

	let classes = '';

	export { classes as class };

	function hide() {
		open.set(false);
	}

	export let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' | 'articles' = 'home';
</script>

<button
	type="button"
	class="group flex items-center rounded-full mr-4 bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-white/5 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 {classes}"
	use:melt={$trigger}
	aria-label="Update dimensions"
>
	menu
	<svg
		viewBox="0 0 8 6"
		aria-hidden="true"
		class="ml-2 h-auto w-4 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
	>
		<path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" />
	</svg>
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div
		transition:fade={{ duration: 100 }}
		class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/50 transition-all duration-300"
	/>

	<div use:melt={$content}>
		<div use:melt={$arrow} />
		<div
			class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 backdrop-blur-md ring-zinc-900/5 dark:bg-black dark:ring-white/10"
		>
			<div class="flex flex-row-reverse items-center justify-between">
				<button aria-label="Close menu" class="-m-1 p-1" use:melt={$close}>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
					>
						<path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" fill="none" stroke="currentColor" />
					</svg>
				</button>
				<h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">navigation</h2>
			</div>
			<nav class="mt-6">
				<ul
					class="-my-2 divide-y divide-white/10 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-100"
				>
					<!-- <li>
						<a
							href="#home"
							class="block py-2 {active == 'home' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							Home
						</a>
					</li> -->
					<li>
						<a
							href="#about"
							class="block py-2 {active == 'about' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							about
						</a>
					</li>
					<li>
						<a
							href="#projects"
							class="block py-2 {active == 'projects' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							projects
						</a>
					</li>
					<li>
						<a
							href="#articles"
							class="block py-2 {active == 'articles' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							articles
						</a>
					</li>
					<li>
						<a
							href="#learning"
							class="block py-2 {active == 'learning' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							learning
						</a>
					</li>
					<li>
						<a
							href="#contact"
							class="block py-2 {active == 'contact' ? 'dark:text-cyan-400' : ''}"
							on:click={hide}
						>
							contact
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
{/if}
