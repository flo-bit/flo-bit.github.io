export const tinyPlanetsStore: {
	active: string;
} = $state({
	active: 'hero',
});


export const noiseSettings = $state({
	min: -0.1,
	max: 0.1,
	octaves: 4,
	lacunarity: 2,
	gain: 0.5,
	warp: 0.3,
	scale: 1,
	power: 1.5,
    sharpness: 0.0,
	steps: 0,

	hasChanged: false
});

export const colorSettings = $state({
	stops: [],
});