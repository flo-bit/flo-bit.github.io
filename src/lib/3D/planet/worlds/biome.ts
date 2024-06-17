/*

a biome has a collection of items that can be found in it
a height map and a color map

*/
import { UberNoise, type UberNoiseOptions } from '../noise/uber-noise';
import { Color, Vector3 } from 'three';

import { ColorGradient, type ColorGradientOptions } from '../helper/colorgradient';

export type BiomeOptions = {
	name?: string;

	preset?: string;

	noise?: UberNoiseOptions;
	colors?: ColorGradientOptions;

	vegetation?: {
		density: number;
		items: {
			name: string;
			chance: number;
		}[];
	};
};

const biomePresets: Record<string, BiomeOptions> = {
	test: {
		noise: {
			min: 0,
			max: 0.1,
			octaves: 4,
			lacunarity: 2.0,
			gain: {
				min: 0.01,
				max: 0.8,
				scale: 2
			},
			warp: 0.2,
			scale: 1.5,
			seed: 0
		},
		colors: [
			[0.0, 0xccaa00],
			[0.2, 0xccaa00],
			[0.6, 0x007700],
			[1.0, 0x006622]
		]
	}
};

export class Biome {
	noise: UberNoise | undefined;

	colors: ColorGradient | undefined;

	constructor(opts: BiomeOptions = {}) {
		if (opts.preset) {
			const preset = biomePresets[opts.preset];
			if (preset) {
				opts = {
					...preset,
					...opts
				};
			}
		}

		if (opts.noise) this.noise = new UberNoise(opts.noise);

		if (opts.colors) {
			this.colors = new ColorGradient(opts.colors);

			console.log(this.colors);
		}
	}

	getHeight(pos: Vector3): number | undefined {
		if (this.noise) return this.noise.get(pos);

		return undefined;
	}

	getColor(pos: Vector3): Color | undefined {
		if (this.noise && this.colors) {
			const alpha = (this.noise.normalized(pos) + 1) * 0.5;
			return this.colors.get(alpha);
		}

		return undefined;
	}
}
