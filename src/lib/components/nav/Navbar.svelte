<script lang="ts">
	import DesktopNavigation from './DektopNavigation.svelte';
	import MobileNavigation from './MobileNavigation.svelte';

	export let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' = 'about';
</script>

<div class="fixed top-6 w-full z-50 pointer-events-none">
	<div class="flex flex-1 justify-end md:justify-center">
		<DesktopNavigation bind:active class="pointer-events-auto hidden md:block" />
	</div>
</div>

<div class="fixed bottom-6 right-0 z-50">
	<MobileNavigation bind:active class="pointer-events-auto md:hidden mt-10" />
</div>
