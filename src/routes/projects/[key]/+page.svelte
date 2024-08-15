<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import ProjectV1 from '$lib/components/ProjectV1.svelte';
	import ProjectV2 from '$lib/components/ProjectV2.svelte';
	import ProjectV3 from '$lib/components/ProjectV3.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navbar active="projects" />

{#if data.project}
	{#if data.project.projectPageVersion === 'v2'}
		<ProjectV2 project={data.project} />
	{:else if data.project.projectPageVersion === 'v3'}
		<ProjectV3 project={data.project} />
	{:else}
		<ProjectV1 project={data.project} />
	{/if}
{/if}
