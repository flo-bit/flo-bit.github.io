<script lang="ts">
	import { type Project } from '$lib/projects';
	import ProjectBreadcrumb from './ProjectBreadcrumb.svelte';
	import ProjectButtons from './ProjectButtons.svelte';

	export let project: Project;
</script>

<div class="">
	<div
		class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
	>
		<!-- Product details -->
		<div class="lg:max-w-lg lg:self-end">
			<ProjectBreadcrumb name={project.name} />

			<div class="mt-4">
				<h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.name}</h1>
			</div>

			<section aria-labelledby="information-heading" class="mt-4">
				<h2 id="information-heading" class="sr-only">project information</h2>

				<div class="mt-4 space-y-6">
					<p class="text-base text-neutral-400">{project.description}</p>
				</div>

				<div class="mt-8 grid sm:grid-cols-2 gap-4">
					<ProjectButtons codeUrl={project.codeUrl} projectUrl={project.projectUrl} />
				</div>
			</section>
		</div>

		{#if project.images}
			<!-- Product image -->
			<div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
				<div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
					<img
						src={project.images[0]}
						alt=""
						class="h-full w-full object-cover object-center"
					/>
				</div>
			</div>
		{/if}
	</div>
</div>
