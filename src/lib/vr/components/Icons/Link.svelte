<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 ./link.gltf -T -t
-->

<script lang="ts">
	import type * as THREE from 'three';
	import { Group } from 'three';
	import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
	import { RoundedBoxGeometry, useGltf } from '@threlte/extras';
	import IconBox from './IconBox.svelte';

	type $$Props = Props<THREE.Group & { link: string }>;
	type $$Events = Events<THREE.Group>;
	type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

	export const ref = new Group();

	type GLTFResult = {
		nodes: {
			Curve004: THREE.Mesh;
		};
		materials: {};
	};

	const gltf = useGltf<GLTFResult>('/link-transformed.glb', { useDraco: true });

	const component = forwardEventHandlers();

	export let link = 'https://google.com';
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh
			geometry={gltf.nodes.Curve004.geometry}
			material={gltf.nodes.Curve004.material}
			scale={17}
			rotation.x={Math.PI / 2}
		>
			<T.MeshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.2} /></T.Mesh
		>

		<IconBox {link} />
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
