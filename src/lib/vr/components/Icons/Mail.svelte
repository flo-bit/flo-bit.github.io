<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 ./mail.gltf -T -t
-->

<script lang="ts">
	import type * as THREE from 'three';
	import { Group } from 'three';
	import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
	import { RoundedBoxGeometry, useGltf } from '@threlte/extras';
	import IconBox from './IconBox.svelte';

	type $$Props = Props<THREE.Group>;
	type $$Events = Events<THREE.Group>;
	type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

	export const ref = new Group();

	type GLTFResult = {
		nodes: {
			Curve001: THREE.Mesh;
			Curve002: THREE.Mesh;
		};
		materials: {};
	};

	const gltf = useGltf<GLTFResult>('/mail-transformed.glb', { useDraco: true });

	const component = forwardEventHandlers();

	let link = 'mailto:flo.bit.dev@gmail.com';
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh geometry={gltf.nodes.Curve001.geometry} scale={19} rotation.x={Math.PI / 2}>
			<T.MeshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.2} /></T.Mesh
		>
		<T.Mesh geometry={gltf.nodes.Curve002.geometry} scale={19} rotation.x={Math.PI / 2}>
			<T.MeshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.2} /></T.Mesh
		>

		<IconBox {link} />
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
