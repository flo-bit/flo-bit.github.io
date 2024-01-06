<script lang="ts">
	//@ts-ignore
	import enna from '$lib/images/logos/enna.png?w=112&format=webp';
	//@ts-ignore
	import puppet from '$lib/images/logos/puppet.png?w=112&format=webp';
	//@ts-ignore
	import tub from '$lib/images/logos/tub.png?w=112&format=webp';
	//@ts-ignore
	import hyperlumen from '$lib/images/logos/hyperlumen.png?w=112&format=webp';

	import Role from './Role.svelte';
	let resume: Array<{
		company: string;
		title: string;
		logo: string | { src: string; rounded?: boolean };
		start: string | { label: string; dateTime: string };
		end: string | { label: string; dateTime: string };
	}> = [
		{
			company: 'Hyperlumen',
			title: 'Co-Founder',
			logo: {
				src: hyperlumen,
				rounded: true
			},
			start: '2023',
			end: {
				label: 'Present',
				dateTime: new Date().getFullYear().toString()
			}
		},
		{
			company: 'Enna',
			title: 'Student Software Engineer',
			logo: enna,
			start: '2022',
			end: {
				label: 'Present',
				dateTime: new Date().getFullYear().toString()
			}
		},
		{
			company: 'Puppet',
			title: 'Co-Founder',
			logo: puppet,
			start: '2022',
			end: {
				label: 'Present',
				dateTime: new Date().getFullYear().toString()
			}
		},
		{
			company: 'TU Berlin',
			title: 'Computer Science',
			logo: tub,
			start: '2018',
			end: {
				label: 'Present',
				dateTime: new Date().getFullYear().toString()
			}
		}
	];
</script>

<div class="rounded-2xl border p-6 dark:border-white/10 mt-16 bg-white/5">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
		<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6 flex-none" aria-hidden="true">
			<path
				d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
				class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
			/>
			<path
				d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
				class="stroke-zinc-400 dark:stroke-zinc-500"
			/>
		</svg>
		<span class="ml-3">Work & Education</span>
	</h2>
	<ol class="mt-6 space-y-4">
		{#each resume as role}
			<Role {role} />
		{/each}
	</ol>
</div>
