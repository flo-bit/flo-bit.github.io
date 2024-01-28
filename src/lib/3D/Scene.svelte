<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { interactivity, useCursor } from '@threlte/extras';
	import { Color } from 'three';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import Stars from './Stars.svelte';
	import PlanetModel from './PlanetModel.svelte';
	import Nebula from './Nebula.svelte';

	const { onPointerEnter, onPointerLeave } = useCursor()
	interactivity();

	let rotate = spring(
		0,
		{
			stiffness: 0.1,
			damping: 0.05
		}
	);
	let size = spring(
		2,
		{
			stiffness: 0.1,
			damping: 0.5
		}
	);

	let distance = 1;

	let rotationSpeed = 0.2;
	useTask((delta) => {
		// rotation += delta * rotationSpeed;

		rotate.set($rotate + delta * rotationSpeed);

		if (window.innerWidth < 768) {
			distance = 6;
		} else {
			distance = 1;
		}
	});

	const { scene, renderer } = useThrelte();

	onMount(() => {
		scene.background = new Color(0x000000);
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
></T.PerspectiveCamera>

<T.DirectionalLight intensity={3} position={[-pos * 10 + 5, 2 + pos * 3, 2]} />

<T.AmbientLight intensity={0.0} />

<PlanetModel
	on:click={() => {
		rotate.set($rotate + 2);
	}}
	on:pointerleave={() => {
		size.set(2)
		onPointerLeave()
	}}
	on:pointerenter={() => {
		size.set(2.2)
		onPointerEnter()}
		}

	scale={$size}
	rotation.y={$rotate}
	rotation.z={0.1}
	position.x={pos * 4 - 2}
	position.z={-distance}
	position.y={0.5}
/>

<!-- this breaks scene background color :/ -->
<!-- <Environment files="env.jpg" isBackground={false} /> -->

<Stars />

<Nebula />
