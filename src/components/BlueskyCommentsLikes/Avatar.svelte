<script lang="ts">
	import { cn } from '../../stylingUtils';

	type Props = {
		link?: string;
		size?: string;
		src?: string;
		alt?: string;
		class?: string;
	};

	const { link, size = 'size-11', src, alt, class: className }: Props = $props();
</script>

{#snippet avatar()}
	<div
		class={cn(
			'overflow-hidden rounded-full border border-base-400/50 bg-base-100 dark:border-base-700 dark:bg-base-800',
			size,
			className
		)}
	>
		{#if src}
			<img loading="lazy" class="h-full w-full object-cover" {src} {alt} />
		{:else}
			<svg
				class="size-full text-base-300 dark:text-base-600"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		{/if}
	</div>
{/snippet}

{#if link}
	<a href={link} class="inline-block" target="_blank" rel="noopener noreferrer nofollow">
		{@render avatar()}
	</a>
{:else}
	{@render avatar()}
{/if}
