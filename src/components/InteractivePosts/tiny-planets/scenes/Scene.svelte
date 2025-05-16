<script lang="ts">
  import SetupScene from "./setup/Scene.svelte";
  import HeroScene from "./hero/Scene.svelte";
  import SpheresScene from "./spheres/Scene.svelte";
  import NoiseScene from "./noise/Scene.svelte";
  import ColorScene from "./color/Scene.svelte";
  import { tinyPlanetsStore } from "../store.svelte";
</script>

{#if tinyPlanetsStore.active === "hero"}
  <HeroScene />
{:else if tinyPlanetsStore.active === "setup"}
  <SetupScene />
{:else if tinyPlanetsStore.active === "spheres"}
  <SpheresScene />
{:else if tinyPlanetsStore.active === "noise"}
  <NoiseScene />
{:else if tinyPlanetsStore.active === "color"}
  <ColorScene />
{/if}
