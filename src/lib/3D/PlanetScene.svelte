<script>
	import Scene from '$lib/3D/Scene.svelte';
	import state from './state.json';

	import { Canvas } from '@threlte/core';
	import { Project, Sequence, Sheet } from '@threlte/theatre';

	export let pos = 0;
</script>

<div class="fixed left-0 right-0 top-0 h-screen">
	<Canvas>
		<Project config={{ state }}>
			<Sheet>
				<Scene {pos} />
				<Sequence iterationCount={1} autoplay delay={500} />
			</Sheet>
		</Project>
	</Canvas>
</div>
