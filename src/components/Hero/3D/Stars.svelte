<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import UberNoise from "uber-noise";

  const count = 5000;
  const maxHeight = 30;
  const minHeight = -20;
  const boxSize = 50;
  const boxDepth = 50;

  const noise = new UberNoise({ scale: 0.3 });

  const resetParticle = (i: number) => {
    positions[i * 3 + 0] = Math.random() * boxSize - boxSize / 2;
    positions[i * 3 + 1] =
      Math.pow(Math.random(), 3) * maxHeight * (Math.random() < 0.5 ? 1 : -1);
    positions[i * 3 + 2] = Math.random() * boxDepth - boxDepth / 2;

    colors[i * 3 + 0] = Math.random() < 0.2 ? 0.3 : 1.0;
    colors[i * 3 + 1] = Math.random() < 0.2 ? 0.3 : 1.0;
    colors[i * 3 + 2] = Math.random() < 0.2 ? 0.3 : 1.0;
  };

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const setup = () => {
    for (let i = 0; i < count; i++) {
      resetParticle(i);
    }
  };

  setup();

  let updateNum = 0;

  const update = (delta: number) => {
    let speedScale = 0.2;
    let scl = 0.00001;

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3 + 0];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      const xV = noise.get(x + i * scl, y, z);
      const yV = noise.get(y, z + i * scl, x);
      const zV = noise.get(z, x, y + i * scl);

      positions[i * 3 + 0] += xV * delta * speedScale;
      positions[i * 3 + 1] += yV * delta * speedScale;
      positions[i * 3 + 2] += zV * delta * speedScale;

      // colors[i * 3 + 0] = Math.abs(xV);
      // colors[i * 3 + 1] = Math.abs(yV);
      // colors[i * 3 + 2] = Math.abs(zV);

      if (
        y > maxHeight ||
        y < minHeight ||
        Math.abs(x) > boxSize / 2 ||
        Math.abs(z) > boxDepth / 2
      ) {
        resetParticle(i);
      }
    }

    updateNum = (updateNum + 1) % 10;
    noise.move(0, delta, 0);
  };

  const { start, stop, started, task } = useTask((delta) => {
    update(delta);
  });
</script>

<T.Points position.z={-40} rotation.z={0.5}>
  <T.BufferGeometry>
    <T.BufferAttribute
      args={[positions, 3]}
      attach={({ ref, parent, parentObject3D }) => {
        parent.setAttribute("position", ref);
        return () => {};
      }}
    />

    <T.BufferAttribute
      args={[colors, 3]}
      attach={({ ref, parent, parentObject3D }) => {
        parent.setAttribute("color", ref);
        return () => {};
      }}
    />
  </T.BufferGeometry>
  <T.PointsMaterial size={0.1} vertexColors={true} opacity={0.5} transparent />
</T.Points>
