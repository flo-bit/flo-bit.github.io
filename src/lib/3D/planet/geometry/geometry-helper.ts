import { BufferGeometry, BufferAttribute, Vector3, Color, Vector2, Object3D, Mesh } from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Vertex } from './vertex-helper';

export class GeometryHelper {
	static fromGeometry(geometry: BufferGeometry): Vertex[] {
		if (geometry.index) geometry = geometry.toNonIndexed();
		const vertices = geometry.getAttribute('position');
		const colors = geometry.getAttribute('color');
		const uvs = geometry.getAttribute('uv');
		const normals = geometry.getAttribute('normal');

		console.log(normals ? normals.array.length : 'no normals');

		const array: Vertex[] = [];
		for (let i = 0; i < vertices.count; i++) {
			const vertex: Vertex = new Vertex(vertices.getX(i), vertices.getY(i), vertices.getZ(i));
			if (colors != undefined)
				vertex.color = new Color(colors.getX(i), colors.getY(i), colors.getZ(i));
			if (uvs != undefined) vertex.uv = new Vector2(uvs.getX(i), uvs.getY(i));
			if (normals != undefined)
				vertex.normal = new Vector3(normals.getX(i), normals.getY(i), normals.getZ(i));
			array.push(vertex);
		}
		return array;
	}

	/**
	 * creates a three.js buffer geometry from a list of vertices where each face is made of 3 subsequent vertices
	 * vertices can also have an optional color, uv and normal
	 *
	 * @param {*} vertices - array of vertices with x, y and z coordinates (optional: color {r, g, b}, uv {x, y} and normal {x, y, z})
	 * @param {*} computeNormals - if true and no normals given, the normals will be computed from the vertices (per vertex normals)
	 * @returns {BufferGeometry}
	 */
	static createGeometryFromVertices(
		vertices: Vertex[],
		computeNormals: boolean | undefined = undefined
	): BufferGeometry {
		if (!vertices?.length) {
			throw new Error('No vertices given');
		}

		const bufferedVertices = new Float32Array(vertices.length * 3);
		const bufferedColor: Float32Array | undefined = vertices[0].color
			? new Float32Array(vertices.length * 3)
			: undefined;
		const bufferedUVs: Float32Array | undefined = vertices[0].uv
			? new Float32Array(vertices.length * 2)
			: undefined;
		const bufferedNormals: Float32Array | undefined = vertices[0].normal
			? new Float32Array(vertices.length * 3)
			: undefined;

		for (let i = 0; i < vertices.length; i++) {
			if (vertices[i] == undefined) {
				throw new Error('Some vertices are undefined');
			}
			bufferedVertices[i * 3] = vertices[i].x;
			bufferedVertices[i * 3 + 1] = vertices[i].y;
			bufferedVertices[i * 3 + 2] = vertices[i].z;

			if (bufferedColor && vertices[i].color) {
				const color = vertices[i].color ?? new Color(0xffffff);
				bufferedColor[i * 3] = color.r;
				bufferedColor[i * 3 + 1] = color.g;
				bufferedColor[i * 3 + 2] = color.b;
			}
			if (bufferedUVs && vertices[i].uv) {
				const uv = vertices[i].uv ?? new Vector2(0, 0);
				bufferedUVs[i * 2] = uv.x;
				bufferedUVs[i * 2 + 1] = uv.y;
			}

			if (!bufferedNormals || !vertices[i].normal) continue;
			const normal = vertices[i].normal ?? new Vector3(0, 0, 0);
			bufferedNormals[i * 3] = normal.x;
			bufferedNormals[i * 3 + 1] = normal.y;
			bufferedNormals[i * 3 + 2] = normal.z;
		}

		return GeometryHelper.createGeometryFromArrays({
			vertices: bufferedVertices,
			colors: bufferedColor,
			uvs: bufferedUVs,
			normals: bufferedNormals,
			computeNormals
		});
	}

	static createGeometryFromArrays({
		vertices,
		colors,
		uvs,
		normals,
		computeNormals
	}: {
		vertices: Float32Array;
		colors?: Float32Array;
		uvs?: Float32Array;
		normals?: Float32Array;
		computeNormals?: boolean;
	}): BufferGeometry {
		const geo = new BufferGeometry();
		geo.setAttribute('position', new BufferAttribute(vertices, 3));

		if (colors) geo.setAttribute('color', new BufferAttribute(colors, 3));
		if (uvs) geo.setAttribute('uv', new BufferAttribute(uvs, 2));

		if (normals && !computeNormals) geo.setAttribute('normal', new BufferAttribute(normals, 3));
		else if (computeNormals !== false) geo.computeVertexNormals();

		return geo;
	}
}

export class GLTFHelper {
	models: Record<string, any>;
	toLoad: number;
	loaded: number;
	done: (() => void) | undefined;

	gltfLoader: GLTFLoader;

	constructor(dict: Record<string, string>, callback: (() => void) | undefined = undefined) {
		this.models = {};

		this.toLoad = 0;
		this.loaded = 0;

		this.done = callback;

		this.gltfLoader = new GLTFLoader();

		const keys = Object.keys(dict);
		for (const k of keys) {
			this.load(dict[k], k);
		}
	}
	load(name: string, file: string) {
		this.toLoad += 1;

		this.gltfLoader.load(file, (model) => {
			model.scene.gltf = model;
			this.loaded += 1;

			this.models[name] = model.scene;

			if (this.done != undefined && this.toLoad == this.loaded) this.done();
		});
	}
	changeMaterials(name: string, changeFunction: (material: any, model: any, name: string) => any) {
		const model = this.models[name];
		model.traverse((a: Object3D) => {
			if (a instanceof Mesh && a.material) {
				a.material = changeFunction(a.material, model, name);
			}
		});
	}
	changeMaterialsAll(changeFunction: (material: any, model: any) => any) {
		for (const k of Object.keys(this.models)) {
			this.changeMaterials(k, changeFunction);
		}
	}
}
