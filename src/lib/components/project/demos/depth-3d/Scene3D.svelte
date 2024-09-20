<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useTexture, Align } from '@threlte/extras';

	import { Vector2, ShaderMaterial, PlaneGeometry, LinearSRGBColorSpace } from 'three';

	type DepthImage = {
		image: string;
		depth: string;
	};
	export let image: DepthImage;

	export let rounded = false;

	export let cameraPosition: [number, number, number] = [0, 0, 9];

	export let rotate = true;
	export let rotationScale = 0.2;
	export let rotationSpeed = 1.5;

	export let detail = 200;

	export let depthScale = 2;

	const map = useTexture(image.image, {
		transform: (texture) => {
			texture.colorSpace = LinearSRGBColorSpace;
			//texture.encoding = LinearEncoding;
			return texture;
		}
	});
	const depthMap = useTexture(image.depth, {
		transform: (texture) => {
			//texture.encoding = LinearEncoding;
			return texture;
		}
	});

	const rotation = new Vector2(0.5, 0.5);

	const uniforms = {
		uTexture: { type: 't', value: map },
		depthMap: { type: 't', value: depthMap }
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

void main() {
	${
		rounded
			? `// get distance from center
	vec2 center = vec2(0.5, 0.5);
	float dist = distance(vUv, center);

	// if distance is greater than 0.5, discard the pixel
	if (dist > 0.5) discard;`
			: ''
	}

    gl_FragColor = texture2D(uTexture, vUv);
}`
	});

	const geometry = new PlaneGeometry(7, 7, detail, detail);

	export let time = 0;
	const { start, stop } = useTask(
		(dt) => {
			time += dt * rotationSpeed;
			rotation.x = Math.sin(time) * 0.5;
			rotation.y = Math.cos(time) * 0.5;
		},
		{ autoStart: false }
	);

	$: if (rotate) {
		start();
	} else {
		stop();
	}
</script>

<T.PerspectiveCamera makeDefault position={cameraPosition}></T.PerspectiveCamera>

{#await map then mapValue}
	{#await depthMap then depthValue}
		<Align>
			<T.Mesh
				rotation.x={rotation.y * rotationScale}
				rotation.y={rotation.x * rotationScale}
				scale.x={mapValue.image.width / mapValue.image.height}
			>
				<T is={geometry} />
				<T
					is={material}
					uniforms={{
						depthMap: { value: depthValue },
						uTexture: { value: mapValue },
						mouse: { value: rotation }
					}}
				/>
			</T.Mesh>
		</Align>
	{/await}
{/await}
