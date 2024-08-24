<script lang="ts">
	export let codeUrl: string | undefined;
	export let projectUrl: string | undefined;
</script>

{#if codeUrl}
	<a
		href={codeUrl}
		target="_blank"
		class="flex w-full items-center justify-center rounded-xl bg-white/10 px-8 py-3 text-base font-medium text-white hover:bg-white/20"
		>check out the code</a
	>
{/if}

{#if projectUrl}
	<a
		href={projectUrl}
		target="_blank"
		class="flex w-full items-center justify-center rounded-xl dark:text-black bg-accent-400 px-8 py-3 text-base font-medium text-white hover:bg-accent-300"
		>launch project</a
	>
{/if}
