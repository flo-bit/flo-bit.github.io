<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { BufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three';
	import { Environment, OrbitControls } from '@threlte/extras';

	import Stars from './Stars.svelte';
	import { onMount } from 'svelte';
	import { Planet } from './planet/worlds/planet';

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

	const { scene } = useThrelte();

	let geometry: BufferGeometry;

	let ocean: Mesh;
	let planet: Mesh;
	onMount(() => {
		scene.background = new Color(0x000000);

		const cube = new Planet({ preset: 'test' }, { scatter: 0.03 }).createMesh();

		planet = cube;
		geometry = cube.geometry;
		ocean = cube.children[0] as Mesh;
		console.log(geometry);
	});

	export let pos = 0;

	// const material = new MeshStandardMaterial();
	// material.onBeforeCompile = (shader) => {
	// 	shader.vertexShader = `varying vec3 vPos;\n${shader.vertexShader}`.replace(
	// 		`#include <begin_vertex>`,
	// 		`#include <begin_vertex>\nvPos = transformed;`
	// 	);

	// 	shader.fragmentShader = `varying vec3 vPos;\n${shader.fragmentShader}`;

	// 	// vary depending on angle to camera
	// 	shader.fragmentShader = shader.fragmentShader.replace(
	// 		'vec4 diffuseColor = vec4( diffuse, opacity );',
	// 		`vec4 diffuseColor = vec4( diffuse, opacity );
	// 		float angle = dot(normalize(vPos), normalize(cameraPosition));
	// 		diffuseColor = vec4( diffuse, opacity * (1.0 - angle));`
	// 	);
	// };
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

<T.DirectionalLight intensity={2} position={[-pos * 10 + 5, 2 + pos * 3, 2]} />

<T.Mesh
	scale={2}
	rotation.y={rotation}
	rotation.z={0.1}
	position.x={pos * 4 - 2}
	position.z={-distance}
	position.y={0.5}
	is={planet}
></T.Mesh>

<!-- this breaks scene background color :/ -->
<!-- <Environment files="env.hdr" isBackground={false} /> -->

<Stars />
