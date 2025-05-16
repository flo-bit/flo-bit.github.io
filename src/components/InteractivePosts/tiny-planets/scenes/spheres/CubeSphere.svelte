<script lang="ts">
  import * as THREE from "three";
  import { T, useTask } from "@threlte/core";

  const geo = new THREE.BoxGeometry(1.7, 1.7, 1.7, 6, 6, 6);

  const morphPositions: number[] = [];

  let v = new THREE.Vector3();
  for (let i = 0; i < geo.attributes.position.count; i++) {
    v.fromBufferAttribute(geo.attributes.position, i);
    v.normalize();
    morphPositions.push(v.x, v.y, v.z);
  }
  // geo.computeVertexNormals();

  geo.morphAttributes.position = [
    new THREE.Float32BufferAttribute(morphPositions, 3),
  ];

  const { ...props } = $props();


  let mesh: THREE.Mesh;
  let totalTime = 0;

  useTask((dt) => {
    if (!mesh) return;
    totalTime += dt;
    
    mesh.morphTargetInfluences = [Math.cos(totalTime + Math.PI) * 0.5 + 0.5];
  });
</script>

<T.Mesh bind:ref={mesh} {...props}>
  <T is={geo} />
  <T.MeshStandardMaterial flatShading />
</T.Mesh>

<T.Mesh {...props}>
  <T.BoxGeometry args={[1.7, 1.7, 1.7, 6, 6, 6]} />
  <T.MeshStandardMaterial flatShading wireframe opacity={0.3} transparent />
</T.Mesh>
