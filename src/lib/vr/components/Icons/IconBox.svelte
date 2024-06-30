<script lang="ts">
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';

	export let link;

	export let color = '#212121';

	export let hoverColor = '#164e63';

	let isHovered = false;
</script>

<T.Mesh
	on:click={(e) => {
		e.stopPropagation();
		window.open(link, '_blank');
	}}
	on:pointerenter={(e) => {
		e.stopPropagation();
		isHovered = true;
	}}
	on:pointerleave={(e) => {
		e.stopPropagation();
		isHovered = false;
	}}
	position.z={-0.027}
>
	<RoundedBoxGeometry radius={0.02} args={[0.16, 0.16, 0.04]} />
	<T.MeshStandardMaterial metalness={0.9} roughness={0.2} color={isHovered ? hoverColor : color} />
</T.Mesh>
