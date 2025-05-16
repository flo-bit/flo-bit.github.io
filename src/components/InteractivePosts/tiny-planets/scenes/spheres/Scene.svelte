<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import CubeSphere from "./CubeSphere.svelte";
  import Sphere from "./Sphere.svelte";
  import IcoSphere from "./IcoSphere.svelte";
  import { onMount } from "svelte";

  let distance = 7;

  let xPos = 2.5;
  let yPos = 0;
  

  function isSmallScreen() {
    return window.innerWidth < 750;
  }

  function onResize() {
    if (window.innerWidth < 750) {
      distance = 10;
	  xPos = 0;
	  yPos = 2.5;
    } else {
      distance = 7;
	  xPos = 2.5;
	  yPos = 0;
    }
  }

  let rotation = 0;
  useTask((dt) => {
	rotation += dt * 0.2;
  });

  onMount(() => {
    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
</script>
<T.PerspectiveCamera
  makeDefault
  position={[0, 0, distance]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
  far={100}
>
  <!-- <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={true} autoRotateSpeed={1} /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight
  intensity={2}
  position={[5, 2, 2]}
/>

<Sphere rotation.y={rotation} />

<IcoSphere position={[xPos, yPos, 0]} rotation.y={rotation} />

<CubeSphere position={[-xPos, -yPos, 0]} rotation.y={rotation} />
