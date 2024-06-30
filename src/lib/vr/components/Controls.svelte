<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { Euler, Camera } from 'three';
	import { useThrelte, useParent } from '@threlte/core';
	// Set to constrain the pitch of the camera
	// Range is 0 to Math.PI radians
	export let minPolarAngle = 0; // radians
	export let maxPolarAngle = Math.PI; // radians
	export let pointerSpeed = 1.0;
	let isPressed = false;
	const { renderer, invalidate } = useThrelte();
	const domElement = renderer.domElement;
	const camera = useParent();
	const dispatch = createEventDispatcher();
	const _euler = new Euler(0, 0, 0, 'YXZ');
	const _PI_2 = Math.PI / 2;
	if (!renderer) {
		throw new Error('Threlte Context missing: Is <Controls> a child of <Canvas>?');
	}
	const isCamera = (p: any): p is Camera => {
		return p.isCamera;
	};
	if (!isCamera($camera)) {
		throw new Error('Parent missing: <Controls> need to be a child of a <Camera>');
	}
	const onChange = () => {
		invalidate();
		dispatch('change');
	};
	const onMouseDown = () => {
		isPressed = true;
	};
	const onMouseUp = () => {
		isPressed = false;
	};
	export const unlock = () => document.exitPointerLock();
	domElement.addEventListener('mousemove', onMouseMove);
	domElement.addEventListener('mousedown', onMouseDown);
	domElement.addEventListener('mouseup', onMouseUp);

	onDestroy(() => {
		domElement.removeEventListener('mousemove', onMouseMove);
		domElement.removeEventListener('mousedown', onMouseDown);
		domElement.removeEventListener('mouseup', onMouseUp);
	});

	function onMouseMove(event: MouseEvent) {
		if (!isPressed) return;
		if (!$camera) return;
		const { movementX, movementY } = event;
		_euler.setFromQuaternion($camera.quaternion);
		_euler.y -= movementX * 0.002 * pointerSpeed;
		_euler.x -= movementY * 0.002 * pointerSpeed;
		_euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x));
		$camera.quaternion.setFromEuler(_euler);
		onChange();
	}
</script>
