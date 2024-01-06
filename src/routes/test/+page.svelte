<script>
	import Scene from '$lib/3D/Scene.svelte';

	import { Canvas } from '@threlte/core';
</script>

<div class="fixed left-0 right-0 top-0 h-screen -z-50">
	<Canvas>
		<Scene pos={0} />
	</Canvas>
</div>
