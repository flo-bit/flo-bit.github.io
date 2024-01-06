import {
	Vector3,
	Color,
	BufferGeometry,
	IcosahedronGeometry,
	PlaneGeometry,
	Mesh,
	MeshStandardMaterial,
	type MeshStandardMaterialParameters
} from 'three';

import { Vertex, type Face, VertexHelper } from './vertex-helper';

import { GeometryHelper } from './geometry-helper';

import { mergeVertices, toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';
import UberNoise from '../noise/uber-noise';

export type ModifiedGeometryOptions = {
	name?: string;
	shape?: string;

	shapeOptions?: unknown;

	subdivisions?: number;

	length?: number;

	color?: Color | string | number;

	children?: (ModifiedGeometry | ModifiedGeometryOptions)[];

	rotation?: Vector3;
	scale?: Vector3;
	position?: Vector3;

	scatter?: number;
	scatterScale?: number;

	array?: [number, number, number];

	reverse?: boolean;

	geometry?: BufferGeometry;
};

type VertexModifierFunction = (v: Vertex) => Vertex | Vertex[] | null | void;

export type FaceModifierFunction = (f: Face) => Face | Face[] | null | void;

export class ModifiedGeometry {
	isProceduralObject = true;

	vertices: Vertex[];
	name: string;

	static Icosahedron(
		opts: ModifiedGeometryOptions & { detail?: number; radius?: number } = {
			detail: 0,
			radius: 1
		}
	) {
		return new ModifiedGeometry({
			...opts,
			geometry: new IcosahedronGeometry(opts.radius, opts.detail)
		});
	}

	static Plane(
		opts: ModifiedGeometryOptions & {
			width?: number;
			height?: number;
			widthSegments?: number;
			heightSegments?: number;
		}
	) {
		return new ModifiedGeometry({
			...opts,
			geometry: new PlaneGeometry(opts.width, opts.height, opts.widthSegments, opts.heightSegments)
		});
	}

	static fromMesh(mesh: THREE.Mesh) {
		return new ModifiedGeometry({ geometry: mesh.geometry });
	}
	static fromGeometry(geometry: BufferGeometry) {
		return new ModifiedGeometry({ geometry });
	}

	createGeometry() {
		return mergeVertices(GeometryHelper.createGeometryFromVertices(this.vertices));
	}

	createMesh(opts: MeshStandardMaterialParameters = {}) {
		return new Mesh(
			this.createGeometry(),
			new MeshStandardMaterial({
				vertexColors: true,
				flatShading: true,
				envMapIntensity: 0.2,
				...opts
			})
		);
	}

	setLengthFromNoise(noise: UberNoise) {
		this.modifyVertices((v) => {
			v.setLength(noise.get(v.x, v.y, v.z));
		});
	}

	setLengthFromFunction(func: (v: Vertex) => number) {
		this.modifyVertices((v) => {
			v.setLength(func(v));
		});
	}

	setFaceColorFromFunction(func: (f: Face) => Color) {
		this.modifyFaces((f) => {
			f.a.faceColor = func(f);
		});
	}

	setLengthAndFaceColorFromFunction(
		lengthFunc: (v: Vertex) => number,
		colorFunc: (f: Face) => Color,
		modifyVertex = (v: Vertex, n: number) => {
			v.setLength(n);
		}
	) {
		this.modifyFaces((f) => {
			modifyVertex(f.a, lengthFunc(f.a));
			modifyVertex(f.b, lengthFunc(f.b));
			modifyVertex(f.c, lengthFunc(f.c));

			const color = colorFunc(f);
			f.a.color = color;
			f.b.color = color;
			f.c.color = color;
		});
	}

	scatter(amount = 0.1, scale = 100, seed = 0) {
		const noise = new UberNoise({
			min: -amount / 2,
			max: amount / 2,
			scale,
			seed
		});
		this.modifyVertices((v) => {
			v.x += noise.get(v.x, v.y, v.z);
			v.y += noise.get(v.y + scale * 100, v.z + scale * 100, v.x + scale * 100);
			v.z += noise.get(v.z + scale * 200, v.x + scale * 200, v.y + scale * 200);
		});
	}

	moveAlongNormalFromFunction(func: (v: Vertex) => number) {
		this.modifyFaces((f) => {
			f.a.addScaledVector(f.normal ?? new Vector3(0, 0, 0), func(f.a));
			f.b.addScaledVector(f.normal ?? new Vector3(0, 0, 0), func(f.b));
			f.c.addScaledVector(f.normal ?? new Vector3(0, 0, 0), func(f.c));
		});
	}

	moveAlongNormalAndColorFacesFromFunctions(
		lengthFunc: (v: Vertex) => number,
		colorFunc: (f: Face) => Color
	) {
		this.modifyFaces((f) => {
			f.a.addScaledVector(f.a.normal ?? new Vector3(0, 0, 0), lengthFunc(f.a));
			f.b.addScaledVector(f.b.normal ?? new Vector3(0, 0, 0), lengthFunc(f.b));
			f.c.addScaledVector(f.c.normal ?? new Vector3(0, 0, 0), lengthFunc(f.c));

			const color = colorFunc(f);
			f.a.color = color;
			f.b.color = color;
			f.c.color = color;
		});
	}

	calculateVertexNormals(tolerance: number | undefined = undefined) {
		const geometry = toCreasedNormals(
			GeometryHelper.createGeometryFromVertices(this.vertices),
			tolerance
		);

		console.log(geometry.getAttribute('position').array.length);
		this.vertices = GeometryHelper.fromGeometry(geometry);
	}

	constructor(opts: ModifiedGeometryOptions = {}) {
		this.isProceduralObject = true;

		this.vertices = [];
		this.name = opts.name ?? 'ProcObject';

		if (opts.geometry) {
			this.vertices = GeometryHelper.fromGeometry(opts.geometry);
		}

		if (opts.subdivisions) this.subdivide(opts.subdivisions);
	}

	modifyVertices(modifier: VertexModifierFunction) {
		if (!modifier) return;

		let newVertices: Vertex[] | null = null;
		for (let i = 0; i < this.vertices.length; i++) {
			this.vertices[i].index = i;
			if (i % 3 === 0) {
				this.vertices[i].connectingVertices = [this.vertices[i + 1], this.vertices[i + 2]];
			} else if (i % 3 === 1) {
				this.vertices[i].connectingVertices = [this.vertices[i - 1], this.vertices[i + 1]];
			} else if (i % 3 === 2) {
				this.vertices[i].connectingVertices = [this.vertices[i - 2], this.vertices[i - 1]];
			}
			const res = modifier(this.vertices[i]);
			if (!res) continue;

			newVertices = newVertices ?? [];
			if (Array.isArray(res)) newVertices.push(...res);
			else newVertices.push(res);
		}
		if (newVertices) this.vertices = newVertices;

		return this.vertices;
	}

	modifyFaces(modifier: FaceModifierFunction, calculateNormals = true) {
		if (!modifier) return;

		let newFaces: Face[] | null = null;
		for (let i = 0; i < this.vertices.length; i += 3) {
			const face = {
				a: this.vertices[i],
				b: this.vertices[i + 1],
				c: this.vertices[i + 2],
				index: i / 3,
				mid: VertexHelper.midpoint(this.vertices[i], this.vertices[i + 1], this.vertices[i + 2]),
				normal: calculateNormals
					? VertexHelper.normalFromFace(
							this.vertices[i],
							this.vertices[i + 1],
							this.vertices[i + 2]
						)
					: undefined
			};
			const res = modifier(face);
			if (!res) continue;

			newFaces = newFaces ?? [];
			if (Array.isArray(res)) newFaces.push(...res);
			else newFaces.push(res);
		}
		if (newFaces) this.vertices = newFaces.flatMap((f) => [f.a, f.b, f.c]);

		return this.vertices;
	}

	subdivide(num = 1) {
		this.modifyFaces((f) => {
			return VertexHelper.subdivideFace(f);
		});
		if (num > 1) this.subdivide(num - 1);
	}
}
