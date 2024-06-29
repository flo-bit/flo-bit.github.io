<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Article {
		title: string;
		description: string;
		date: string;
		href: string;
	}

	const articles: Article[] = [
		{
			title: 'publishing an ai generated music album',
			description: 'in one week, without any music creation expertise',
			date: '2024-02-13',
			href: 'https://flobit.substack.com/p/publishing-an-ai-generated-music'
		},
		{
			title: 'how to become a great programmer (or anything else)',
			description: 'in one easy step',
			date: '2024-02-08',
			href: 'https://flobit.substack.com/p/how-to-become-a-great-programmer'
		},
		{
			title: 'how i recreated this awesome text fluid effect',
			description: 'a step-by-step approach',
			date: '2024-01-22',
			href: 'https://flobit.substack.com/p/how-i-recreated-this-awesome-text'
		},
		{
			title: 'four free startup ideas for you',
			description: "because there's not enough startups in this world",
			date: '2024-01-15',
			href: 'https://flobit.substack.com/p/four-free-startup-ideas-for-you'
		},
		{
			title: 'how i use ai for software development',
			description: 'I admit it, I have asked chatgpt at least 17 times how to center a div!',
			date: '2024-01-08',
			href: 'https://flobit.substack.com/p/how-i-use-ai-for-software-development-474551a7aa7f'
		}
	];

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	let showAll = false;

	$: shownArticles = showAll ? articles : [...articles].slice(0, 4);
</script>

<div class="relative isolate overflow-hidden bg-black">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="articles" class="py-16 md:py-32 section">
			<div class="max-w-2xl">
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					my ramblings
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					here are some of my thoughts on things i'm learning or working on.
				</p>
			</div>
			<div class="mt-16">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-16">
					{#each shownArticles as article}
						<article class="" transition:slide>
							<div class="group relative flex flex-col items-start">
								<div
									class="text-base z-10 font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
								>
									{article.title}
								</div>
								<div
									class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5 mt-1"
								>
									<span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
										<span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
									</span>
									{formatDate(article.date).toLowerCase()}
								</div>

								<p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
									{article.description}
								</p>

								<a href={article.href} target="_blank">
									<div
										class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
									/>
									<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
									<span
										class="relative z-10 mt-4 flex items-center text-sm font-medium text-zinc-400 transition-colors duration-200 group-hover:text-cyan-400"
									>
										read
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-3 h-3 ml-1 mt-0.5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m8.25 4.5 7.5 7.5-7.5 7.5"
											/>
										</svg>
									</span>
								</a>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
