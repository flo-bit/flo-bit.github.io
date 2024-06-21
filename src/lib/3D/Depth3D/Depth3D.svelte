<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene3D from './Scene3D.svelte';

	export let image: {
		image: string;
		depth: string;
	};
</script>

<Canvas>
	<Scene3D {image} {...$$restProps} />
</Canvas>