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

// @ts-expect-error - module not found
import hyperlumen1 from '$lib/images/projects-new/hyperlumen/1.jpg?w=1024&format=webp';
// @ts-expect-error - module not found
import hyperlumen2 from '$lib/images/projects-new/hyperlumen/2.jpg?w=1024&format=webp';
// @ts-expect-error - module not found
import hyperlumen3 from '$lib/images/projects-new/hyperlumen/3.jpg?w=1024&format=webp';
// @ts-expect-error - module not found
import hyperlumen4 from '$lib/images/projects-new/hyperlumen/4.jpg?w=1024&format=webp';

// @ts-expect-error - module not found
import shadowshmup1 from '$lib/images/projects-new/shmup/image1.png?w=1024&format=webp';
// @ts-expect-error - module not found
import shadowshmup2 from '$lib/images/projects-new/shmup/image2.png?w=1024&format=webp';
// @ts-expect-error - module not found
import shadowshmup3 from '$lib/images/projects-new/shmup/image3.png?w=1024&format=webp';
// @ts-expect-error - module not found
import shadowshmup4 from '$lib/images/projects-new/shmup/image4.png?w=1024&format=webp';

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
	projectPageVersion?: 'grid' | 'carousel' | 'tiered' | 'full';
	tags?: string[];

	projectUrl?: string;
	codeUrl?: string;

	demo?: string;
};

export const projects: Project[] = [
	{
		src: svelteswipecards,
		key: 'svelte-swiper-cards',
		alt: 'svelte-swiper-cards',
		href: 'https://flo-bit.github.io/svelte-swiper-cards/',

		projectUrl: 'https://flo-bit.github.io/svelte-swiper-cards/',

		aspect: 'aspect-[9/18]',
		name: 'swipable card component for svelte',
		description: 'a swipeable tinder like card component for svelte. try the interactive demo!',
		code: 'https://github.com/flo-bit/svelte-swiper-cards/',

		codeUrl: 'https://github.com/flo-bit/svelte-swiper-cards/',

		projectPageVersion: 'tiered',
		tags: ['svelte', 'typescript', 'component', 'tailwindcss'],
		images: [svelteswipecards1],
		demo: 'swiper',
		highlights: [
			'tailwindcss',
			'reuses cards',
			'customizable',
			'modern (uses @use-gesture/vanilla for gestures)'
		]
	},
	{
		src: fluidtexteffect,
		key: 'text-effect-fluid',
		alt: 'Text Fluid Effect',
		projectUrl: 'https://flo-bit.github.io/text_effect_fluid/',
		aspect: 'aspect-[23/9]',
		name: 'fluid text effect',
		codeUrl: 'https://github.com/flo-bit/text_effect_fluid',
		description:
			'inspired by lumalabs landing page, adopted a cool fluid effect to work with text. sometimes still a bit broken (try refreshing the page once or twice if it is).',
		projectPageVersion: 'full',
		demo: 'fluid'
	},
	{
		src: shadowshmup,
		key: 'shadow-shmup',
		codeUrl: 'https://flo-bit.github.io/shadow-shmup/',
		alt: 'shadow shmup',
		aspect: 'aspect-[13/9]',
		name: 'shadow shmup',
		description:
			"fun and casual top-down, roguelike shoot 'em up with shadow elements and colorful neon effects. made for piratejam 2024",
		tags: ['game', '2d', 'pixijs', 'rapier2d', 'typescript'],
		images: [shadowshmup1, shadowshmup2, shadowshmup3, shadowshmup4],
		projectPageVersion: 'carousel',
		projectUrl: 'https://flo-bit.itch.io/shadow-shmup'
	},
	{
		src: hyperlumen,
		key: 'hyperlumen',
		alt: 'Hyperlumen',

		projectUrl: 'https://hyperlumen.de',
		codeUrl: '#',

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
		details:
			'for this project - apart from taking part in building the prototypes - i customized the awesome wled fireware, adding some effects and simplifying the web ui. i also made a simple website showcasing our prototypes using svelte and tailwindcss.',
		projectPageVersion: 'grid',
		tags: ['wled', 'wearable', 'leds', 'hardware', 'c++', 'svelte', 'hardware', 'tailwindcss']
	},
	{
		src: mandala,
		key: 'svg-mandala',
		alt: 'svg mandala drawer',
		projectUrl: 'https://flo-bit.github.io/mandala/',
		aspect: 'aspect-1',
		name: 'svg mandala drawer',
		description:
			'one of my earlier projects, draw svg mandalas in the browser. works on mobile too. made with paperjs and bulma. try the interactive demo above!',
		tags: ['svg', 'paperjs', 'javascript', 'bulma'],
		projectPageVersion: 'full',
		demo: 'mandala',
		codeUrl: 'https://github.com/flo-bit/mandala'
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
		codeUrl: 'https://github.com/flo-bit/image2fake3d',
		tags: ['svelte', 'depthmap', '3d', 'threlte']
	},
	{
		src: marblellous,
		key: 'marblellous',
		alt: 'marblellous',
		projectUrl: 'https://flo-bit.github.io/ball-game/',
		aspect: 'aspect-[9/10]',
		name: 'marblellous',
		description:
			'simple 3d browser game made with threlte. inspired by the game "marble blast gold". work in progress.',
		codeUrl: 'https://github.com/flo-bit/ball-game',
		tags: ['threlte', 'svelte', '3d', 'typescript', 'game']
	},
	{
		src: oldcode,
		key: 'old-code',
		alt: 'old projects',
		projectUrl: 'https://flo-bit.github.io/old-code/',
		aspect: 'aspect-[16/11]',
		name: 'old coding projects',
		codeUrl: 'https://github.com/flo-bit/old-code',
		description: 'a collection of my old coding projects. mostly made with p5.js',
		tags: ['p5.js', 'javascript', 'game', 'art', 'flowfield']
	},
	{
		src: threltevrcodeeditor,
		key: 'threlte-vr-code-editor',
		alt: 'threlte vr code editor',
		projectUrl: 'https://github.com/flo-bit/threlte-vr-code-editor',
		aspect: 'aspect-[16/11]',
		name: 'threlte vr code editor',
		description: 'a code editor in virtual reality made with threlte.',
		codeUrl: 'https://github.com/flo-bit/threlte-vr-code-editor',
		highlights: ['works with hot module replacement'],
		tags: ['threlte', 'svelte', 'vr', 'typescript', 'code editor']
	},
	{
		src: autostereogramrenderer,
		key: 'autostereogram-renderer',
		alt: 'autostereogram renderer',
		projectUrl: 'https://flo-bit.github.io/autostereogram-renderer/',
		codeUrl: 'https://github.com/flo-bit/autostereogram-renderer',
		aspect: 'aspect-1',
		name: 'autostereogram renderer',
		description: 'rendering a 3d scene as an autostereogram. try to see the hidden animal!',
		demo: 'autostereogram',
		projectPageVersion: 'tiered',
		highlights: ['creates autosteregram from rendered depth map'],
		tags: ['three.js', 'javascript', '3d', 'autostereogram']
	}
];