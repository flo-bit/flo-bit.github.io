<script lang="ts">
  import Scene from "./Scene.svelte";

  import { Canvas } from "@threlte/core";

  function getScrollPercent() {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;

    return scrollTop / (scrollHeight - clientHeight);
  }
  let percentageScroll: number = 0;
</script>

<svelte:window
  on:scroll={() => {
    percentageScroll = getScrollPercent();
  }}
/>

<div class="fixed inset-0 h-screen">
  <Canvas>
    <Scene pos={percentageScroll} />
  </Canvas>
</div>
