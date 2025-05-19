<script lang="ts">
	import { T, useTask, useThrelte } from "@threlte/core";
	import { interactivity, useCursor } from "@threlte/extras";
	import { Quaternion, Euler, Vector2, Group } from "three";
	import { onMount } from "svelte";
	import { spring } from "../Utils";
  
	const { onPointerEnter, onPointerLeave } = useCursor();
	interactivity();
  
	let size = 1.5;
	let sizeSpring = spring<number>(size, 0.1, 0.5);
  
	let distance = 4;
	const maxSpeed = 0.03;
	const acceleration = 0.0002;
	const damping = 0.98;
  
	let isDragging = false;
	let previousPointerPosition = new Vector2();
	let velocity = new Vector2();
	let totalMove = new Vector2();
  
	let quaternion = new Quaternion();
	let planet: Group;
  
	function isSmallScreen() {
	  return window.innerWidth < 750;
	}
  
	useTask((delta) => {
	  size = sizeSpring.update(delta);
  
	  velocity.multiplyScalar(damping);
  
	  let rotate = isDragging ? 0.0 : 0.001;
  
	  const deltaRotationQuaternion = new Quaternion().setFromEuler(
		new Euler(
		  velocity.y * delta * 120,
		  (velocity.x + rotate) * delta * 120,
		  0,
		  "XYZ"
		)
	  );
	  quaternion.multiplyQuaternions(deltaRotationQuaternion, quaternion);
  
	  if (planet) {
		planet.quaternion.copy(quaternion);
		planet.position.set(0, 0, -distance);
	  }
	});
  
	const onPointerMove = (event: PointerEvent | TouchEvent) => {
	  if (!isDragging) return;
	  event.preventDefault();
  
	  let clientX = 0,
		clientY = 0;
	  if (window.TouchEvent && event instanceof TouchEvent) {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	  } else if (event instanceof PointerEvent) {
		clientX = event.clientX;
		clientY = event.clientY;
	  }
  
	  const deltaMove = new Vector2(
		clientX - previousPointerPosition.x,
		clientY - previousPointerPosition.y
	  );
	  totalMove.add(deltaMove);
  
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
	  let clientX = 0,
		clientY = 0;
	  if (window.TouchEvent && event instanceof TouchEvent) {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	  } else if (event instanceof PointerEvent) {
		clientX = event.clientX;
		clientY = event.clientY;
	  }
	  previousPointerPosition.set(clientX, clientY);
	  totalMove.set(0, 0);
  
	  if (window.TouchEvent && event instanceof window.TouchEvent) {
		event.preventDefault();
	  }
	};
  
	const onPointerUp = () => {
	  isDragging = false;
  
	  totalMove.set(0, 0);
	};
  
	const { renderer } = useThrelte();
  
	function onResize() {
	  if (window.innerWidth < 750) {
		distance = 8;
	  } else {
		distance = 5;
	  }
	}
  
	onMount(() => {
	  const canvas = renderer.domElement;
  
	  onResize();
  
	  canvas.addEventListener("pointermove", onPointerMove, { passive: false });
	  canvas.addEventListener("pointerup", onPointerUp, false);
	  canvas.addEventListener("touchmove", onPointerMove, { passive: false });
	  canvas.addEventListener("touchend", onPointerUp, false);
	  window.addEventListener("resize", onResize);
  
	  return () => {
		canvas.removeEventListener("pointermove", onPointerMove, false);
		canvas.removeEventListener("pointerup", onPointerUp, false);
		canvas.removeEventListener("touchmove", onPointerMove, false);
		canvas.removeEventListener("touchend", onPointerUp, false);
		window.removeEventListener("resize", onResize);
	  };
	});
  </script>
  
  <T.Group bind:ref={planet} scale={size}>
	<T.Mesh
	  visible={false}
	  onpointerdown={(evt: any) => {
		onPointerDown(evt.nativeEvent);
	  }}
	  onpointerleave={() => {
		sizeSpring.set(1.5);
		onPointerLeave();
	  }}
	  onpointerenter={() => {
		sizeSpring.set(1.6);
		onPointerEnter();
	  }}
	  ontouchstart={(evt: any) => {
		onPointerDown(evt.nativeEvent);
	  }}
	  ontouchend={() => {
		onPointerUp();
	  }}
	>
	  <T.SphereGeometry args={[1.2, 8, 8]} />
	  <T.MeshBasicMaterial />
	</T.Mesh>
  
	<slot />
  </T.Group>
    