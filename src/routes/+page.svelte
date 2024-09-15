<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';

	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import About from '$lib/components/About.svelte';
	import Learning from '$lib/components/Learning.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Loading from '$lib/components/Loading.svelte';

	import { gsap } from 'gsap';
	import { Flip } from 'gsap/Flip';
	import { onMount, tick } from 'svelte';
	import PlanetScene from '$lib/3D/PlanetScene.svelte';
	gsap.registerPlugin(Flip);

	let showTitle = false;

	let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' = 'home';

	function getScrollPercent() {
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		let clientHeight = document.documentElement.clientHeight;

		return scrollTop / (scrollHeight - clientHeight);
	}
	let percentageScroll: number = 0;

	onMount(() => {
		let animationTime = 2.1;

		setTimeout(async () => {
			const state = Flip.getState('.hello');
			console.log(state);

			showTitle = true;
			await tick();

			let fade = gsap.to('.background', { opacity: 0, duration: 1 });
			Flip.from(state, {
				targets: '.hello',
				absolute: true,
				duration: 1
			});
		}, animationTime * 1000);
	});

	function setActive() {
		// @ts-ignore
		let currentlyActive = mostVisible(document.querySelectorAll('.section'));

		if (currentlyActive && currentlyActive.id) {
			active = currentlyActive.id;
		}
	}
</script>

<svelte:window
	on:scroll={() => {
		percentageScroll = getScrollPercent();
		setActive();
	}}
/>

<PlanetScene pos={percentageScroll} />

<Navbar {active} />

<Loading show={!showTitle} />

<Hero {showTitle} />

<About />

<Projects />

<Posts />

<!-- <Tools /> -->

<Learning />

<Contact />

<Footer />
