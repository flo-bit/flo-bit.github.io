import { Biome, type BiomeOptions } from './biome';
import { ModifiedGeometry, type ModifiedGeometryOptions } from '../geometry/geometry-modifier';
import { Color, Mesh, IcosahedronGeometry, MeshStandardMaterial } from 'three';
import UberNoise, { type UberNoiseOptions } from '../noise/uber-noise';
import { ColorGradient, type ColorGradientOptions } from '../helper/colorgradient';

export type PlanetOptions = {
	scatter?: number;

	ground?: number;

	ocean?: {
		level: number;

		colors: [number, number][];

		noise: UberNoiseOptions;
	};
};

export class Planet {
	baseGeometry: ModifiedGeometry;
	modifiedGeometry: ModifiedGeometry;
	oceanGeometry: ModifiedGeometry;

	mesh: Mesh | undefined;

	biome: Biome;

	options: PlanetOptions;

	ground: number;

	constructor(
		biomeOptions: BiomeOptions,
		planetOptions: PlanetOptions = {},
		shapeOptions: ModifiedGeometryOptions = {
			geometry: new IcosahedronGeometry(1, 30)
		}
	) {
		this.options = planetOptions;

		this.baseGeometry = new ModifiedGeometry(shapeOptions);
		this.modifiedGeometry = new ModifiedGeometry(shapeOptions);

		this.oceanGeometry = new ModifiedGeometry(shapeOptions);

		this.biome = new Biome(biomeOptions);

		this.ground = this.options.ground ?? 1.0;
	}

	createMesh(): Mesh {
		if (this.options.scatter) this.modifiedGeometry.scatter(this.options.scatter);

		this.modifiedGeometry.setLengthAndFaceColorFromFunction(
			(v) => this.ground + (this.biome.getHeight(v) ?? 0),
			(f) => this.biome.getColor(f.mid ?? f.a) ?? new Color(0xffffff)
		);

		this.mesh = this.modifiedGeometry.createMesh();

		const ocean = this.createOceanMesh();
		if (ocean.material instanceof MeshStandardMaterial) {
			ocean.material.transparent = true;
			ocean.material.opacity = 0.8;
			ocean.material.metalness = 0.5;
			ocean.material.roughness = 0.5;
		}
		this.mesh.add(ocean);

		return this.mesh;
	}

	createOceanMesh(): Mesh {
		const ocean: {
			level: number;
			colors: ColorGradientOptions;
			noise: UberNoiseOptions;
		} = this.options.ocean ?? {
			level: 0.05,
			colors: [
				[0, 0x000066],
				[0.35, 0x0000aa],
				[0.8, 0x00ccff]
			],
			noise: {
				min: -0.01,
				max: 0.01,
				scale: 10
			}
		};
		const oceanNoise = new UberNoise(ocean.noise);

		const colorGradient = new ColorGradient(ocean.colors);

		this.oceanGeometry.scatter(this.options.scatter);

		this.oceanGeometry.setLengthAndFaceColorFromFunction(
			(v) => this.ground + ocean.level + oceanNoise.get(v),
			(f) => {
				const waterDepth =
					(((this.biome.getHeight(f.mid ?? f.a) ?? 0) - ocean.level) / ocean.level + 1) / 2;

				return colorGradient.get(waterDepth);
			}
		);

		return this.oceanGeometry.createMesh();
	}
}
