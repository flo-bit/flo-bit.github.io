<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "../../worlds/planet";

  import { useSuspense } from "@threlte/extras";
  import { colorSettings } from "../../store.svelte";
  import * as THREE from "three";
  const suspend = useSuspense();

  export let noiseOptions = {
    min: -0.05,
    max: 0.1,
    octaves: 4,
    lacunarity: 2.0,
    gain: 0.5,
    warp: 0.3,
    scale: 1.5,
    power: 1.5,
    sharpness: 0.5,
    steps: 0,
    hasChanged: false
  };
  let planet = new Planet({
    detail: 100,
    scatter: 0,
    biome: {
      noise: JSON.parse(JSON.stringify(noiseOptions)),

      colors: colorSettings.stops.map((stop) => [stop[0], new THREE.Color(stop[1])]),
    },
    hasOcean: false,
    atmosphere: {
      enabled: false,
    },
  });
  let planetMesh = suspend(planet.create());

  $: if (noiseOptions.hasChanged) {
    noiseOptions.hasChanged = false;
    
    planet = new Planet({
      scatter: 0,
      biome: {
        noise: JSON.parse(JSON.stringify(noiseOptions)),

        colors: {
          stops: colorSettings.stops.map((stop) => [stop[0], new THREE.Color(stop[1])]),
          hsl: true,
        },
      },
      hasOcean: false,
      atmosphere: {
        enabled: false,
      },
    });
    planetMesh = suspend(planet.create());
  }
</script>

{#await planetMesh then mesh}
  <T is={mesh} />
{/await}
