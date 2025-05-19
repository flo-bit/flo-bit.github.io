<script lang="ts">
  import * as THREE from "three";
  import { T, useTask } from "@threlte/core";

  let geo = new THREE.IcosahedronGeometry(1.1, 8);

  // switch random faces

  let a = new THREE.Vector3();
  let b = new THREE.Vector3();
  let c = new THREE.Vector3();
  let d = new THREE.Vector3();
  let e = new THREE.Vector3();
  let f = new THREE.Vector3();

  for (let i = 0; i < 1000; i++) {
	let index = Math.floor(Math.random() * geo.attributes.position.count / 3) * 3;
    a.fromBufferAttribute(geo.attributes.position, index);
    b.fromBufferAttribute(geo.attributes.position, index + 1);
    c.fromBufferAttribute(geo.attributes.position, index + 2);
   
	let index2 = Math.floor(Math.random() * geo.attributes.position.count / 3) * 3;
	d.fromBufferAttribute(geo.attributes.position, index2);
	e.fromBufferAttribute(geo.attributes.position, index2 + 1);
	f.fromBufferAttribute(geo.attributes.position, index2 + 2);

	geo.attributes.position.setXYZ(index2, a.x, a.y, a.z);
	geo.attributes.position.setXYZ(index2 + 1, b.x, b.y, b.z);
	geo.attributes.position.setXYZ(index2 + 2, c.x, c.y, c.z);

	geo.attributes.position.setXYZ(index, d.x, d.y, d.z);
	geo.attributes.position.setXYZ(index + 1, e.x, e.y, e.z);
	geo.attributes.position.setXYZ(index + 2, f.x, f.y, f.z);
  }
  geo.attributes.position.needsUpdate = true;

  const { ...props } = $props();

  let totalTime = 0;

  useTask((dt) => {
    totalTime += dt;

    const percent = Math.cos(totalTime + Math.PI) * 0.5 + 0.5;
    geo.setDrawRange(0, geo.attributes.position.count * percent);
  });
</script>

<T.Mesh {...props}>
  <T is={geo} />
  <T.MeshStandardMaterial flatShading wireframe wireframeLinewidth={1000} />
</T.Mesh>
