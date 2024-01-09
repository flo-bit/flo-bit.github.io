<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	import { OrbitControls } from '@threlte/extras';

	import Stars from './Stars.svelte';
	import { onMount } from 'svelte';
	import PlanetModel from './PlanetModel.svelte';
	import Nebula from './Nebula.svelte';

	let rotation = 0;
	let distance = 1;
	useTask((delta) => {
		rotation += delta * 0.1;

		if (window.innerWidth < 768) {
			distance = 6;
		} else {
			distance = 1;
		}
	});

	const { scene, renderer } = useThrelte();

	onMount(() => {
		scene.background = new THREE.Color(0x000000);
		renderer.setClearColor(0x000000, 1);
	});

	export let pos = 0;

</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 5]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
	far={100}
>
	<OrbitControls autoRotate={false} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={3} position={[-pos * 10 + 5, 2 + pos * 3, 2]} />

<T.AmbientLight intensity={0.1} />

<PlanetModel
	scale={2}
	rotation.y={rotation}
	rotation.z={0.1}
	position.x={pos * 4 - 2}
	position.z={-distance}
	position.y={0.5}
/>

<!-- this breaks scene background color :/ -->
<!-- <Environment files="env.jpg" isBackground={false} /> -->

<Stars />

<Nebula />
