<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { interactivity, useCursor } from '@threlte/extras';
	import { Quaternion, Euler, Vector2, Group } from 'three';
	import { onMount } from 'svelte';
	import { spring } from './Utils';

	import Stars from './Stars.svelte';
	import Nebula from './Nebula.svelte';
	import PlanetModel from './PlanetModel.svelte';

	const { onPointerEnter, onPointerLeave } = useCursor();
	interactivity();

	let size = 2;
	let sizeSpring = spring<number>(size, 0.1, 0.5);

	let distance = 1;
	const maxSpeed = 0.03;
	const acceleration = 0.0002;
	const damping = 0.98;

	let isDragging = false;
	let previousPointerPosition = new Vector2();
	let velocity = new Vector2();

	let quaternion = new Quaternion();
	let planet: Group;

	useTask((delta) => {
		size = sizeSpring.update(delta);

		velocity.multiplyScalar(damping);

		let rotate = isDragging ? 0.0 : 0.001;

		const deltaRotationQuaternion = new Quaternion().setFromEuler(
			new Euler(velocity.y * delta * 120, (velocity.x + rotate) * delta * 120, 0, 'XYZ')
		);
		quaternion.multiplyQuaternions(deltaRotationQuaternion, quaternion);

		if (planet) {
			planet.quaternion.copy(quaternion);
			planet.position.set(pos * 4 - 2, 0.5, -distance);
		}
	});

	const onPointerMove = (event: PointerEvent | TouchEvent) => {
		if (!isDragging) return;
		event.preventDefault();

		let clientX, clientY;
		if (event instanceof TouchEvent) {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}

		const deltaMove = new Vector2(
			clientX - previousPointerPosition.x,
			clientY - previousPointerPosition.y
		);

		velocity.x += deltaMove.x * acceleration;
		velocity.y += deltaMove.y * acceleration;

		// Limit the speed
		if (velocity.length() > maxSpeed) {
			velocity.normalize().multiplyScalar(maxSpeed);
		}

		previousPointerPosition.set(clientX, clientY);
	};

	const onPointerDown = (event: PointerEvent | TouchEvent) => {
		isDragging = true;
		let clientX, clientY;
		if (event instanceof TouchEvent) {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}
		previousPointerPosition.set(clientX, clientY);

		if (event instanceof TouchEvent) {
			event.preventDefault(); // Prevent scrolling
		}
	};

	const onPointerUp = () => {
		isDragging = false;
	};

	const { renderer } = useThrelte();

	onMount(() => {
		const canvas = renderer.domElement;

		canvas.addEventListener('pointermove', onPointerMove, {passive: false});
		canvas.addEventListener('pointerup', onPointerUp, false);
		canvas.addEventListener('touchmove', onPointerMove, {passive: false});
		canvas.addEventListener('touchend', onPointerUp, false);

		return () => {
			canvas.removeEventListener('pointermove', onPointerMove, false);
			canvas.removeEventListener('pointerup', onPointerUp, false);
			canvas.removeEventListener('touchmove', onPointerMove, false);
			canvas.removeEventListener('touchend', onPointerUp, false);
		};
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
/>

<T.DirectionalLight intensity={3} position={[-pos * 10 + 5, 2 + pos * 3, 2]} />

<T.Group
	bind:ref={planet}
	on:pointerdown={(evt) => {
		onPointerDown(evt.nativeEvent);
	}}
	on:pointerleave={() => {
		sizeSpring.set(2);
		onPointerLeave();
	}}
	on:pointerenter={() => {
		sizeSpring.set(2.1);
		onPointerEnter();
	}}
	on:touchstart={(evt) => {
		onPointerDown(evt.nativeEvent);
	}}
	on:touchend={() => {
		onPointerUp();
	}}
	scale={size}
>
	<PlanetModel />
</T.Group>

<Stars />
<Nebula />
