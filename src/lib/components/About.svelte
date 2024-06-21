<script lang="ts">
	import Depth3D from '$lib/3D/Depth3D/Depth3D.svelte';

	// @ts-ignore
	import imageMe from '$lib/images/avatar.png?w=1024&format=webp';
	// @ts-ignore
	import depthMe from '$lib/images/avatar-depth.png?w=1024&format=webp';

	import Resume from './Resume.svelte';
</script>

<div class="relative isolate overflow-hidden bg-black">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div id="about" class="py-16 md:py-32 section">
			<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
				<div class="lg:pl-20">
					<div class="max-w-sm px-2.5 lg:max-w-none">
						<!-- <img
							src={imageMe}
							alt="this is me"
							loading="lazy"
							sizes="(min-width: 1024px) 32rem, 20rem"
							class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
						/> -->

						<div class="aspect-square rotate-3 -m-10 lg:-m-10">
							<Depth3D
								image={{
									image: imageMe,
									depth: depthMe
								}}
							/>
							<div class="sr-only">this is me</div>
						</div>
					</div>
				</div>
				<div class="lg:order-first lg:row-span-2">
					<h1
						class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
					>
						hey there, i'm florian. i live in berlin, where i create things for the web (and other
						places).
					</h1>
					<div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
						<p>
							i was one of the only kids in my class who didn't have some kind of game console at
							home. but we did have a computer and when I was 12, i got a coding book for christmas
							and decided to try my hand at making my own games (using c and opengl).
						</p>
						<p>
							i never finished any of those games i tried to make then, but I was hooked. i've been
							programming ever since and after finishing school, i started studying computer science
							and working as a software developer.
						</p>
						<p>
							i especially love the web, because it's so accessible. anyone with some kind of
							electronic device and an internet connection can access your work in seconds. it's
							also very easy to publish and share your work with the world, be it a static website,
							a containerized application or a serverless function.
						</p>
						<p>
							nowadays, I built lots of things for the web, from websites to pwas and hybrid apps.
							i'm also interested in the intersection of design and development and how we can use
							technology to make the world a better place.
						</p>
						<p>
							i also love to learn new things and I'm always looking for new challenges. if you have
							any questions or just want to say hi, feel free to <a
								href="#contact"
								class="text-cyan-400 hover:text-cyan-300 font-semibold"
							>
								get in touch
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
