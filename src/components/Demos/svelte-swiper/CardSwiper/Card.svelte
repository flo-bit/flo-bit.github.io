<script lang="ts">
	import { fade } from "svelte/transition";

	export let element: HTMLElement;

	export let color: string = '';
	export let title: string = '';
	export let description: string = '';
	export let image: string | undefined = undefined;
</script>

<div
	class="w-full h-full absolute cursor-grab ease-in-out rounded-3xl touch-none select-none {color}"
	bind:this={element}
>
	{#key image}
		{#if image}
			<img class="w-full h-full rounded-3xl object-cover" src={image} alt="" />
		{/if}
	{/key}
	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 rounded-b-xl"></div>
	<div class="p-4 absolute bottom-4 w-full flex justify-center text-white">
		<div class="flex items-center flex-col">
			<h3 class="text-3xl font-semibold pb-4">{title}</h3>
			<p>{description}</p>
		</div>
	</div>
</div>
