<script lang="ts">
	import SocialLink from '$lib/components/SocialLink.svelte';
</script>

<div class="py-32 bg-black/30 md:bg-transparent section" id="contact">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
			<div>
				<h2 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Get in touch
				</h2>
				<p class="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
					You have a project in mind? Let's talk about it. Drop me a line and I'll get back to you
					as soon as possible.
				</p>

				<ul role="list" class="mt-8">
					<SocialLink href="https://github.com/flo-bit" class="mt-4">
						<svelte:fragment slot="icon">
							<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clip-rule="evenodd"
								/>
							</svg>
						</svelte:fragment>
						Follow on GitHub</SocialLink
					>
					<SocialLink href="https://linkedin.com/in/floriankillius" class="mt-4">
						<svelte:fragment slot="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
								/></svg
							>
						</svelte:fragment>
						Connect on LinkedIn
					</SocialLink>
					<SocialLink href="mailto:flo.bit.dev@gmail.com" class="mt-8">
						<svelte:fragment slot="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
								/>
								<path
									d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
								/>
							</svg>
						</svelte:fragment>
						flo.bit.dev@gmail.com
					</SocialLink>
				</ul>
			</div>
		</div>
	</div>
</div>
