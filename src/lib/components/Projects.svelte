<script lang="ts">
	import { projects } from '../../projects';
</script>

<div id="projects" class="z-20 py-16 md:py-32 section bg-black relative isolate">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="max-w-2xl mb-8">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				things i've made
			</h1>
			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				i've worked on lots of little side projects over the years, here are some recent ones. many
				of them are open-source, so if you see something that piques your interest, check out the
				code and feel free to contribute.
			</p>
		</div>

		<div class="columns-2 md:columns-4 gap-4">
			{#each projects as project}
				<div
					class="group relative break-inside-avoid-column {project.aspect ??
						'aspect-square'} mb-4 w-full flex-none overflow-hidden rounded-xl ring-1 ring-white/10 bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
				>
					{#if project.src.endsWith('.mp4')}
						<video
							autoplay
							loop
							muted
							playsinline
							class="absolute inset-0 h-full w-full object-cover rounded-xl"
							preload="none"
						>
							<source src={project.src} type="video/mp4" />
						</video>
					{:else}
						<img
							src={project.src}
							alt={project.alt}
							class="absolute inset-0 h-full w-full object-cover rounded-xl"
							loading="lazy"
						/>
					{/if}
					<div
						class="overflow-hidden absolute z-10 pointer-events-none inset-0 w-full h-full flex items-end p-2 md:p-4 tracking-tight leading-6 text-white text-xl font-semibold opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
					>
						<div class="mt-1 text-base">
							{project.name}
						</div>
					</div>

					<a href={'/projects/' + project.key}>
						<div class="sr-only">{project.alt}</div>
						<div class="absolute inset-0 rounded-xl"></div>
						<div
							class="absolute inset-0 w-full h-full opacity-60 md:opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-gradient-to-t from-black to-transparent"
						></div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
