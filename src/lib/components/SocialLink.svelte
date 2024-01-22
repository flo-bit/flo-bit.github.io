<script lang="ts">
	export let href: string;

	let classes = '';

	export { classes as class };
</script>

<li class="flex {classes}">
	<a
		target="_blank"
		{href}
		class="group flex items-center text-sm font-medium text-zinc-800 transition duration-100 hover:text-cyan-500 dark:text-zinc-200 dark:hover:text-cyan-500"
	>
		<div class="h-6 w-6 flex-none fill-zinc-500 transition duration-100 group-hover:fill-cyan-500 flex items-center justify-center">
			<slot name="icon" />
		</div>
		<span class="ml-4"><slot /></span>
	</a>
</li>
