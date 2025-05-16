<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { Mesh } from "three";
  let icosphere: Mesh;

  useTask(() => {
    icosphere.rotation.x += 0.005;
    icosphere.rotation.y += 0.005;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 6]}
  far={100}
>
</T.PerspectiveCamera>

<T.DirectionalLight />
<T.Mesh bind:ref={icosphere}>
  <T.IcosahedronGeometry args={[1, 1]} />
  <T.MeshStandardMaterial color="#0077ff" flatShading={true} />
</T.Mesh>
