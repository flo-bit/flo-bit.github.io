<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { onMount } from "svelte";
  import Planet from "./Planet.svelte";
  import { noiseSettings } from "../../store.svelte";

  import RotatableSphere from "../../components/RotatableSphere.svelte";

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 0]}
  far={100}
>
  <!-- <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={true} autoRotateSpeed={1} /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.05} />
<T.DirectionalLight intensity={2} position={[5, 2, 2]} />

<RotatableSphere>
  <Planet noiseOptions={noiseSettings} />
</RotatableSphere>
