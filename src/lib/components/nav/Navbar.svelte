<script lang="ts">
	import DesktopNavigation from './DektopNavigation.svelte';
	import MobileNavigation from './MobileNavigation.svelte';

	export let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' = 'about';
</script>

<div class="fixed top-0 w-full z-50">
	<header class="pointer-events-none relative z-50 flex flex-none flex-col">
		<div class="top-0 z-10 h-16 pt-6">
			<div class="sm:px-8">
				<div class="mx-auto w-full max-w-7xl lg:px-8">
					<div class={'relative px-4 sm:px-8 lg:px-12'}>
						<div class="mx-auto max-w-2xl lg:max-w-5xl">
							<div class="relative flex gap-4">
								<div class="flex flex-1">
									<div class="flex flex-1"></div>
									<div class="flex flex-1 justify-end md:justify-center">
										<MobileNavigation bind:active class="pointer-events-auto md:hidden" />
										<DesktopNavigation bind:active class="pointer-events-auto hidden md:block" />
									</div>
									<div class="flex justify-end md:flex-1"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</div>
