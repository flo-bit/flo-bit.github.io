<script lang="ts">
	import Depth3D from '$lib/3D/Depth3D/Depth3D.svelte';

	// @ts-ignore
	import imageMe from '$lib/images/me.png?w=512&format=webp';
	// @ts-ignore
	import depthMe from '$lib/images/me-depth.png?w=512&format=webp';

	import Resume from './Resume.svelte';
</script>

<div class="relative isolate overflow-hidden bg-background">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="about" class="py-16 md:py-32 section">
			<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
				<div class="lg:pl-20 w-full flex lg:justify-center">
					<div class="max-w-sm px-2.5 lg:max-w-none">
						<!-- <img
							src={imageMe}
							alt="this is me"
							loading="lazy"
							sizes="(min-width: 1024px) 32rem, 20rem"
							class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
						/> -->

						<div class="rotate-3 size-96 -m-10 lg:-m-20">
							<Depth3D
								image={{
									image: imageMe,
									depth: depthMe
								}}
								rounded={true}
							/>
							<div class="sr-only">this is me</div>
						</div>
					</div>
				</div>
				<div class="lg:order-first lg:row-span-2">
					<h1
						class="text-4xl font-bold tracking-tight text-zinc-800 sm:leading-[3.5rem] dark:text-zinc-100 sm:text-5xl"
					>
						i'm florian. i live in berlin, where i create things for the web.
					</h1>
					<div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
						<p>
							i was one of the only kids in my class without a game console, but we did have a
							computer. when i was 12, I got a coding book for christmas and started making my own
							games in C and opengl. though i never finished any of those early projects, i got
							hooked on programming.
						</p>
						<p>
							after school, I started studying computer science and started working as a software
							developer. i really love the web because it's so accessible — anyone with a device and
							internet can access your work instantly. publishing and sharing your work is also
							pretty simple, whether as a website, a pwa, or a serverless function/api.
						</p>
						<p>
							in my free time, i build lots of web-based projects. i really like the intersection of
							design and development. I love learning new things and am always looking for new cool
							projects. If you want to build something together or just want to connect, feel free
							to <a href="#contact" class="text-cyan-400 hover:text-cyan-300 font-semibold">
								reach out.
							</a>
						</p>
					</div>
				</div>

				<div class="lg:pl-20">
					<Resume />
				</div>
			</div>
		</div>
	</div>
</div>
