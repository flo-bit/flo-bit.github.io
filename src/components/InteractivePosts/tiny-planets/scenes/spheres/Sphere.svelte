<script lang="ts">
  import * as THREE from "three";
  import { T, useTask } from "@threlte/core";

  for (let i = 0; i < 2; i++) {
    let start = (i * Math.PI * 2) / 8;
    let end = ((i + 1) * Math.PI * 2) / 8;

    console.log(start, end);

    const geo = new THREE.SphereGeometry(1, 2, 8, start, end).toNonIndexed();

    for (let i = 0; i < geo.attributes.position.count; i++) {
      //positions.push(geo.attributes.position.getX(i), geo.attributes.position.getY(i), geo.attributes.position.getZ(i));
    }
  }

  const newGeo = new THREE.BufferGeometry();

  let positions: number[] = [];
  // construct sphere geometry
  const widthSegments = 16;
  const heightSegments = 16;
  const radius = 1;

  // Helper function: spherical to Cartesian
  function sphericalToCartesian(r: number, theta: number, phi: number) {
    return {
      x: r * Math.sin(theta) * Math.cos(phi),
      y: r * Math.cos(theta),
      z: r * Math.sin(theta) * Math.sin(phi),
    };
  }

  // Build the sphere as a series of triangles:
  for (let i = 0; i < widthSegments; i++) {
    for (let j = 0; j < heightSegments; j++) {
      // Angles for the current segment
      const theta1 = (j / heightSegments) * Math.PI;
      const theta2 = ((j + 1) / heightSegments) * Math.PI;
      const phi1 = (i / widthSegments) * 2 * Math.PI;
      const phi2 = ((i + 1) / widthSegments) * 2 * Math.PI;

      // Four corners of the "quad" on the sphere
      const p1 = sphericalToCartesian(radius, theta1, phi1);
      const p2 = sphericalToCartesian(radius, theta1, phi2);
      const p3 = sphericalToCartesian(radius, theta2, phi1);
      const p4 = sphericalToCartesian(radius, theta2, phi2);

      // First triangle (p1 -> p2 -> p3)
      positions.push(p1.x, p1.y, p1.z);
      positions.push(p2.x, p2.y, p2.z);
      positions.push(p3.x, p3.y, p3.z);

      // Second triangle (p3 -> p2 -> p4)
      positions.push(p3.x, p3.y, p3.z);
      positions.push(p2.x, p2.y, p2.z);
      positions.push(p4.x, p4.y, p4.z);
    }
  }

  newGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  newGeo.computeVertexNormals();

  let geo = newGeo.clone();

  const { ...props } = $props();

  let totalTime = 0;

  useTask((dt) => {
    totalTime += dt;

    const percent = Math.cos(totalTime * 2 + Math.PI) * 0.5 + 0.5;
    newGeo.setDrawRange(0, newGeo.attributes.position.count * percent);
  });
</script>

<T.Mesh {...props}>
  <T is={newGeo} />
  <T.MeshStandardMaterial flatShading />
</T.Mesh>

<T.Mesh {...props}>
  <T is={geo} />
  <T.MeshStandardMaterial flatShading wireframe opacity={0.3} transparent />
</T.Mesh>
