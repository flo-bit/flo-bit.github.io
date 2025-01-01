<script lang="ts">
	import { onMount } from 'svelte';

	import {
		getFallbackGithubData,
		getGithubData,
		type GithubGraphColor,
		type GitHubResponse
	} from '$lib/github/';

	let githubData: GitHubResponse = getFallbackGithubData();

	onMount(async () => {
		const data = await getGithubData();
		if (!data) return;

		githubData = data;
	});

	let colors: Record<GithubGraphColor, string> = {
		'#ebedf0': 'bg-accent-950/30',
		'#9be9a8': 'bg-accent-800/70',
		'#40c463': 'bg-accent-700',
		'#30a14e': 'bg-accent-600',
		'#216e39': 'bg-accent-500'
	};
</script>

<div class="relative isolate overflow-hidden bg-background">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="about" class="py-16 md:py-32 section">
			<div class="max-w-2xl">
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					my life in data
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					i'm a sucker for nice data visualizations. here are some cool stats about me. this was
					mostly an excuse to make some cool graphs.
				</p>
			</div>
			<div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
				<div class="flex p-px lg:col-span-4">
					<div
						class="overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] flex-grow"
					>
						<!-- <img
						class="h-80 object-cover object-left"
						src="https://tailwindui.com/plus/img/component-images/bento-02-releases.png"
						alt=""
					/> -->

						<div class="p-10"></div>
					</div>
				</div>

				<div class="flex p-px lg:col-span-2">
					<div
						class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 lg:rounded-tr-[2rem]"
					>
						<!-- <img
							class="h-80 object-cover object-center"
							src="https://tailwindui.com/plus/img/component-images/bento-02-integrations.png"
							alt=""
						/> -->

						<div class="p-8 flex flex-col justify-center items-start h-full">
							<h3 class="text-sm/4 font-semibold text-zinc-400">my github repositories have</h3>
							<div class="mt-8 flex gap-4 items-end">
								<p class="font-bold text-6xl tracking-tight text-accent-500">
									{githubData.totalStars}
								</p>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-8 fill-accent-600"
								>
									<path
										fill-rule="evenodd"
										d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
										clip-rule="evenodd"
									/>
								</svg>
								<p class="text-sm/6 font-semibold text-accent-600 -ml-3">stargazers</p>
							</div>
							<div class="mt-4 flex gap-4 items-end">
								<p class="text-5xl font-semibold tracking-tight text-zinc-400">
									{githubData.totalForks}
								</p>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-8 fill-zinc-500"
								>
									<path
										d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z"
									/>
								</svg>
								<p class="text-sm/6 font-semibold text-zinc-500 mt-6 -ml-4">forks</p>
							</div>
						</div>
					</div>
				</div>

				<div class="flex p-px lg:col-span-6">
					<div class="overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/15 flex-grow">
						<!-- <img
						class="h-80 object-cover object-left"
						src="https://tailwindui.com/plus/img/component-images/bento-02-releases.png"
						alt=""
					/> -->

						<div class="p-8">
							<div class="-mt-2 flex items-end mb-8 gap-4">
								<p class="mt-2 text-6xl font-bold tracking-tight text-accent-500">
									{githubData.contributionsCollection.contributionCalendar.totalContributions}
								</p>
								<p class="max-w-lg text-sm/6 font-semibold text-gray-400">github contributions in the last year</p>
							</div>

							<div class="flex gap-0.5 sm:gap-1 w-full overflow-scroll">
								{#each githubData.contributionsCollection.contributionCalendar.weeks as week (week.contributionDays)}
									<div class="flex flex-col gap-0.5 sm:gap-1 w-full">
										{#each week.contributionDays as day (day.date)}
											<div
												class="size-1.5 sm:size-3 rounded-sm {colors[day.color]}"
												title="Contributions: {day.contributionCount} on {day.date}"
											></div>
										{/each}
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="flex p-px lg:col-span-3">
					<div
						class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 lg:rounded-bl-[2rem]"
					>
						<!-- <img
						class="h-80 object-cover object-center"
						src="https://tailwindui.com/plus/img/component-images/bento-02-security.png"
						alt=""
					/> -->
						<div class="p-10"></div>
					</div>
				</div>

				<div class="flex p-px lg:col-span-3">
					<div
						class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
					>
						<!-- <img
						class="h-80 object-cover object-left"
						src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
						alt=""
					/> -->
						<div class="p-10">
							<h3 class="text-sm/4 font-semibold text-zinc-400">Performance</h3>
							<p class="mt-2 text-lg/7 font-medium tracking-tight text-white">
								Lightning-fast builds
							</p>
							<p class="mt-2 max-w-lg text-sm/6 text-zinc-400">
								Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo
								vulputate. Maecenas at augue sed elit dictum vulputate.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
