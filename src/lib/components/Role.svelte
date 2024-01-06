<script lang="ts">
	interface Role {
		company: string;
		title: string;
		logo: string | { src: string; rounded?: boolean };
		start: string | { label: string; dateTime: string };
		end: string | { label: string; dateTime: string };
	}

	export let role: Role;

	let startLabel = typeof role.start === 'string' ? role.start : role.start.label;
	let startDate = typeof role.start === 'string' ? role.start : role.start.dateTime;

	let endLabel = typeof role.end === 'string' ? role.end : role.end.label;
	let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;
</script>

<li class="flex gap-4">
	<div
		class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
	>
		{#if typeof role.logo === 'string'}
			<img src={role.logo} alt="" class="h-7 w-7 object-contain" />
		{:else}
			<img
				src={role.logo.src}
				alt=""
				class="h-7 w-7 object-contain {role.logo.rounded ? 'rounded-full' : ''}"
			/>
		{/if}
	</div>
	<dl class="flex flex-auto flex-wrap gap-x-2">
		<dt class="sr-only">Company</dt>
		<dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
			{role.company}
		</dd>
		<dt class="sr-only">Role</dt>
		<dd class="text-xs text-zinc-500 dark:text-zinc-400">
			{role.title}
		</dd>
		<dt class="sr-only">Date</dt>
		<dd
			class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
			aria-label={`${startLabel} until ${endLabel}`}
		>
			<time dateTime={startDate}>{startLabel}</time>{' '}
			<span aria-hidden="true">—</span>{' '}
			<time dateTime={endDate}>{endLabel}</time>
		</dd>
	</dl>
</li>
