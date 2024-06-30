<script lang="ts">
	import type { RigidBody as RB } from '@dimforge/rapier3d-compat';
	import { T, useTask } from '@threlte/core';
	import { Float, PositionalAudio, Text3DGeometry, AudioListener } from '@threlte/extras';
	import { Collider, Debug, RigidBody } from '@threlte/rapier';
	import { Headset, useController, useXR } from '@threlte/xr';
	import * as THREE from 'three';
	import Paddle from '../components/Paddle.svelte';
	import { Container, Content, Root, Text } from 'threlte-uikit';
	import { spring } from '../components/Utils';

	const rightController = useController('right');

	let position = new THREE.Vector3();
	let rotation = new THREE.Quaternion();
	const { start, stop } = useTask(
		() => {
			if (!$rightController?.grip.position || !paddle) return;
			position.copy($rightController?.grip.position);
			rotation.copy($rightController?.grip.quaternion);

			paddle?.setTranslation(position, true);
			paddle?.setRotation(rotation, true);
		},
		{ autoStart: false }
	);

	let paddle: RB;
	let ball: RB;

	let hitArea: THREE.Group;

	let score = 0;

	let highscore = 0;

	let isPlaying = false;

	$: if (isPlaying) {
		start();
	} else {
		stop();
	}

	let isHovering = false;

	let paddleScale = spring<number>(1);
	let currentPaddeScale = 1;

	useTask((dt) => {
		currentPaddeScale = paddleScale.update(dt);
	});

	function newHighscore() {
		// todo: add highscore to local storage
		// todo: add sound and confetti
	}

	function hit() {
		score++;

		// @ts-ignore hapticActuators
		$rightController?.inputSource.gamepad?.hapticActuators[0].pulse(0.5, 50);

		// play sound
		playAudio();
	}

	let playAudio: () => void;

	const { isPresenting, isHandTracking, session, xrFrame } = useXR();
</script>

<Headset>
	<AudioListener />
</Headset>

<T.Group position={[-1.2, 1, -0.5]} rotation.y={1.2}>
	<Root pixelSize={0.001} sizeX={1} padding={5} flexDirection="column">
		<Container flexDirection="column" gap={60}>
			<Text
				fontWeight="bold"
				fontSize={60}
				color="white"
				text={$isPresenting
					? isPlaying
						? 'click on the paddle again\nto stop playing'
						: 'want to play a game?\nclick on the ping pong paddle!'
					: 'launch this website in vr \nto play a round of pong!'}
			/>
		</Container>
	</Root>

	<T.Group position.y={0.5}>
		<Root pixelSize={0.001} sizeX={1} padding={5} flexDirection="column">
			<Container flexDirection="row" gap={100}>
				{#if isPlaying}
					<Container flexDirection="column">
						<Text fontWeight="bold" fontSize={60} color="white" text={'score: ' + score} />
					</Container>
				{/if}
				<Container flexDirection="column">
					<Text fontWeight="bold" fontSize={60} color="white" text={'highscore'} />
					<Content width={10} height={100}>
						<T.Mesh scale={0.00035} position.y={-0.002} position.x={0.0004}>
							<Text3DGeometry
								font="/Inter-semibold.blob"
								bevelEnabled
								bevelSegments={20}
								curveSegments={12}
								bevelThickness={0.2}
								bevelSize={0.2}
								size={5}
								height={1}
								text={highscore.toString()}
							/>
							<T.MeshStandardMaterial color="#67e8f9" metalness={1.0} roughness={0.0} />
						</T.Mesh>
					</Content>
				</Container>
			</Container>
		</Root>
	</T.Group>

	<Float rotationIntensity={1} rotationSpeed={0.3}>
		<T.Group
			position={[0, -0.5, 0.06]}
			scale={currentPaddeScale}
			rotation.x={Math.PI / 2}
			rotation.z={-0.4}
		>
			<Paddle scale={0.015} position.z={0.05} rotation.x={Math.PI} rotation.z={0.0} />
			<T.Mesh
				position.z={-0.15}
				on:pointerenter={() => {
					isHovering = true;

					paddleScale.set(1.2);
				}}
				on:pointerleave={() => {
					isHovering = false;

					paddleScale.set(1);
				}}
				on:click={() => {
					if (!$isPresenting) return;

					isPlaying = !isPlaying;
				}}
			>
				<T.BoxGeometry args={[0.25, 0.1, 0.4]} />
				<T.MeshStandardMaterial color="red" depthWrite={false} colorWrite={false} />
			</T.Mesh>
		</T.Group>
	</Float>
</T.Group>

{#if isPlaying}
	<!-- ball -->
	<T.Group position.y={2}>
		<RigidBody type={'dynamic'} bind:rigidBody={ball} ccd>
			<Collider mass={1} restitution={1} shape={'ball'} args={[0.02]} />
			<T.Mesh castShadow receiveShadow>
				<T.SphereGeometry args={[0.02]} />
				<T.MeshStandardMaterial color="#F8EBCE" roughness={0} />
			</T.Mesh>
		</RigidBody>
	</T.Group>

	<!-- paddle -->
	<T.Group position={[0, 0, 0]}>
		<RigidBody type={'kinematicPosition'} bind:rigidBody={paddle} on:contact={hit}>
			<T.Group position.z={-0.13} bind:ref={hitArea}>
				<Collider
					contactForceEventThreshold={30}
					restitution={1}
					shape={'cuboid'}
					args={[0.07, 0.02, 0.085]}
				/>

				<PositionalAudio autoplay={false} bind:play={playAudio} src={'/impact.ogg'} volume={1.0} />
			</T.Group>
			<Paddle scale={0.01} position.z={0.05} rotation.x={Math.PI} rotation.z={0.0} />
		</RigidBody>
	</T.Group>

	<!-- floor -->
	<T.Group position={[0, -0.5, 0]}>
		<Collider
			shape={'cuboid'}
			on:contact={() => {
				// get world position of hit area
				const position = hitArea?.getWorldPosition(new THREE.Vector3());

				// reset ball position to above the paddle
				ball?.setTranslation({ x: position.x, y: position.y + 0.4, z: position.z }, true);
				ball?.setLinvel({ x: 0, y: 0, z: 0 }, true);
				ball?.setAngvel({ x: 0, y: 0, z: 0 }, true);

				if (score > highscore) {
					highscore = score;
					newHighscore();
				}

				score = 0;
			}}
			args={[20, 1, 20]}
		></Collider>
	</T.Group>
{/if}

<!-- <Debug /> -->
