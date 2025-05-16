<script lang="ts">
  import * as PIXI from "pixi.js";
  import ParticleSystem from "./particles";

  import { onDestroy, onMount } from "svelte";
  import { jetstreamStore } from "../store.svelte";

  let app: PIXI.Application;

  let totalTime = $state(0);
  let totalLikes = $state(0);
  let lastTime = $state(0);
  let likesPerSecond = $state(0);

  onMount(async () => {
    app = new PIXI.Application();

    let w = wrapper.clientWidth,
      h = wrapper.clientHeight;

    // set to full screen
    await app.init({
      width: w,
      height: h,
    });
    wrapper.appendChild(app.canvas);

    // set canvas to absolute position and full size
    app.canvas.style.position = "absolute";
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";

    const heartParticles = new ParticleSystem("/posts/jetstream/heart2.png");

    app.stage.addChild(heartParticles.container);

    app.ticker.add((ticker) => {
      if (jetstreamStore.active !== "likes") return;
      // get ellapsed time
      const deltaTime = ticker.deltaMS * 0.001;
      totalTime += deltaTime;

      heartParticles.update(deltaTime);
    });

    window.addEventListener("resize", () => {
      w = wrapper.clientWidth;
      h = wrapper.clientHeight;
      app.renderer.resize(w, h);
    });

    jetstreamStore.listeners.push((data) => {
      if (data.kind !== "commit") return;

      if (
        data.commit.collection === "app.bsky.feed.like" &&
        data.commit.operation === "create"
      ) {
        totalLikes++;

        let currentTime = Math.floor(performance.now()/1000);

        if(lastTime !== currentTime) {
          lastTime = currentTime;
          likesPerSecond = totalLikes;

          totalTime = 0;
          totalLikes = 0;
        }

        heartParticles.spawnParticle({
          x: Math.random() * w,
          y: -50,
          size: Math.pow(Math.random(), 4) * 40 + 10,
          maxAge: Math.random() * 10 + 4,
          speedY: Math.random() * 150 + 50,
          speedX: Math.random() * 10 - 5,
        });
      }
    });
  });

  $effect(() => {
    try {
      if (jetstreamStore.active !== "likes") {
        console.log(app);
        app?.stop();
        console.log("stopped");
      } else {
        app?.start();
        console.log("started");
      }
    } catch (e) {
      console.error(e);
    }
  });

  onDestroy(() => {
    // remove canvas from DOM
    if (!app || !app.canvas) return;
    app.canvas.remove();
    // destroy app
    app.destroy();
  });

  let wrapper: HTMLElement;
</script>

<div
  id="likes"
  class="example h-96 w-full bg-black relative overflow-hidden rounded-3xl border border-white/10"
  bind:this={wrapper}
>
  <div
    class="absolute inset-0 h-full w-full flex items-center justify-center z-50"
  >
    <div class="bg-black/70 backdrop-blur-sm rounded-2xl p-4 text-3xl text-white font-bold flex items-center gap-2">
      {Math.round(likesPerSecond)} <div class="text-lg flex flex-col items-center">likes/second</div>
    </div>
  </div>
</div>
