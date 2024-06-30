<script>
	import { T } from '@threlte/core';
	import Github from '../components/Icons/Github.svelte';
	import Linkedin from '../components/Icons/Linkedin.svelte';

	import Mail from '../components/Icons/Mail.svelte';
	import { Float, Text3DGeometry } from '@threlte/extras';
	import { Container, Root, Text } from 'threlte-uikit';
</script>

<T.Group position={[-1.3, 1.3, 0.8]} rotation.y={Math.PI / 2 + 0.4}>
	<T.Group position={[-0.5, 0, 0]}>
		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<T.Mesh scale={0.03}>
				<Text3DGeometry
					font="/Inter-semibold.blob"
					text={'get'}
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

		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<T.Mesh scale={0.03} position.x={0.45}>
				<Text3DGeometry
					font="/Inter-semibold.blob"
					text={'in'}
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

		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<T.Mesh scale={0.03} position.x={0.7}>
				<Text3DGeometry
					font="/Inter-semibold.blob"
					text={'touch'}
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
	</T.Group>

	<T.Mesh position={[0, -0.4, 0.3]}>
		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<Mail />
		</Float>
		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<Github position.x={0.3} />
		</Float>
		<Float rotationIntensity={0.5} rotationSpeed={1}>
			<Linkedin position.x={-0.3} />
		</Float>
	</T.Mesh>
	<Float>
		<T.Group position={[0, -0.8, 0.1]}>
			<Root pixelSize={0.001} sizeX={0.8} padding={5} flexDirection="column">
				<Container flexDirection="column">
					<Text
						fontWeight="bold"
						fontSize={70}
						color="white"
						text="links open in a new background tab when in vr"
					/>
				</Container>
			</Root>
		</T.Group>
	</Float>
</T.Group>
