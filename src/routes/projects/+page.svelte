<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import { projects } from '$lib/projects';
</script>

<Navbar active="projects" />

<div
	id="projects"
	class="z-20 py-16 md:py-24 section bg-background relative isolate overflow-hidden"
>
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="max-w-2xl mb-8">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				things i've made
			</h1>
			<div class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				i've worked on lots of little side projects over the years, here are some recent ones. many
				of them are open-source, so if you see something that piques your interest, check out the
				code. <a href="/projects" class="font-semibold text-accent-400 hover:text-accent-300 mt-4">
					see all projects
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div>
		</div>

		{#each projects as project}
			<div
				class="relative overflow-hidden rounded-lg lg:h-[700px] my-12 border border-zinc-800 group"
			>
				<div class="absolute inset-0">
					<video
						autoplay
						loop
						muted
						playsinline
						class="h-full w-full object-cover object-center"
						preload="none"
					>
						<source src={project.src} type="video/mp4" />
					</video>
				</div>
				<div aria-hidden="true" class="relative h-96 w-full lg:hidden"></div>
				<div aria-hidden="true" class="relative h-32 w-full lg:hidden"></div>
				<div
					class="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute inset-x-0 bottom-0 bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start"
				>
					<div>
						<h2 class="text-xl font-bold text-white">{project.name}</h2>
						<p class="mt-1 text-sm text-gray-300">
              {project.description}
						</p>
					</div>
					<a
						href="/projects/{project.key}"
						class="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
						>Read more</a
					>
				</div>
			</div>
		{/each}
	</div>
</div>
