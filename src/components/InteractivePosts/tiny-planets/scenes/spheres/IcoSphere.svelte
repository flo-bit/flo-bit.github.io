<script lang="ts">
  import * as THREE from "three";
  import { T, useTask } from "@threlte/core";

  const geo = new THREE.IcosahedronGeometry(1.2, 0);

  function midpoint(a: THREE.Vector3, b: THREE.Vector3) {
    return a.clone().lerp(b, 0.5);
  }

  function subdivideFace(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
    let newFaces = [];
    let d = midpoint(a, b);
    let e = midpoint(b, c);
    let f = midpoint(c, a);

    newFaces.push(d.clone(), e.clone(), f.clone());
    newFaces.push(a.clone(), d.clone(), f.clone());
    newFaces.push(d.clone(), b.clone(), e.clone());
    newFaces.push(e.clone(), c.clone(), f.clone());

    return newFaces;
  }

  const positions = [];
  const morphPositions: number[] = [];
  // subdivide faces

  let a = new THREE.Vector3();
  let b = new THREE.Vector3();
  let c = new THREE.Vector3();
  for (let i = 0; i < geo.attributes.position.count; i += 3) {
    a.fromBufferAttribute(geo.attributes.position, i);
    b.fromBufferAttribute(geo.attributes.position, i + 1);
    c.fromBufferAttribute(geo.attributes.position, i + 2);
    const subs = subdivideFace(a, b, c);
    for (let j = 0; j < subs.length; j += 3) {
      const moreSubs = subdivideFace(subs[j], subs[j + 1], subs[j + 2]);
      for (let sub of moreSubs) {
        positions.push(sub.x, sub.y, sub.z);

        sub.normalize();
        morphPositions.push(sub.x, sub.y, sub.z);
      }
    }
  }

  const newGeo = new THREE.BufferGeometry();
  newGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  // const morphPositions: number[] = [];

  // let v = new THREE.Vector3();
  // for (let i = 0; i < geo.attributes.position.count; i++) {
  //   v.fromBufferAttribute(geo.attributes.position, i);
  //   v.normalize();
  //   morphPositions.push(v.x, v.y, v.z);
  // }
  // geo.computeVertexNormals();

  newGeo.morphAttributes.position = [
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

<T.Mesh {...props} bind:ref={mesh}>
  <T is={newGeo} />
  <T.MeshStandardMaterial flatShading />
</T.Mesh>

<T.Mesh {...props} morphTargetInfluences={[0]}>
  <T is={newGeo} />
  <T.MeshStandardMaterial flatShading wireframe opacity={0.3} transparent />
</T.Mesh>
