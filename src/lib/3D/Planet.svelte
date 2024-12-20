<script lang="ts">
    import { T } from "@threlte/core";
	import { Planet } from "./worlds/planet";

    import { useSuspense } from '@threlte/extras'
	import { planetPresets } from "./worlds/presets";
    const suspend = useSuspense()

    let presets = ['forest', 'beach', 'snowForest'];

    let planet = new Planet(planetPresets['beach']);
    let planetMesh = suspend(planet.create());
    
    export const redo = async () => {
        planet = new Planet(planetPresets[presets[Math.floor(Math.random() * presets.length)]]);
        planetMesh = planet.create();
    }
</script>

{#await planetMesh then mesh}
  <T is={mesh} />
{/await}