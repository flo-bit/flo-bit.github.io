<script>
	import { T } from '@threlte/core';
	import { Container, Root, Text } from 'threlte-uikit';
	import DepthImage from '../components/DepthImage.svelte';
</script>

<T.Group position={[1.7, 1, 0.4]} rotation.y={-Math.PI / 2}>
	<Root pixelSize={0.001} sizeX={1.8} padding={5} flexDirection="column">
		<Container
			flexDirection="column"
			gap={50}
			backgroundColor="#111111"
			borderRadius={40}
			paddingBottom={100}
			padding={80}
		>
			<Container flexDirection="row">
				<Container flexDirection="column" gap={70}>
					<Text
						transformTranslateZ={30}
						fontWeight="bold"
						fontSize={70}
						color="white"
						text="hey there, i'm florian. i live in berlin, where i create things for the web (and other places)."
					/>

					<Text
						fontSize={40}
						color="white"
						text="i was one of the only kids in my class who didn't have some kind of game console at home. but we did have a computer and when I was 12, i got a coding book for christmas and decided to try my hand at making my own games (using c and opengl)."
					/>
				</Container>

				<Container width={1200} height={100}></Container>
			</Container>

			<Text
				fontSize={40}
				color="white"
				text="i never finished any of those games i tried to make then, but I was hooked. i've been programming ever since and after finishing school, i started studying computer science and working as a software developer."
			/>

			<Text
				fontSize={40}
				color="white"
				text="i especially love the web, because it's so accessible. anyone with some kind of electronic device and an internet connection can access your work in seconds. it's also very easy to publish and share your work with the world, be it a static website, a containerized application or a serverless function."
			/>
			<Text
				fontSize={40}
				color="white"
				text="nowadays, I built lots of things for the web, from websites to pwas and hybrid apps. turn right to see some of the things i've made."
			/>
		</Container>
	</Root>
</T.Group>

<DepthImage
	image={{ image: '/images/avatar.png', depth: '/images/avatar-depth.png' }}
	rounded={true}
	position={[1.58, 1.3, 0.8]}
	rotation.y={-Math.PI / 2 - 0.25}
/>
