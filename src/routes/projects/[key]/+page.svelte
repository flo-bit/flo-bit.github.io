<script lang="ts">
	import type { PageData } from './$types';
	
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import ProjectTiered from '$lib/components/project/ProjectTiered.svelte';
	import ProjectCarousel from '$lib/components/project/ProjectCarousel.svelte';
	import ProjectGrid from '$lib/components/project/ProjectGrid.svelte';
	import ProjectFull from '$lib/components/project/ProjectFull.svelte';

	export let data: PageData;
</script>

<Navbar active="projects" />

{#if data.project}
	{#if data.project.projectPageVersion === 'carousel'}
		<ProjectCarousel project={data.project} />
	{:else if data.project.projectPageVersion === 'tiered'}
		<ProjectTiered project={data.project} />
	{:else if data.project.projectPageVersion === 'full'}
		<ProjectFull project={data.project} />
	{:else}
		<ProjectGrid project={data.project} />
	{/if}
{/if}
