<script lang="ts">
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';

	const map = useTexture('smoke.png');

	//const redColors = [0xff0000, 0xffff00, 0xff8800];
	const blueColors = [0x34d399, 0x2dd4bf, 0x67e8f9, 0x0ea5e9, 0x60a5fa];
</script>

{#await map then value}
	<!-- <T.Group rotation.z={0.5} position.x={5}>
	{#each Array.from({ length: 30 }) as _, i}
		<T.Mesh
			position.z={-20 + Math.random()}
			position.x={Math.random() * 10}
			position.y={Math.random() * 5}
			rotation.z={Math.random() * 4}
			scale={Math.random() * 8 + 2}
		>
			<T.PlaneGeometry />
			<T.MeshLambertMaterial
				map={value}
				color={redColors[Math.floor(Math.random() * redColors.length)]}
				transparent={true}
				opacity={0.5}
                depthWrite={false}
			/>
		</T.Mesh>
	{/each}
</T.Group> -->

	<T.Group rotation.z={-0.5} position.x={-5} position.y={10}>
		{#each Array.from({ length: 20 }) as _, i}
			<T.Mesh
				position.z={-20 + Math.random()}
				position.x={Math.random() * 40 - 10}
				position.y={Math.random() * 20 - 10}
				rotation.z={Math.random() * 4}
				scale={(Math.random() * 8 + 1) * 4}
			>
				<T.PlaneGeometry />
				<T.MeshLambertMaterial
					map={value}
					color={blueColors[Math.floor(Math.random() * blueColors.length)]}
					transparent={true}
					opacity={0.3}
					depthWrite={false}
				/>
			</T.Mesh>
		{/each}
	</T.Group>
{/await}
