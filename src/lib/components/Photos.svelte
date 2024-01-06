<script lang="ts">
	let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

	export let images: { href?: string; src: string; alt: string }[];
</script>

<div class="bg-black overflow-x-scroll no-scrollbar pt-10">
	<div class="flex gap-5 py-4 sm:gap-8 2xl:justify-center">
		{#each images as image, index}
			<div
				class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl ring-1 ring-white/10 bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl {rotations[
					index % rotations.length
				]}"
			>
				<img src={image.src} alt={image.alt} class="absolute inset-0 h-full w-full object-cover" />
				{#if image.href}
					<a href={image.href}>
						<div class="sr-only">{image.alt}</div>
						<div class="absolute inset-0 rounded-xl"></div>
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>
