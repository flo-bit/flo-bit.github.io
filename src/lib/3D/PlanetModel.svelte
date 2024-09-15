<script lang="ts">
    import { T } from "@threlte/core";
	import { Planet } from "./worlds/planet";
	import { onMount } from "svelte";

    import { useSuspense } from '@threlte/extras'
    const suspend = useSuspense()

    let presets = ['forest', 'beach', 'snowForest'];

    let planet = new Planet({ preset: presets[Math.floor(Math.random() * presets.length)] });
    let planetMesh = suspend(planet.create());
    
    export const redo = () => {
        planet = new Planet({ preset: presets[Math.floor(Math.random() * presets.length)] });
        planetMesh = suspend(planet.create());
    }
</script>

{#await planetMesh then mesh}
  <T is={mesh} />
{/await}