<script lang="ts">
	import type { Project } from '../../projects';
	import { Badge } from './badge';
	import ProjectBreadcrumb from './ProjectBreadcrumb.svelte';
	import ProjectButtons from './ProjectButtons.svelte';

	export let project: Project;

	let selectedImage = 0;
</script>

<div class="">
	<div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
		<ProjectBreadcrumb name={project.name} />

		<div class="mt-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			{#if project.images}
				<div class="flex flex-col-reverse">
					<!-- Image selector -->

					{#if project.images.length > 0}
						<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
							<div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
								{#each project.images as image, index}
									<button
										class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white/10 text-sm font-medium text-neutral-900 hover:bg-neutral-400 border {index ==
										selectedImage
											? 'border-accent-400'
											: 'border-accent-100/20 hover:border-accent-400'}"
										type="button"
										on:click={() => (selectedImage = index)}
									>
										<span class="absolute inset-0 overflow-hidden rounded-md">
											<img src={image} alt="" class="h-full w-full object-cover object-center" />
										</span>
										<!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
										<span class="pointer-events-none absolute inset-0 rounded-md" aria-hidden="true"
										></span>
									</button>

									<!-- More images... -->
								{/each}

								<!-- More images... -->
							</div>
						</div>
					{/if}

					<div class="aspect-h-1 aspect-w-1 w-full">
						<!-- Tab panel, show/hide based on tab state. -->
						<div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
							<img
								src={project.images[selectedImage]}
								alt="Angled front view with bag zipped and handles upright."
								class="h-full w-full object-cover object-center sm:rounded-lg"
							/>
						</div>

						<!-- More images... -->
					</div>
				</div>
			{/if}

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
					{project.name}
				</h1>

				{#if project.tags}
					<!-- tags -->
					<div class="mt-10">
						<div class="mt-4 mb-8">
							<div class="flex flex-wrap gap-4">
								{#each project.tags as tag}
									<Badge size="lg">{tag}</Badge>
								{/each}
							</div>
						</div>

						<div class="grid sm:grid-cols-2 gap-4">
							<ProjectButtons codeUrl={project.code} projectUrl={project.projectUrl} />
						</div>
					</div>
				{/if}

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6 text-base text-neutral-700 dark:text-neutral-300">
						<p>
							{project.description}
						</p>
					</div>
				</div>

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Additional details</h2>

					{#if project.highlights}
					<div
						class="divide-y divide-neutral-200 dark:divide-neutral-800 border-t dark:border-neutral-800"
					>
						<div>
							<h3>
								<!-- Expand/collapse question button -->
								<div class="group relative flex w-full items-center justify-between py-6 text-left">
									<!-- Open: "text-indigo-600", Closed: "text-neutral-900" -->
									<span class="text-sm font-medium text-neutral-900 dark:text-neutral-100"
										>highlights</span
									>
								</div>
							</h3>
							<div class="prose prose-sm pb-6 dark:prose-invert prose-neutral" id="disclosure-1">
								<ul role="list">
									{#each project.highlights as highlight}
										<li>{highlight}</li>
									{/each}
								</ul>
							</div>
						</div>

						<!-- More sections... -->
					</div>
					{/if}

				</section>
			</div>
		</div>
	</div>
</div>
