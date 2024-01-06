<script lang="ts">
	import NavigationItem from './NavigationItem.svelte';

	let classes = '';

	export { classes as class };

	export let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' = 'home';
</script>

<nav class={classes}>
	<ul
		class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-white/5 dark:text-zinc-200 dark:ring-white/10"
	>
		<NavigationItem href="#home" isActive={active == 'home'}>Home</NavigationItem>
		<NavigationItem href="#about" isActive={active == 'about'}>About</NavigationItem>
		<NavigationItem href="#projects" isActive={active == 'projects'}>Projects</NavigationItem>
		<NavigationItem href="#learning" isActive={active == 'learning'}>Learning</NavigationItem>
		<NavigationItem href="#contact" isActive={active == 'contact'}>Contact</NavigationItem>
	</ul>
</nav>
