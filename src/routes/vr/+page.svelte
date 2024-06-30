<script lang="ts">
	import { VRButton, XR } from '@threlte/xr';
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import Scene from '$lib/vr/Scene.svelte';
</script>

<div class="h-screen w-screen">
	<Canvas>
		<World gravity={[0, -6, 0]}>
			<Scene />
			<XR></XR>
		</World>
	</Canvas>
</div>
<VRButton />
