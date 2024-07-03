<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Environment, interactivity } from '@threlte/extras';

	import Stars from './components/Stars.svelte';

	import Planet from './sections/Planet.svelte';
	import AboutMe from './sections/AboutMe.svelte';
	import Projects from './sections/Projects.svelte';
	import { Controller, Hand } from '@threlte/xr';

	import { pointerControls } from '@threlte/xr';
	import Contact from './sections/Contact.svelte';
	import Controls from './components/Controls.svelte';
	import Pong from './sections/Pong.svelte';

	import { HalfFloatType, EquirectangularReflectionMapping, SRGBColorSpace } from 'three';

	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

	interactivity();
	pointerControls('left');
	pointerControls('right');

	const { scene } = useThrelte();

	const loader = new RGBELoader();
	loader.setDataType(HalfFloatType);

	loader.load('/shanghai_riverside_1k.hdr', (texture) => {
		texture.mapping = EquirectangularReflectionMapping;
		texture.colorSpace = SRGBColorSpace;
		scene.environment = texture;
	});
</script>

<Controller right />
<Controller left />

<Hand right />
<Hand left />

<T.PerspectiveCamera makeDefault position={[0, 1, 0]} far={100} fov={75}>
	<Controls />
</T.PerspectiveCamera>

<Stars />

<T.DirectionalLight position={[0, 1, 0]} intensity={0.5} />

<Planet />

<AboutMe />

<Projects />

<Contact />

<Pong />
