<script lang="ts">
  import { onMount } from "svelte";

  let visible = false;

  onMount(() => {
    visible = true;
  });

  export let video;
</script>

{#if visible && video}
  <video
    autoplay
    loop
    muted
    playsinline
    class="absolute inset-0 h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200 z-10"
    preload="none"
  >
    <source src={video} type="video/mp4" />
  </video>
{/if}

<div class="h-1 w-1"></div>
