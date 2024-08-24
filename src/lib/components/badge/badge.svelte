<script lang="ts">
	import { cn } from '$lib/utils';
	import { badgeVariants, type Size, type Variant } from '.';

	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export let variant: Variant = 'default';
	export let size: Size = 'default';
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(badgeVariants({ size, variant, className }))}
	{...$$restProps}
>
	{#if variant?.includes('dot')}
		<svg class="h-1.5 w-1.5" viewBox="0 0 6 6" aria-hidden="true">
			<circle cx="3" cy="3" r="3" />
		</svg>
	{/if}
	<slot />
</svelte:element>
