import { Vector3, Color, Vector2 } from 'three';

export class Vertex extends Vector3 {
	color?: Color;
	uv?: Vector2;
	normal?: Vector3;

	index?: number;

	connectingVertices?: Vertex[];

	clone(): this {
		const clone = super.clone();
		clone.color = this.color?.clone();
		clone.uv = this.uv?.clone();
		clone.normal = this.normal?.clone();
		clone.index = this.index;

		if (this.connectingVertices) clone.connectingVertices = [...this.connectingVertices];

		return clone;
	}

	get isFirstInFace() {
		return this.index != undefined && this.index % 3 === 0;
	}

	set faceColor(color: Color) {
		if (!this.connectingVertices) return;

		this.color = color;
		for (const vertex of this.connectingVertices) {
			vertex.color = color;
		}
	}

	lerp(v: Vertex, alpha: number): this {
		const lerp = super.lerp(v, alpha);
		if (this.color && v.color) lerp.color = this.color?.lerp(v.color, alpha);
		if (this.uv && v.uv) lerp.uv = this.uv?.lerp(v.uv, alpha);
		if (this.normal && v.normal) lerp.normal = this.normal?.lerp(v.normal, alpha);

		return lerp;
	}
}

export type Face = {
	a: Vertex;
	b: Vertex;
	c: Vertex;
	index?: number;
	mid?: Vector3;
	normal?: Vector3;
};

export class VertexHelper {
	static subdivideFace(face: Face) {
		const newFaces: Face[] = [];
		const d = VertexHelper.midpoint(face.a, face.b);
		const e = VertexHelper.midpoint(face.b, face.c);
		const f = VertexHelper.midpoint(face.c, face.a);
		newFaces.push({ a: d.clone(), b: e.clone(), c: f.clone() });
		newFaces.push({ a: face.a.clone(), b: d.clone(), c: f.clone() });
		newFaces.push({ a: d.clone(), b: face.b.clone(), c: e.clone() });
		newFaces.push({ a: e.clone(), b: face.c.clone(), c: f.clone() });
		return newFaces;
	}

	static midpoint(a: Vertex, ...rest: Vertex[]): Vertex {
		const mid = a.clone();
		for (const v of rest) {
			mid.add(v);
		}
		mid.divideScalar(rest.length + 1);
		return mid;
	}

	static normalFromFace(a: Vertex, b: Vertex, c: Vertex): Vector3 {
		const ab = b.clone().sub(a);
		const ac = c.clone().sub(a);
		return ab.cross(ac).normalize();
	}
}

