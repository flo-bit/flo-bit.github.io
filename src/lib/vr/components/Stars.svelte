<script lang="ts">
	import { T, useTask } from '@threlte/core';

	import UberNoise from './uber-noise';
	import { Color } from 'three';

	import { useTexture } from '@threlte/extras';
	const map = useTexture('/texture.png');

	const count = 5000;

	const minRadius = 20;
	const maxRadius = 50;

	const noise = new UberNoise({ scale: 0.3 });

	const resetParticle = (i: number) => {
		positions[i * 3 + 0] = (Math.random() - 0.5) * maxRadius * 2;
		positions[i * 3 + 1] = (Math.random() - 0.5) * maxRadius * 2;
		positions[i * 3 + 2] = (Math.random() - 0.5) * maxRadius * 2;

		// check if smaller than minRadius
		if (
			positions[i * 3 + 0] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2 <
			minRadius ** 2
		) {
			resetParticle(i);
			return;
		}

		colors[i * 3 + 0] = Math.random() < 0.2 ? 0.3 : 1.0;
		colors[i * 3 + 1] = Math.random() < 0.2 ? 0.3 : 1.0;
		colors[i * 3 + 2] = Math.random() < 0.2 ? 0.3 : 1.0;
	};

	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);

	const setup = () => {
		for (let i = 0; i < count; i++) {
			resetParticle(i);
		}
	};

	setup();

	let updateNum = 0;

	const update = (delta: number) => {
		let speedScale = 0.2;
		let scl = 0.00001;

		for (let i = 0; i < count; i++) {
			const x = positions[i * 3 + 0];
			const y = positions[i * 3 + 1];
			const z = positions[i * 3 + 2];

			const xV = noise.get(x + i * scl, y, z);
			const yV = noise.get(y, z + i * scl, x);
			const zV = noise.get(z, x, y + i * scl);

			positions[i * 3 + 0] += xV * delta * speedScale;
			positions[i * 3 + 1] += yV * delta * speedScale;
			positions[i * 3 + 2] += zV * delta * speedScale;

			// colors[i * 3 + 0] = Math.abs(xV);
			// colors[i * 3 + 1] = Math.abs(yV);
			// colors[i * 3 + 2] = Math.abs(zV);
		}

		updateNum = (updateNum + 1) % 10;
		noise.move(0, delta, 0);
	};

	const { start, stop, started, task } = useTask((delta) => {
		update(delta);
	});
</script>

{#await map then value}
	<T.Points rotation.z={0.5}>
		<T.BufferGeometry>
			<T.BufferAttribute
				args={[positions, 3]}
				attach={(parent, self) => {
					parent.setAttribute('position', self);
					return () => {};
				}}
			/>

			<T.BufferAttribute
				args={[colors, 3]}
				attach={(parent, self) => {
					parent.setAttribute('color', self);
					return () => {};
				}}
			/>
		</T.BufferGeometry>
		<T.PointsMaterial size={0.1} vertexColors map={value} transparent alphaTest={0.5} />/>
	</T.Points>
{/await}
