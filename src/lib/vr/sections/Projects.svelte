<script lang="ts">
	import { T } from '@threlte/core';
	import { Container, Root, Text } from 'threlte-uikit';
	import Project from '../components/Project.svelte';
	import { Float } from '@threlte/extras';

	import svelteswipecards from '$lib/images/projects-new/svelte-swiper-cards-demo.mp4';
	import fluidtexteffect from '$lib/images/projects-new/text-effect-fluid-demo.mp4';
	import hyperlumen from '$lib/images/projects-new/hyperlumen-demo.mp4';
	import marblellous from '$lib/images/projects-new/marblellous-demo.mp4';
	import oldcode from '$lib/images/projects-new/old-code-demo.mp4';
	import mandala from '$lib/images/projects-new/mandala-demo.mp4';

	import threltevrcodeeditor from '$lib/images/projects-new/threlte-vr-code-editor-demo.mp4';

	let selectedProject:
		| 'svelte-swiper-cards'
		| 'text-effect-fluid'
		| 'hyperlumen'
		| 'mandala'
		| 'marblellous'
		| 'old-code'
		| 'threlte-vr-code-editor'
		| null = null;

	function clickedProject(project: typeof selectedProject) {
		if (selectedProject === project) {
			selectedProject = null;
			return;
		}

		selectedProject = project;
	}
</script>

<T.Group position={[0, 1, 1.8]} rotation.y={Math.PI}>
	<Float>
		<T.Group position={[0, 0.3, 0]}>
			<Root pixelSize={0.001} sizeX={1} sizeY={2} padding={5} flexDirection="column">
				<Container
					flexDirection="column"
					gap={30}
					backgroundColor="#111111"
					borderRadius={40}
					padding={80}
				>
					<Text fontWeight="bold" fontSize={70} color="white" text="things i've made" />
				</Container>
			</Root>
		</T.Group>
	</Float>

	<Project
		selected={selectedProject === 'svelte-swiper-cards'}
		clicked={() => clickedProject('svelte-swiper-cards')}
		position={[0.8, 0.3, 0]}
		rotation.y={-0.2}
		name="svelte swiper cards"
		sizeX={0.4}
		sizeY={0.85}
		video={svelteswipecards}
		description="a swipeable tinder like card component for svelte."
		sourceLink="https://github.com/flo-bit/svelte-swiper-cards/"
	/>

	<Project
		selected={selectedProject === 'threlte-vr-code-editor'}
		clicked={() => clickedProject('threlte-vr-code-editor')}
		position={[-0.9, 0.5, 0.09]}
		rotation.y={0.3}
		name="threlte vr code editor"
		sizeX={0.6}
		sizeY={0.4}
		panelDirection="right"
		video={threltevrcodeeditor}
		description="a proof of concept for a virtual reality code editor made with threlte."
		sourceLink="https://github.com/flo-bit/svelte-swiper-cards/"
	/>

	<Project
		selected={selectedProject === 'hyperlumen'}
		clicked={() => clickedProject('hyperlumen')}
		position={[-0.3, -0.2, 0]}
		rotation.y={0.15}
		name="hyperlumen"
		sizeX={0.45}
		sizeY={0.75}
		video={hyperlumen}
		link="https://hyperlumen.de"
		panelDirection="right"
		description="light-up clothes that make you feel like you're in a sci-fi movie. perfect for raves."
	/>
	<Project
		selected={selectedProject === 'mandala'}
		clicked={() => clickedProject('mandala')}
		position={[-0.33, 0.6, -0.08]}
		rotation.y={0.17}
		name="mandala drawer"
		sizeX={0.5}
		sizeY={0.6}
		video={mandala}
		link="https://flo-bit.github.io/mandala/"
		panelDirection="right"
		description="draw svg mandalas in the browser."
	/>

	<Project
		selected={selectedProject === 'text-effect-fluid'}
		clicked={() => clickedProject('text-effect-fluid')}
		position={[-0.9, 0, 0]}
		rotation.y={0.25}
		name="fluid text effect"
		sizeX={0.5}
		sizeY={0.28}
		video={fluidtexteffect}
		link="https://flo-bit.github.io/text_effect_fluid/"
		panelDirection="right"
		description="a text effect that makes text look like it's made of liquid."
	/>

	<Project
		selected={selectedProject === 'marblellous'}
		clicked={() => clickedProject('marblellous')}
		position={[0.3, -0.1, 0.07]}
		rotation.y={-0.05}
		name="marblellous"
		sizeX={0.5}
		sizeY={0.6}
		video={marblellous}
		link="https://flo-bit.github.io/ball-game/"
		panelDirection="left"
		description="simple 3d browser game made with threlte. inspired by the game 'marble blast gold'."
	/>

	<Project
		selected={selectedProject === 'old-code'}
		clicked={() => clickedProject('old-code')}
		position={[0.25, 0.6, 0]}
		name="old coding projects"
		sizeX={0.55}
		sizeY={0.45}
		video={oldcode}
		description="a collection of some of my old coding projects. mostly art made with p5.js"
		sourceLink="https://github.com/flo-bit/old-code"
	/>

	<Float>
		<T.Group position={[0, -0.8, 0.1]}>
			<Root pixelSize={0.001} sizeX={1} padding={5} flexDirection="column">
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
