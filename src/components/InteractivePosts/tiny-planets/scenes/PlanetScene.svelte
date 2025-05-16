<script lang="ts">
  import Scene from "./Scene.svelte";

  import { Canvas } from "@threlte/core";

</script>

<div class="fixed inset-0 h-screen">
  <Canvas>
    <Scene />
  </Canvas>
</div>
