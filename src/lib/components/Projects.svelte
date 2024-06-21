<script lang="ts">
	import svelteswipecards from '$lib/images/projects-new/svelte-swiper-cards-demo.mp4';
	import fluidtexteffect from '$lib/images/projects-new/text-effect-fluid-demo.mp4';
	import fake3d from '$lib/images/projects-new/fake3dimage-demo.mp4';
	import hyperlumen from '$lib/images/projects-new/hyperlumen-demo.mp4';
	import marblellous from '$lib/images/projects-new/marblellous-demo.mp4';
	import oldcode from '$lib/images/projects-new/old-code-demo.mp4';
	import autostereogramrenderer from '$lib/images/projects-new/autostereogram-renderer-demo.mp4';
	import mandala from '$lib/images/projects-new/mandala-demo.mp4';


	let projects: {
		src: string;
		href?: string;
		alt: string;
		aspect?: string;
		name?: string;
		description?: string;
		code?: string;
	}[] = [
		{
			src: svelteswipecards,
			alt: 'svelte-swiper-cards',
			href: 'https://flo-bit.github.io/svelte-swiper-cards/',
			aspect: 'aspect-[9/18]',
			name: 'svelte swipable card component',
			description: 'a swipeable tinder like card component for svelte.',
			code: 'https://github.com/flo-bit/svelte-swiper-cards/'
		},
		{
			src: fluidtexteffect,
			alt: 'Text Fluid Effect',
			href: 'https://flo-bit.github.io/text_effect_fluid/',
			aspect: 'aspect-[23/9]',
			name: 'fluid text effect',
			code: 'https://github.com/flo-bit/text_effect_fluid'
		},
		{
			src: hyperlumen,
			alt: 'Hyperlumen',
			href: 'https://hyperlumen.de',
			aspect: 'aspect-[9/14]',
			name: 'hyperlumen',
			description:
				"light-up clothes that make you feel like you're in a sci-fi movie. perfect for raves."
		},
		{
			src: fake3d,
			alt: 'Image2Fake3D',
			href: 'https://flo-bit.github.io/image2fake3d/',
			aspect: 'aspect-[9/16]',
			name: 'image2fake3d',
			description:
				'turns an image into a fake 3d image that you can rotate with your mouse or gyro sensor.',
			code: 'https://github.com/flo-bit/image2fake3d'
		},
		{
			src: marblellous,
			alt: 'marblellous',
			href: 'https://flo-bit.github.io/ball-game/',
			aspect: 'aspect-[9/10]',
			name: 'marblellous',
			description:
				'simple 3d browser game made with threlte. inspired by the game "marble blast gold".',
			code: 'https://github.com/flo-bit/ball-game'
		},
		{
			src: oldcode,
			alt: 'old projects',
			href: 'https://flo-bit.github.io/old-code/',
			aspect: 'aspect-[16/11]',
			name: 'old coding projects',
			code: 'https://github.com/flo-bit/old-code'
		},
		// {
		// 	src: mandala,
		// 	alt: 'mandala',
		// 	href: 'https://flo-bit.github.io/mandala/',
		// 	aspect: 'aspect-square',
		// 	name: 'mandala',
		// 	description: 'draw svg mandalas in the browser.'
		// },
		// {
		// 	src: autostereogramrenderer,
		// 	alt: 'autostereogram renderer',
		// 	href: 'https://flo-bit.github.io/autostereogram-renderer/',
		// 	aspect: 'aspect-square',
		// 	name: 'autostereogram renderer',
		// 	description: 'rendering a 3d scene as an autostereogram.'
		// },
	];
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
			{#each projects as project, index}
				<div
					class="group relative {project.aspect ??
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
					{#if project.href}
						<div
							class="overflow-hidden absolute z-10 pointer-events-none inset-0 w-full h-full flex items-end p-2 md:p-4 tracking-tight leading-6 text-white text-xl font-semibold opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
						>
							<div>
								{#if project.code && false}
									<a
										href={project.code}
										target="_blank"
										class="pointer-events-auto hover:opacity-60 transition-opacity duration-200"
									>
										<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" class="size-6">
											<path
												fill-rule="evenodd"
												d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
												clip-rule="evenodd"
											/>
										</svg>
									</a>
								{/if}
								<div class="mt-1">
									{project.name}
								</div>

								{#if project.description}
									<div class="text-sm font-normal mt-2">
										{project.description}
									</div>
								{/if}
							</div>
						</div>

						<a href={project.href} target="_blank">
							<div class="sr-only">{project.alt}</div>
							<div class="absolute inset-0 rounded-xl"></div>
							<div
								class="absolute inset-0 w-full h-full opacity-60 md:opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-gradient-to-t from-black to-transparent"
							></div>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
