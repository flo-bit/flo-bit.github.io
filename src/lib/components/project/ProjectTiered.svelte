<script lang="ts">
	import { Depth3D } from '$lib/3D/Depth3D';
	import type { Project } from '$lib/projects';
	import Badge from '../badge/badge.svelte';
	import Depth3ddemo from './demos/depth3ddemo.svelte';
	import Swiper from './demos/swiper.svelte';
	import ProjectBreadcrumb from './ProjectBreadcrumb.svelte';
	import ProjectButtons from './ProjectButtons.svelte';

	export let project: Project;
</script>

<div class="">
	<div class="pb-16 pt-6 sm:pt-24 sm:pb-24">
		<ProjectBreadcrumb name={project.name} />

		<div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
			<div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				<div class="lg:col-span-5 lg:col-start-8">
					<div class="flex justify-between">
						<h1 class="text-3xl font-bold text-neutral-900 dark:text-white">{project.name}</h1>
					</div>
				</div>

				<!-- Image gallery -->
				{#if project.images || project.demo}
					<div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
						<h2 class="sr-only">Images</h2>

						<div
							class="grid grid-cols-1 overflow-hidden rounded-xl lg:grid-cols-2 {project.images &&
							project.images.length > 1
								? 'lg:grid-rows-3'
								: ''} lg:gap-8"
						>
							{#if project.demo == 'swiper'}
								<div class="rounded-xl h-[60vh] md:h-[70vh] lg:col-span-2 lg:row-span-2">
									<Swiper />
								</div>
							{:else if project.demo == 'autostereogram'}
								<div class="rounded-xl h-[60vh] md:h-[70vh] lg:col-span-2 lg:row-span-2">
									<iframe
										src={project.projectUrl}
										title="autostereogram demo"
										class="w-full h-full"
									/>
								</div>
							{:else if project.demo == 'depth3d'}
								<div
									class="mx-auto aspect-[2/3] h-[75vh] rounded-xl overflow-hidden lg:col-span-2 lg:row-span-2"
								>
									<Depth3ddemo />
								</div>
							{:else if project.images}
								<img
									src={project.images[0]}
									alt=""
									class="rounded-xl lg:col-span-2 lg:row-span-2"
								/>
							{/if}
							{#if project.images && project.images.length > 1}
								<img src={project.images[1]} alt="" class="hidden rounded-xl lg:block" />
							{/if}
							{#if project.images && project.images.length > 2}
								<img src={project.images[2]} alt="" class="hidden rounded-xl lg:block" />
							{/if}
						</div>
					</div>
				{/if}

				<div class="mt-8 lg:col-span-5">
					<div class="flex flex-col gap-4">
						<ProjectButtons codeUrl={project.codeUrl} projectUrl={project.projectUrl} />
					</div>

					<!-- Product details -->
					<div class="mt-10">
						<h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100">Description</h2>

						<div class="prose prose-sm mt-4 text-neutral-500 dark:text-neutral-400">
							<p>{project.description}</p>
						</div>
					</div>

					<div class="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
						{#if project.highlights}
							<h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100">highlights</h2>

							<div class="prose prose-sm mt-4 text-neutral-500 dark:text-neutral-400">
								<ul role="list">
									{#each project.highlights as highlight}
										<li>{highlight}</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>

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
				</div>
			</div>
		</div>
	</div>
</div>
