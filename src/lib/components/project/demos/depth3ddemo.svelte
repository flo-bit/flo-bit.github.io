<script lang="ts">
	import { Depth3D } from './depth-3d';

	//@ts-expect-error - not found
	import girl from './depth-3d/images/girl.jpg?format=webp&w=1024';
	//@ts-expect-error - not found
	import girldepth from './depth-3d/images/girl-depth.png?format=webp&w=1024';

	//@ts-expect-error - not found
	import napoleon from './depth-3d/images/napoleon-crossing-the-alps.jpg?format=webp&w=1024';
	//@ts-expect-error - not found
	import napoleondepth from './depth-3d/images/napoleon-crossing-the-alps-depth.png?format=webp&w=1024';

	//@ts-expect-error - not found
	import vanGogh from './depth-3d/images/van-gogh-self-portrait.webp?format=webp&w=1024';
	//@ts-expect-error - not found
	import vanGoghdepth from './depth-3d/images/van-gogh-self-portrait-depth.png?format=webp&w=1024';

	//@ts-expect-error - not found
	import monaLisa from './depth-3d/images/mona-lisa.jpg?format=webp&w=1024';
	//@ts-expect-error - not found
	import monaLisadepth from './depth-3d/images/mona-lisa-depth.png?format=webp&w=1024';

	let images: {
		image: string;
		depth: string;
	}[] = [
		{
			image: girl,
			depth: girldepth
		},
		{
			image: napoleon,
			depth: napoleondepth
		},
		{
			image: vanGogh,
			depth: vanGoghdepth
		},
		{
			image: monaLisa,
			depth: monaLisadepth
		}
	];

	let currentImage = 0;
</script>

<button
	on:click={() => {
		console.log('clicked');
		currentImage = (currentImage + 1) % images.length;
	}}
	class="h-full w-full"
>
	{#key currentImage}
		<Depth3D
			image={{ image: images[currentImage].image, depth: images[currentImage].depth }}
			detail={500}
			cameraPosition={[0, 0, 7]}
		/>
	{/key}
</button>
