<script lang="ts">
	import { onMount } from 'svelte';
	import type { BufferGeometry, Mesh } from 'three';
	import { Planet } from './worlds/planet';
	import { T, forwardEventHandlers } from '@threlte/core';
	import FakeGlowMaterial from '../FakeGlowMaterial/FakeGlowMaterial.svelte';

	let planet: Mesh;
	let geometry: BufferGeometry;
	let ocean: Mesh;

	onMount(() => {
		const cube = new Planet({ preset: 'test' }, { scatter: 0.04 }).createMesh();
		planet = cube;
		geometry = cube.geometry;
		ocean = cube.children[0] as Mesh;
		console.log(geometry);
	});

	const component = forwardEventHandlers();
</script>

<T.Group dispose={false} {...$$restProps} bind:this={$component}>
	<T.Mesh is={planet} />
	<!-- <T.Mesh>
		<T.SphereGeometry args={[1.3, 32, 32]} />
		<FakeGlowMaterial glowColor={'#075985'} falloff={1.0} glowInternalRadius={1.0} />
	</T.Mesh> -->
</T.Group>