/*
export class VertexHelper {
  static splitAlongLongestSide(
    a: Vertex,
    b: Vertex,
    c: Vertex,
    array: Vertex[] | undefined = undefined
  ) {
    array = array ?? [];
    let ab = a.distanceTo(b);
    let bc = b.distanceTo(c);
    let ca = c.distanceTo(a);
    if (ab > bc && ab > ca) {
      let mid = b.clone().add(a).divideScalar(2);
      array.push(
        a.clone(),
        mid.clone(),
        c.clone(),
        mid.clone(),
        b.clone(),
        c.clone()
      );
    } else if (bc > ab && bc > ca) {
      let mid = c.clone().add(b).divideScalar(2);
      array.push(
        a.clone(),
        b.clone(),
        mid.clone(),
        mid.clone(),
        c.clone(),
        a.clone()
      );
    } else {
      let mid = a.clone().add(c).divideScalar(2);
      array.push(
        a.clone(),
        b.clone(),
        mid.clone(),
        b.clone(),
        c.clone(),
        mid.clone()
      );
    }
    return array;
  }

  // turns rectangle with sides ab, bc, cd, da into two triangles
  static makeFacesFromRect(
    a: Vertex,
    b: Vertex,
    c: Vertex,
    d: Vertex,
    array: Vertex[] | undefined = undefined
  ) {
    array = array || [];
    array.push(
      a.clone(),
      d.clone(),
      c.clone(),
      a.clone(),
      c.clone(),
      b.clone()
    );
    return array;
  }

  static midpoint(a: Vertex, b: Vertex) {
    return a.clone().lerp(b, 0.5);
  }

  static createPerFaceVerticesFromIndices(ver, ind) {
    let vertices = [];
    for (let i = 0; i < ind.length; i++) {
      let vi = ind[i] * 3;
      vertices.push(Helper.makeVertex(ver[vi], ver[vi + 1], ver[vi + 2]));
    }
    return vertices;
  }

  static subdivideFace(
    a: Vertex,
    b: Vertex,
    c: Vertex,
    noClone: boolean = false
  ) {
    let newFaces = [];
    let d = Helper.midpoint(a, b);
    let e = Helper.midpoint(b, c);
    let f = Helper.midpoint(c, a);
    if (noClone == true) {
      newFaces.push(d, e, f);
      newFaces.push(a, d, f);
      newFaces.push(d, b, e);
      newFaces.push(e, c, f);
    } else {
      newFaces.push(d.clone(), e.clone(), f.clone());
      newFaces.push(a.clone(), d.clone(), f.clone());
      newFaces.push(d.clone(), b.clone(), e.clone());
      newFaces.push(e.clone(), c.clone(), f.clone());
    }
    return newFaces;
  }

  static addArrayToArray(toArr, fromArr) {
    for (let i of fromArr) {
      toArr.push(i);
    }
  }

  static vertexPosForAngle(a, h, r) {
    return new THREE.Vector3(Math.sin(a) * (r || 1), h, Math.cos(a) * (r || 1));
  }

  static addMorphToGeo(geo, morphGeo) {
    if (geo.morphAttributes.position == undefined)
      geo.morphAttributes.position = [];
    if (geo.morphAttributes.normal == undefined)
      geo.morphAttributes.normal = [];

    let i = geo.morphAttributes.position.length;
    geo.morphAttributes.position[i] = morphGeo.getAttribute("position").clone();
    geo.morphAttributes.normal[i] = morphGeo.getAttribute("normal").clone();
  }

  static makeVertex(x, y, z) {
    return new THREE.Vector3(x, y, z);
  }
  static makeFace(a, b, c, index) {
    let mid = Helper.makeVertex(
      (a.x + b.x + c.x) / 3,
      (a.y + b.y + c.y) / 3,
      (a.z + b.z + c.z) / 3
    );
    return {
      a: a,
      b: b,
      c: c,
      face: index,
      mid: mid,
    };
  }

  // barycentric method
  static isPointInFace(face, v) {
    var v0 = face.c.clone().sub(face.a);
    var v1 = face.b.clone().sub(face.a);
    var v2 = v.clone().sub(face.a);
    var dot00 = v0.dot(v0);
    var dot01 = v0.dot(v1);
    var dot02 = v0.dot(v2);
    var dot11 = v1.dot(v1);
    var dot12 = v1.dot(v2);
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return u >= 0 && v >= 0 && u + v < 1;
  }

  static randomPointInFace(face, RNG) {
    // Call the corners of the triangle A, B, C, the side vectors AB, BC, AC
    let ab = face.b.clone().sub(face.a);
    let bc = face.c.clone().sub(face.b);
    let ac = face.c.clone().sub(face.a);
    // generate two random numbers in [0,1] called u and v.
    let u = RNG != undefined ? RNG.random() : Math.random();
    let v = RNG != undefined ? RNG.random() : Math.random();
    // Let p = u * AB + v * AC.
    let p = ab.clone().multiplyScalar(u).add(ac.clone().multiplyScalar(v));

    // If A+p is inside the triangle, return A+p
    let point = face.a.clone().add(p);

    // If A+p is outside the triangle, return A + AB + AC - p
    if (!Helper.isPointInFace(face, point)) {
      point.sub(p.multiplyScalar(2));
      point.add(ab);
      point.add(ac);
    }
    return point;
  }

  // load pixel data of image so we can access it with getPixel(data, x, y) where x, y in range [0, 1]
  static loadImageData(image) {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
  }
  // returns pixel as a THREE.Color() object with an addition alpha (a)
  static getPixel(imageData, x, y) {
    // convert from [0, 1] to [0, width/height in pixel]
    x = Math.min(Math.floor(imageData.width * x), imageData.width - 1);
    y = Math.min(Math.floor(imageData.height * y), imageData.height - 1);

    let position = (x + imageData.width * y) * 4,
      data = imageData.data;

    let color = new THREE.Color(
      data[position],
      data[position + 1],
      data[position + 2]
    );
    color.a = data[position + 3];
    return color;
  }
}

function rectToTriangles(
  a: Vector3,
  b: Vector3,
  c: Vector3,
  d: Vector3,
  array: Vector3[] | undefined = undefined
) {
  array = array ?? [];
  array.push(a.clone(), d.clone(), c.clone(), a.clone(), c.clone(), b.clone());
  return array;
}

function vertexForAngleHeightRadius(angle = 0, height = 0, radius = 1) {
  return new Vector3(
    Math.sin(angle) * radius,
    height,
    Math.cos(angle) * radius
  );
}
*/
