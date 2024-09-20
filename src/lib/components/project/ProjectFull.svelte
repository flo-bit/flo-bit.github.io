<script lang="ts">
	import type { Project } from '$lib/projects';
	import Badge from '../badge/badge.svelte';
	import ProjectBreadcrumb from './ProjectBreadcrumb.svelte';
	import ProjectButtons from './ProjectButtons.svelte';

	export let project: Project;
</script>

<div class="">
	<div class="pt-6 sm:pt-24">
		<ProjectBreadcrumb name={project.name} />

		<!-- Image gallery -->
		{#if project.images || project.demo}
			<div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-5xl lg:px-8 aspect-3">
				{#if project.demo == 'fluid'}
					<iframe
						src="https://flo-bit.github.io/text_effect_fluid/"
						title="fluid text effect demo"
						class="w-full h-full"
					/>
				{:else if project.demo == 'mandala'}
					<iframe
						src="https://flo-bit.github.io/mandala/"
						title="fluid text effect demo"
						class="w-full h-full rounded-xl"
					/>
				{:else if project.images}
					<img
						src={project.images[0]}
						alt=""
						class="h-full w-full object-cover object-center"
					/>
				{/if}
			</div>
		{/if}

		<!-- Product info -->
		<div
			class="mx-auto max-w-2xl px-4 pb-0 pt-10 sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
		>
			<div class="lg:col-span-2 lg:border-r lg:border-neutral-200 dark:border-neutral-800 lg:pr-8">
				<h1 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
					{project.name}
				</h1>
			</div>

			<!-- Options -->
			<div class="mt-4 lg:row-span-3 lg:mt-0">
				<h2 class="sr-only">project information</h2>

				<div class="mt-10">
					{#if project.tags}
						<!-- tags -->
						<div class="mt-10">
							<div class="mt-4">
								<div class="flex flex-wrap gap-4">
									{#each project.tags as tag}
										<Badge size="lg">{tag}</Badge>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<div class="mt-8 flex flex-col gap-4">
						<ProjectButtons codeUrl={project.codeUrl} projectUrl={project.projectUrl} />
					</div>
				</div>
			</div>

			<div
				class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-neutral-200 dark:border-neutral-800 lg:pb-16 lg:pr-8 lg:pt-6"
			>
				<!-- Description and details -->
				<div>
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6">
						<p class="text-base text-neutral-900 dark:text-neutral-200">
							{project.description}
						</p>
					</div>
				</div>

				{#if project.highlights}
					<div class="mt-10">
						<h3 class="text-sm font-medium text-neutral-900 dark:text-neutral-50">highlights</h3>

						<div class="mt-4">
							<ul role="list" class="list-disc space-y-2 pl-4 text-sm">
								{#each project.highlights as highlight}
									<li class="text-neutral-400 dark:text-neutral-600">
										<span class="text-neutral-600 dark:text-neutral-300">{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/if}

				{#if project.details}
					<div class="mt-10">
						<h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-50">details</h2>

						<div class="mt-4 space-y-6">
							<p class="text-sm text-neutral-600 dark:text-neutral-300 leading-6">
								{project.details}
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
