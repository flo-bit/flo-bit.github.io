<script lang="ts">
	import { T, useTask } from '@threlte/core';

	import { Float } from '@threlte/extras';
	import { Container, Root, Video, Text, Content } from 'threlte-uikit';
	import { spring } from './Utils';
	import Github from './Icons/Github.svelte';
	import Link from './Icons/Link.svelte';

	export let name: string;

	export let description: string = 'this is a project';

	export let sizeX = 0.6;
	export let sizeY = 1.1;

	export let video = '/projects-new/svelte-swiper-cards-demo.mp4';

	let border = 0;

	export let selected = false;

	let move = spring<number>(0);
	let scale = spring<number>(1);

	let currentMove = 0;
	let currentScale = 1;

	useTask((dt) => {
		currentMove = move.update(dt);
		currentScale = scale.update(dt);
	});

	export let panelDirection: 'left' | 'right' = 'left';

	export let sourceLink: string | undefined = undefined;
	export let link: string | undefined = undefined;

	export let clicked: () => void;

	$: if (selected) {
		move.set(1);
		scale.set(1.4);
	} else {
		move.set(0);
		scale.set(1);
	}
</script>

<Float>
	<T.Group {...$$restProps}>
		<T.Group position.y={currentMove * 0.15} scale={currentScale} position.z={currentMove * 0.45}>
			<Root anchorX="center" anchorY="center" pixelSize={0.001} {sizeX} {sizeY}>
				<Container
					padding={10 + (2 - border)}
					flexDirection="column"
					gap={10}
					width={sizeX * 1000}
					height={sizeY * 1000}
					backgroundColor={'#111111'}
					borderColor="white"
					borderWidth={border}
					borderRadius={60}
				>
					<Video autoplay loop muted src={video} borderRadius={60} />
					<Container
						zIndexOffset={20}
						transformTranslateZ={30}
						paddingLeft={30}
						alignItems="center"
						width="100%"
					>
						<Text
							color="white"
							textAlign="center"
							width="100%"
							fontSize={40}
							fontWeight="bold"
							text={name}
						/>
					</Container>
				</Container>
			</Root>
			<T.Mesh
				position.z={-0.07}
				on:click={(e) => {
					e.stopPropagation();

					clicked();
				}}
				on:pointerenter={(e) => {
					e.stopPropagation();
					border = 2;
				}}
				on:pointerleave={(e) => {
					e.stopPropagation();
					border = 0;
				}}
			>
				<T.BoxGeometry args={[sizeX, sizeY, 0.1]} />
				<T.MeshStandardMaterial transparent opacity={0} />
			</T.Mesh>

			<T.Group
				position.x={(panelDirection === 'left' ? -1 : 1) * currentMove * sizeX * 0.8}
				position.z={-0.08}
			>
				<Root anchorX="center" anchorY="center" pixelSize={0.001} {sizeX}>
					<Container
						padding={50}
						paddingLeft={(panelDirection === 'left' ? 0 : sizeX * 1000 * 0.2) + 50}
						paddingRight={(panelDirection === 'right' ? 0 : sizeX * 1000 * 0.2) + 50}
						flexDirection="column"
						gap={40}
						width={sizeX * 1000}
						backgroundColor="#080808"
						borderRadius={60}
						alignItems={panelDirection === 'left' ? 'flex-start' : 'flex-end'}
					>
						<Text
							color="white"
							textAlign={panelDirection}
							width="100%"
							fontSize={30}
							fontWeight="bold"
							text={name}
						/>
						<Text
							color="white"
							textAlign={panelDirection}
							width="100%"
							fontSize={25}
							fontWeight="semi-bold"
							text={description}
						/>

						{#if selected}
							{#if link}
								<Content width={100} height={100} marginTop={-20}>
									<Link {link} scale={0.005} />
								</Content>
							{/if}

							{#if sourceLink}
								<Content width={100} height={100} marginTop={-20}>
									<Github link={sourceLink} scale={0.005} />
								</Content>
							{/if}
						{/if}
					</Container>
				</Root>
			</T.Group>
		</T.Group>
	</T.Group>
</Float>
