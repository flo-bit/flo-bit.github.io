<script lang="ts">
	import { browser } from '$app/environment';
	import { projects } from '$lib/projects';
</script>

<div
	id="projects"
	class="z-20 py-16 md:py-32 section bg-background relative isolate overflow-hidden"
>
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="max-w-2xl mb-8">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				things i've made
			</h1>
			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				i've worked on lots of little side projects over the years, here are some recent ones. many
				of them are open-source, so if you see something that piques your interest, check out the
				code.
			</p>
		</div>

		<div class="columns-2 sm:columns-3 sm:text-[0] gap-4 group/projects pointer-events-none">
			{#each projects as project}
				<div class="w-full mb-4">
					<div
						class="group relative inline-block sm:w-full break-inside-avoid-column {project.aspect ??
							'aspect-square'} pointer-events-auto group-hover/projects:opacity-30 group-focus/projects:opacity-30 hover:!opacity-100 w-full flex-none border border-white/15 focus:border-accent-500 overflow-hidden rounded-xl focus:!opacity-100 sm:rounded-2xl transition-opacity duration-500"
					>
						{#if project.src.endsWith('.mp4')}
							<video
								autoplay
								loop
								muted
								playsinline
								class="absolute inset-0 h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
								preload="none"
							>
								<source src={project.src} type="video/mp4" />
							</video>
						{:else}
							<img
								src={project.src}
								alt=""
								class="absolute inset-0 h-full w-full object-cover rounded-xl"
								loading="lazy"
							/>
						{/if}
						<div
							class="overflow-hidden absolute z-10 pointer-events-none inset-0 w-full h-full flex items-end px-3 py-2 md:p-4 tracking-tight leading-6 text-white text-xl font-semibold sm:translate-y-20 group-hover:translate-y-0 transition-translation duration-200"
						>
							<div class="mt-1 text-sm sm:text-lg">
								{project.name}
							</div>
						</div>

						<a href={'/projects/' + project.key}>
							<div class="absolute inset-0 rounded-xl"></div>
							<div
								class="absolute inset-0 w-full h-full opacity-60 md:opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-gradient-to-t from-black to-transparent"
							></div>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
