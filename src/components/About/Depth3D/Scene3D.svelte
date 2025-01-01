<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { useTexture, Align, OrbitControls } from "@threlte/extras";
  import { spring } from "svelte/motion";

  import {
    Vector2,
    ShaderMaterial,
    PlaneGeometry,
    LinearSRGBColorSpace,
  } from "three";

  type DepthImage = {
    image: string;
    depth: string;
  };
  export let image: DepthImage;

  export let rounded = true;

  export let cameraPosition: [number, number, number] = [0, 0, 10];

  export let rotationScale = 0.2;
  export let rotationSpeed = 2;

  export let detail = 200;

  export let depthScale = 1.5;

  const map = useTexture(image.image, {
    transform: (texture) => {
      texture.colorSpace = LinearSRGBColorSpace;
      //texture.encoding = LinearEncoding;
      return texture;
    },
  });
  const depthMap = useTexture(image.depth, {
    transform: (texture) => {
      //texture.encoding = LinearEncoding;
      return texture;
    },
  });

  const rotation = new Vector2(0.5, 0.5);

  const uniforms = {
    uTexture: { type: "t", value: map },
    depthMap: { type: "t", value: depthMap },
  };
  const material = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
varying vec2 vUv;
uniform sampler2D depthMap;

void main() {
    vUv = uv;
    // move z position based on the depth map
    float depth = texture2D(depthMap, vUv).r;
    vec3 newPosition = position + vec3(0.0, 0.0, depth * ${depthScale.toFixed(1)});
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`,
    fragmentShader: `
uniform sampler2D uTexture;
varying vec2 vUv;

float sdRoundedRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) - r;
}

void main() {
	${
    rounded
      ? `
	    vec2 uv = (vUv * 2.0) - 1.0;

    // Size of the rectangle (half-size)
    vec2 rectSize = vec2(1, 1);

    // Calculate distance to the edge of the rounded rectangle
    float d = sdRoundedRect(uv, rectSize, 0.2);

    // Smooth transition for anti-aliasing
    float aa = fwidth(d);
    float alpha = smoothstep(0.0, aa, -d);

	gl_FragColor = texture2D(uTexture, vUv) * alpha;
	`
      : ""
  }

    //gl_FragColor = texture2D(uTexture, vUv);
}`,
  });

  const geometry = new PlaneGeometry(7, 7, detail, detail);

  let rotationX = spring();
  let rotationY = spring();

  export let time = 0;
  const { stop, start } = useTask((dt) => {
    if (mouseMoved > 0) {
      mouseMoved -= dt;
    } else {
      time += dt * rotationSpeed;
      $rotationX = Math.sin(time) * 0.5;
      $rotationY = Math.cos(time) * 0.5;
    }
  });

  let mouseMoved = -1;

  function onDocumentMouseMove(event: MouseEvent) {
    // convert to [-0.5, 0.5]
    $rotationX = (event.clientX / window.innerWidth - 0.5) * 2;
    $rotationY = (event.clientY / window.innerHeight - 0.5) * 2;

    mouseMoved = 1;
  }
</script>

<svelte:window on:mousemove={onDocumentMouseMove} />

<T.PerspectiveCamera makeDefault position={cameraPosition}
></T.PerspectiveCamera>

{#await map then mapValue}
  {#await depthMap then depthValue}
    <Align>
      <T.Mesh
        rotation.x={$rotationY * rotationScale}
        rotation.y={$rotationX * rotationScale}
        scale.x={mapValue.image.width / mapValue.image.height}
      >
        <T is={geometry} />
        <T
          is={material}
          uniforms={{
            depthMap: { value: depthValue },
            uTexture: { value: mapValue },
            mouse: { value: rotation },
          }}
        />
      </T.Mesh>
    </Align>
  {/await}
{/await}
