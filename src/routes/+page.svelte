<script lang="ts">
	//@ts-ignore
	import fallback from '$lib/images/fallback.png?w=64&format=webp';

	import Navbar from '$lib/components/nav/Navbar.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from '$lib/3D/Scene.svelte';

	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import About from '$lib/components/About.svelte';
	import Learning from '$lib/components/Learning.svelte';
	import Posts from '$lib/components/Posts.svelte';

	let active: 'home' | 'about' | 'projects' | 'learning' | 'contact' = 'home';

	function getScrollPercent() {
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		let clientHeight = document.documentElement.clientHeight;

		return scrollTop / (scrollHeight - clientHeight);
	}
	let percentageScroll: number = 0;

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

<img
	class="fixed left-0 right-0 top-0 h-screen -z-50 object-cover blur-md"
	src={fallback}
	alt="background"
/>
<div class="fixed left-0 right-0 top-0 h-screen">
	<Canvas>
		<Scene pos={percentageScroll} />
	</Canvas>
</div>

<Navbar {active} />

<Hero />

<About />

<Projects />

<Posts />

<Learning />

<Contact />

<Footer />
