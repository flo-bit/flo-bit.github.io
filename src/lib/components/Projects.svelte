<script lang="ts">
	import Photos from '$lib/components/Photos.svelte';

	const projects: {
		name: string;
		description: string;
		link?: { href: string; label: string };
		logo?: string;
	}[] = [
		{
			name: 'Hyperlumen',
			description:
				"Light-Up clothes that make you feel like you're in a sci-fi movie. Perfect for raves.",
			link: { href: 'http://hyperlumen.de', label: 'hyperlumen.de' }
		},
		{
			name: 'Text Effect Fluid',
			description: "Text effect that looks like it's made of fluid.",
			link: { href: 'https://github.com/flo-bit/text_effect_fluid', label: 'github.com' }
		},
		{
			name: 'Ball Game',
			description:
				'Simple 3D browser game made with Threlte. Inspired by the game "Marble Blast Gold".',
			link: { href: 'https://github.com/flo-bit/ball-game', label: 'github.com' }
		},
		{
			name: 'Svleek',
			description:
				'Generating a simple but slick documentation website from a folder of markdown files.',
			link: { href: 'https://github.com/flo-bit/svleek', label: 'github.com' }
		},
		{
			name: 'Mandala Drawer',
			description: 'Drawing mandalas in the browser with a simple interface.',
			link: { href: 'https://github.com/flo-bit/mandala', label: 'github.com' }
		},
		{
			name: 'Old Coding Projects',
			description: "Some of my old coding projects. Please don't look at the code.",
			link: { href: 'https://github.com/flo-bit/old-code', label: 'github.com' }
		}
	];

	//@ts-ignore
	import hyperlumen from '$lib/images/projects/hyperlumen.jpeg?w=1024&format=webp';
	//@ts-ignore
	import ballgame from '$lib/images/projects/ball-game.png?w=1024&format=webp';
	//@ts-ignore
	import oldprojects from '$lib/images/projects/old-projects.png?w=1024&format=webp';
	//@ts-ignore
	import svleek from '$lib/images/projects/svleek.png?w=1024&format=webp';
	//@ts-ignore
	import mandala from '$lib/images/projects/mandala.png?w=1024&format=webp';
	//@ts-ignore
	import fluideffect from '$lib/images/projects/text-effect-fluid.png?w=1024&format=webp';

	let images: {
		src: string;
		href?: string;
		alt: string;
	}[] = [
		{
			src: hyperlumen,
			alt: 'Hyperlumen',
			href: 'https://hyperlumen.de'
		},
		{
			src: fluideffect,
			alt: 'Text Fluid Effect',
			href: 'https://flo-bit.github.io/text_effect_fluid/'
		},
		{
			src: ballgame,
			alt: 'Ball Game',
			href: 'https://flo-bit.github.io/ball-game/'
		},
		{
			src: svleek,
			alt: 'Svleek',
			href: 'https://flo-bit.github.io/svleek/'
		},
		{
			src: mandala,
			alt: 'Mandala',
			href: 'https://flo-bit.github.io/mandala/'
		},
		{
			src: oldprojects,
			alt: 'Old Projects',
			href: 'https://flo-bit.github.io/old-code/'
		}
	];
</script>

<div id="projects" class="z-20 py-16 md:py-32 section bg-black relative isolate ">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="max-w-2xl">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				Things I've made
			</h1>
			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				I've worked on lots of little side projects over the years, here are some recent ones. Many
				of them are open-source, so if you see something that piques your interest, check out the
				code and feel free to contribute.
			</p>
		</div>
	</div>

	<Photos {images} />
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<ul
			role="list"
			class="mt-20 px-0 sm:px-6 lg:px-0 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each projects as project}
				<div class="group relative flex flex-col items-start">
					{#if project.logo}
						<div
							class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
						>
							<img src={project.logo} alt="" class="h-12 w-12 rounded-full" />
						</div>
					{/if}
					<h2
						class="{project.logo
							? 'mt-6'
							: ''} text-base font-semibold text-zinc-800 dark:text-zinc-100"
					>
						{#if project.link}
							<a href={project.link.href} target="_blank">
								<div
									class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
								/>
								<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
								<span class="relative z-10">{project.name}</span>
							</a>
						{:else}
							<div
								class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
							/>
							<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
							<span class="relative z-10">{project.name}</span>
						{/if}
					</h2>
					<div class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
						{project.description}
					</div>
					{#if project.link}
						<p
							class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-cyan-400 dark:text-zinc-200"
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none">
								<path
									d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
									fill="currentColor"
								/>
							</svg>
							<span class="ml-2">{project.link.label}</span>
						</p>
					{/if}
				</div>
			{/each}
		</ul>
	</div>
</div>
