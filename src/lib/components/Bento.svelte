<script>

	import { Depth3D } from "$lib/3D/Depth3D";

	// @ts-ignore
	import imageMe from '$lib/images/me.png?w=512&format=webp';
	// @ts-ignore
	import depthMe from '$lib/images/me-depth.png?w=512&format=webp';
	import ResumeContent from "./ResumeContent.svelte";

</script>
<div class="relative isolate overflow-hidden bg-background py-16">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		
		<div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
			<div class="flex p-px lg:col-span-4">
				<div
					class="overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] flex-grow"
				>
					<!-- <img
						class="h-80 object-cover object-left"
						src="https://tailwindui.com/plus/img/component-images/bento-02-releases.png"
						alt=""
					/> -->
					
                    
                    <div class="p-10">
						<h3 class="text-sm/4 font-semibold text-zinc-400">Releases</h3>

                        <h1
						class="text-4xl font-bold tracking-tight text-zinc-800 sm:leading-[3.5rem] dark:text-zinc-100 sm:text-5xl"
					>
						i'm florian. i live in berlin, where i create things for the web.
					</h1>
                                            <p class="mt-2 max-w-lg text-sm/6 text-zinc-400">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla
							efficitur, maximus egestas sem pellentesque.
						</p>
					</div>
				</div>
			</div>

			<div class="flex p-px lg:col-span-2">
				<div
					class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 lg:rounded-tr-[2rem]"
				>
					<!-- <img
						class="h-80 object-cover object-center"
						src="https://tailwindui.com/plus/img/component-images/bento-02-integrations.png"
						alt=""
					/> -->
                    <div class="h-80 object-cover object-center">
                    <Depth3D
								image={{
									image: imageMe,
									depth: depthMe
								}}
								rounded={true}
							/>
                        </div>
					<div class="p-10">
						<h3 class="text-sm/4 font-semibold text-accent-400">hello</h3>
						<p class="mt-2 text-lg/7 font-medium tracking-tight text-white">
							this is me
						</p>
					</div>
				</div>
			</div>

			<div class="flex p-px lg:col-span-3">
				<div
					class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 lg:rounded-bl-[2rem]"
				>
					<!-- <img
						class="h-80 object-cover object-center"
						src="https://tailwindui.com/plus/img/component-images/bento-02-security.png"
						alt=""
					/> -->
					<div class="p-10">
						<ResumeContent />
					</div>


				</div>
			</div>

			<div class="flex p-px lg:col-span-3">
				<div
					class="overflow-hidden rounded-lg bg-zinc-950 flex-grow ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
				>
					<!-- <img
						class="h-80 object-cover object-left"
						src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
						alt=""
					/> -->
					<div class="p-10">
						<h3 class="text-sm/4 font-semibold text-zinc-400">Performance</h3>
						<p class="mt-2 text-lg/7 font-medium tracking-tight text-white">
							Lightning-fast builds
						</p>
						<p class="mt-2 max-w-lg text-sm/6 text-zinc-400">
							Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate.
							Maecenas at augue sed elit dictum vulputate.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
