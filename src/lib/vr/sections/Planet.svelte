<script lang="ts">
	import { T, useTask } from '@threlte/core';

	import { Float, Text3DGeometry } from '@threlte/extras';
	import PlanetModel from '../components/PlanetModel.svelte';
	import { Container, Root, SVG, Text } from 'threlte-uikit';
	import { onMount } from 'svelte';
	import { spring } from '../components/Utils';

	let arrowSpring = spring<number>(-10);
	let currentArrowTranslate = 0;

	let planetRotation = 0;

	onMount(() => {
		moveTo(10);
	});

	useTask((dt) => {
		planetRotation += dt * 0.1;

		currentArrowTranslate = arrowSpring.update(dt);
	});

	function moveTo(to: number) {
		arrowSpring.set(to);

		setTimeout(() => {
			moveTo(to < 1 ? 10 : -10);
		}, 400);
	}
</script>

<T.Group position={[0, 1, -1.5]}>
	<Float>
		<T.Mesh scale={0.045} position={[-1, -0.08, 0]} rotation.y={0.3} rotation.x={-0.3}>
			<Text3DGeometry
				font="/Inter-semibold.blob"
				text={'hello\nworld'}
				bevelEnabled
				bevelSegments={20}
				curveSegments={12}
				bevelThickness={0.2}
				bevelSize={0.2}
				size={5}
				height={1}
			/>
			<T.MeshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.2} />
		</T.Mesh>
	</Float>

	<Float>
		<T.Group scale={0.7} position={[1, 0, 0]} rotation.y={planetRotation}>
			<PlanetModel />
		</T.Group>
	</Float>

	<T.Group position.z={0.3} position.y={0.3}>
		<Root pixelSize={0.001} sizeX={0.5} sizeY={0.4} padding={5} flexDirection="column">
			<Container flexDirection="column" alignItems="center" gap={30}>
				<Text
					width={450}
					color="white"
					fontSize={30}
					fontWeight="bold"
					text={'Turn around in this direction to see the rest of my portfolio'}
				/>
				<SVG
					src="/arrow.svg"
					height={50}
					color="white"
					transformTranslateX={currentArrowTranslate}
				/>
			</Container>
		</Root>
	</T.Group>
</T.Group>
