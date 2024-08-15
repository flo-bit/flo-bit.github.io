import svelteswipecards from '$lib/images/projects-new/svelte-swiper-cards-demo.mp4';
import fluidtexteffect from '$lib/images/projects-new/text-effect-fluid-demo.mp4';
import fake3d from '$lib/images/projects-new/fake3dimage-demo.mp4';
import hyperlumen from '$lib/images/projects-new/hyperlumen-demo.mp4';
import marblellous from '$lib/images/projects-new/marblellous-demo.mp4';
import oldcode from '$lib/images/projects-new/old-code-demo.mp4';
import autostereogramrenderer from '$lib/images/projects-new/autostereogram-renderer-demo.mp4';
import mandala from '$lib/images/projects-new/mandala-demo.mp4';
import threltevrcodeeditor from '$lib/images/projects-new/threlte-vr-code-editor-demo.mp4';

import svelteswipecards1 from '$lib/images/projects-new/svelte-swiper-cards-image.png';

import hyperlumen1 from '$lib/images/projects-new/hyperlumen/1.jpg';
import hyperlumen2 from '$lib/images/projects-new/hyperlumen/2.jpg';
import hyperlumen3 from '$lib/images/projects-new/hyperlumen/3.jpg';
import hyperlumen4 from '$lib/images/projects-new/hyperlumen/4.jpg';

import shadowshmup from '$lib/images/projects-new/shmup/shadow-shmup-demo.mp4';

export type Project = {
	src: string;
	key: string;
	name: string;
	alt: string;

	href?: string;
	aspect?: string;
	description?: string;
	code?: string;
	images?: string[];
	highlights?: string[];
	details?: string;
	projectPageVersion?: 'v1' | 'v2' | 'v3';
	tags?: string[];

	projectUrl?: string;
	codeUrl?: string;
};

export const projects: Project[] = [
	{
		src: svelteswipecards,
		key: 'svelte-swiper-cards',
		alt: 'svelte-swiper-cards',
		href: 'https://flo-bit.github.io/svelte-swiper-cards/',

		projectUrl: 'https://flo-bit.github.io/svelte-swiper-cards/',

		aspect: 'aspect-[9/18]',
		name: 'swipable card component',
		description: 'a swipeable tinder like card component for svelte.',
		code: 'https://github.com/flo-bit/svelte-swiper-cards/',

		codeUrl: 'https://github.com/flo-bit/svelte-swiper-cards/',

		projectPageVersion: 'v2',
		tags: ['svelte', 'typescript', 'component'],
		images: [svelteswipecards1, svelteswipecards1]
	},
	{
		src: fluidtexteffect,
		key: 'text-effect-fluid',
		alt: 'Text Fluid Effect',
		projectUrl: 'https://flo-bit.github.io/text_effect_fluid/',
		aspect: 'aspect-[23/9]',
		name: 'fluid text effect',
		codeUrl: 'https://github.com/flo-bit/text_effect_fluid'
	},
	{
		src: shadowshmup,
		key: 'shadow-shmup',
		codeUrl: 'https://flo-bit.github.io/shadow-shmup/',
		alt: 'shadow shmup',
		aspect: 'aspect-[13/9]',
		name: 'shadow shmup',
		description: 'a 2d shoot em up game with cool visuals. made for piratejam 2024',
		tags: ['game', '2d', 'pixijs']
	},
	{
		src: hyperlumen,
		key: 'hyperlumen',
		alt: 'Hyperlumen',

		projectUrl: 'https://hyperlumen.de',

		aspect: 'aspect-[9/14]',
		name: 'hyperlumen',
		description:
			"light-up clothes that make you feel like you're in a sci-fi movie. perfect for raves.",
		images: [hyperlumen1, hyperlumen2, hyperlumen3, hyperlumen4],
		highlights: [
			'controlled via wifi with your smartphone',
			'all the colors, all the animations',
			'powered by a powerbank',
			'handmade in germany'
		],
		projectPageVersion: 'v1',
		tags: ['wled', 'wearable', 'leds', 'hardware']
	},
	{
		src: mandala,
		key: 'svg-mandala',
		alt: 'svg mandala drawer',
		projectUrl: 'https://flo-bit.github.io/mandala/',
		aspect: 'aspect-1',
		name: 'svg mandala drawer',
		description: 'draw svg mandalas in the browser.'
	},
	{
		src: fake3d,
		key: 'image2fake3d',
		alt: 'Image2Fake3D',
		projectUrl: 'https://flo-bit.github.io/image2fake3d/',
		aspect: 'aspect-[9/16]',
		name: 'image2fake3d',
		description:
			'turns an image into a fake 3d image that you can rotate with your mouse or gyro sensor.',
		codeUrl: 'https://github.com/flo-bit/image2fake3d'
	},
	{
		src: marblellous,
		key: 'marblellous',
		alt: 'marblellous',
		projectUrl: 'https://flo-bit.github.io/ball-game/',
		aspect: 'aspect-[9/10]',
		name: 'marblellous',
		description:
			'simple 3d browser game made with threlte. inspired by the game "marble blast gold".',
		codeUrl: 'https://github.com/flo-bit/ball-game'
	},
	{
		src: oldcode,
		key: 'old-code',
		alt: 'old projects',
		projectUrl: 'https://flo-bit.github.io/old-code/',
		aspect: 'aspect-[16/11]',
		name: 'old coding projects',
		code: 'https://github.com/flo-bit/old-code'
	},
	{
		src: threltevrcodeeditor,
		key: 'threlte-vr-code-editor',
		alt: 'threlte vr code editor',
		projectUrl: 'https://github.com/flo-bit/threlte-vr-code-editor',
		aspect: 'aspect-[16/11]',
		name: 'threlte vr code editor',
		description: 'a virtual reality code editor made with threlte.',
		code: 'https://github.com/flo-bit/threlte-vr-code-editor'
	},
	{
		src: autostereogramrenderer,
		key: 'autostereogram-renderer',
		alt: 'autostereogram renderer',
		projectUrl: 'https://flo-bit.github.io/autostereogram-renderer/',
		aspect: 'aspect-1',
		name: 'autostereogram renderer',
		description: 'rendering a 3d scene as an autostereogram.'
	}
];
