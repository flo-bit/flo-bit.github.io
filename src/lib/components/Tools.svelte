<script lang="ts">
	const languages = [
		'html',
		'typescript/javascript',
		'python',
		'c',
		'objective-c/swift',
		'java',
		'haskel',
		'c++',
		'c#'
	];

	const frontend = [
		'svelte',
		'shadcn-svelte',
		'bits ui',
		'react',
		'react native',
		'threejs',
		'threlte',
		'vite',
		'paper.js',
		'pixi.js',
		'p5.js'
	];

	const styling = ['tailwindcss', 'bulma', 'daisyui', 'skeleton ui'];
	const backend = ['nestjs', 'next.js', 'auth.js', 'sveltekit', 'node.js', 'supabase'];

	const infrastructure = ['docker', 'git', 'github', 'stripe', 'vercel', 'paypal', 'scaleway'];

	const databases = ['mongo db', 'mysql', 'weaviate', 'postgres', 'supabase'];

	const tools = ['chatgpt', 'midjourney', 'figma', 'excalidraw', 'final cut pro', 'notion', 'mongodb compass', 'tableplus', 'vs code', 'arc'];

	let all = [{
		title: 'languages',
		items: languages
	},
	{
		title: 'frontend',
		items: frontend
	},
	{
		title: 'styling',
		items: styling
	},
	{
		title: 'backend',
		items: backend
	},
	{
		title: 'infrastructure',
		items: infrastructure
	},
	{
		title: 'databases',
		items: databases
	},
	{
		title: 'tools',
		items: tools
	}];
</script>

<div class="relative isolate overflow-hidden bg-black">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="learning" class="py-16 md:py-32 section">
			<div class="max-w-2xl">
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					My Tools
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					Here are some of the tools I use to create things for the web:
				</p>
			</div>

			<div class="flow-root">

			<div class="mt-16 columns-3 gap-6">
				{#each all as {title, items}}
					<div class="bg-white/0 border border-white/5 p-4 rounded-2xl break-inside-avoid mb-6 relative">

						<div class="absolute inset-0 bg-gradient-to-br from-white/5 rounded-2xl"></div>
						<div class="text-lg text-zinc-100 mb-4 font-semibold">{title}</div>

						{#each items as item}
							<div class="text-zinc-200 text-sm mb-2 ml-4">{item}</div>
						{/each}
					</div>
				{/each}

			</div>
		</div>
		</div>
	</div>
</div>
