<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.1 nature_edit/CommonTree_1.gltf --types -s -T --root nature_edit/
-->

<script lang="ts">
	import type * as THREE from 'three';
	import { Group } from 'three';
	import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	type $$Props = Props<THREE.Group> & {
		leafsColor?: THREE.Color | string | number;
		leafsDarkColor?: THREE.Color | string | number;
		barkColor?: THREE.Color | string | number;
		snowColor?: THREE.Color | string | number;
		variant?: 1 | 2 | 3 | 4 | 5;
		dead?: boolean;
		snow?: boolean;
	};
	type $$Events = Events<THREE.Group>;
	type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

	export const ref = new Group();

	export let leafsColor: THREE.Color | string | number | undefined = undefined;
	export let leafsDarkColor: THREE.Color | string | number | undefined = undefined;

	export let barkColor: THREE.Color | string | number | undefined = undefined;

	export let snowColor: THREE.Color | string | number | undefined = undefined;

	export let variant: 1 | 2 | 3 | 4 | 5 = 1;

	export let dead: boolean = false;

	export let snow: boolean = false;

	type GLTFResult = {
		nodes: {
			CommonTree_1: THREE.Mesh;
			CommonTree_2: THREE.Mesh;
			CommonTree_3: THREE.Mesh;
			CommonTree_4: THREE.Mesh;
		};
		materials: {
			Wood: THREE.MeshStandardMaterial;
			LeavesAccent: THREE.MeshStandardMaterial;
			Snow: THREE.MeshStandardMaterial;
			Leaves: THREE.MeshStandardMaterial;
		};
	};

	const gltf = useGltf<GLTFResult>(
		`nature/CommonTree${snow && dead ? '_Dead_Snow' : snow ? '_Snow' : ''}_${variant}.glb`,
		{ useDraco: true }
	);

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
			<T.Mesh
				castShadow
				receiveShadow
				geometry={gltf.nodes.CommonTree_1.geometry}
				material={gltf.materials.Wood}
				material.metalness={0}
				material.roughness={1.0}
				material.color={barkColor}
			/>
			{#if !dead}
				<T.Mesh
					castShadow
					receiveShadow
					geometry={gltf.nodes.CommonTree_2.geometry}
					material={gltf.materials.Leaves}
					material.metalness={0}
					material.roughness={1.0}
					material.color={leafsColor}
				/>
			{/if}
			{#if snow && dead}
				<T.Mesh
					castShadow
					receiveShadow
					geometry={gltf.nodes.CommonTree_2.geometry}
					material={gltf.materials.Snow}
					material.metalness={0}
					material.roughness={1.0}
					material.color={snowColor}
				/>
			{/if}
			{#if !snow && !dead && gltf.nodes.CommonTree_3}
				<T.Mesh
					castShadow
					receiveShadow
					geometry={gltf.nodes.CommonTree_3.geometry}
					material={gltf.materials.LeavesAccent}
					material.metalness={0}
					material.roughness={1.0}
					material.color={leafsDarkColor}
				/>
			{/if}

			{#if snow}
				<T.Mesh
					castShadow
					receiveShadow
					geometry={gltf.nodes.CommonTree_3.geometry}
					material={gltf.materials.Snow}
					material.metalness={0}
					material.roughness={1.0}
					material.color={snowColor}
				/>
			{/if}
			{#if snow}
				<T.Mesh
					castShadow
					receiveShadow
					geometry={gltf.nodes.CommonTree_4.geometry}
					material={gltf.materials.LeavesAccent}
					material.metalness={0}
					material.roughness={1.0}
					material.color={leafsDarkColor}
				/>
			{/if}
			<!-- <T.Mesh castShadow receiveShadow geometry={gltf.nodes.CommonTree_4.geometry} material={gltf.materials.Leaves} /> -->
		</T.Group>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
