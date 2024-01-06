<script lang="ts">
	interface Learning {
		title: string;
		description: string;
		date: string;
	}

	const learnings: Learning[] = [
		{
			title: 'Rust',
			description:
				'Just started learning Rust. Still weirded out by the whole ownership thing, but other than that I like it so far.',
			date: '2024-01'
		},
		{
			title: 'Threlte',
			description: 'Fun library combining Svelte and Three.js. Also used on this website.',
			date: '2023-12'
		},
		{
			title: 'MongoDB',
			description: 'Switched from MySQL to MongoDB and never looked back.',
			date: '2023-09'
		},
		{
			title: 'Svelte and SvelteKit',
			description:
				'In my opinion the best framework for web development. I use it for most of my personal projects, including this website.',
			date: '2023-06'
		},
		{
			title: 'TailwindCSS',
			description:
				'In my opinion the best bad idea in web development. Not great, but better than pure CSS by far. Used in most of my newer projects including this website.',
			date: '2023-05'
		},
		{
			title: 'React, Next.js and ReactNative',
			description:
				"Not a huge fan of React, but it's still the most popular framework out there. I mostly use it for work.",
			date: '2023-01'
		}
	];

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long'
		});
	}
</script>

<div class="relative isolate overflow-hidden bg-black">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="learning" class="py-16 md:py-32 section">
			<div class="max-w-2xl">
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					Always keep learning
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					One of the things I love most about programming is that there's always something new to
					learn. I try to learn something new every month. Here are some of the things I've been
					learning lately:
				</p>
			</div>
			<div class="mt-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
				<div class="flex max-w-3xl flex-col space-y-16">
					{#each learnings as learning}
						<article class="md:grid md:grid-cols-4 md:items-baseline">
							<div class="group relative flex flex-col items-start md:col-span-3">
								<div
									class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
								>
									{learning.title}
								</div>
								<div
									class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5 mt-1 md:hidden"
								>
									<span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
										<span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
									</span>
									{formatDate(learning.date)}
								</div>

								<p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
									{learning.description}
								</p>
							</div>
							<div
								class="relative z-10 order-first mb-3 items-center text-sm text-zinc-400 dark:text-zinc-500 mt-1 hidden md:block"
							>
								{formatDate(learning.date)}
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
