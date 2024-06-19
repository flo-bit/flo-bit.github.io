<script lang="ts">
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade, slide } from 'svelte/transition';
	import MobileNavigationItem from './MobileNavigationItem.svelte';

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
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
	class="ml-2 h-auto w-4 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
		aria-hidden="true"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
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
			class="fixed inset-x-4 bottom-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 backdrop-blur-md ring-zinc-900/5 dark:bg-black dark:ring-white/10"
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
					<!-- <MobileNavigationItem current="home" active={active} hide={hide} /> -->
					<MobileNavigationItem current="about" active={active} hide={hide} />
					<MobileNavigationItem current="projects" active={active} hide={hide} />
					<MobileNavigationItem current="articles" active={active} hide={hide} />
					<MobileNavigationItem current="learning" active={active} hide={hide} />
					<MobileNavigationItem current="contact" active={active} hide={hide} />
				</ul>
			</nav>
		</div>
	</div>
{/if}
