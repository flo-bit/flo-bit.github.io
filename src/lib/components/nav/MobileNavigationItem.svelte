<script lang="ts">
	export let current: 'home' | 'about' | 'projects' | 'learning' | 'contact' | 'articles' = 'home';

	export let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' | 'articles' = 'home';

	export let hide: () => void;
</script>

<li>
	<a
		href="#{current}"
		class="block py-2 {active == current ? 'dark:text-cyan-400' : ''}"
		on:click={hide}
	>
		{current}
	</a>
</li>