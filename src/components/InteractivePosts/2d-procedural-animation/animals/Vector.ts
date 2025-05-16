import * as PIXI from "pixi.js";
import { Point, type PointData } from "pixi.js";

import "pixi.js/math-extras";

interface MoreVectorMath {
  fromAngle<T extends Point>(angle: number, outPoint?: T): T;
  angle(): number;
  setLength<T extends Point>(length: number, outPoint?: T): T;
}

declare module "pixi.js" {
  interface Point extends MoreVectorMath {}

  interface ObservablePoint extends MoreVectorMath {}
}

const pointMixins: any = {
  angle(): number {
    return Math.atan2(this.y, this.x);
  },

  fromAngle<T extends PointData>(angle: number, outPoint?: T): T {
    if (!outPoint) {
      outPoint = new Point() as PointData as T;
    }
    outPoint.x = Math.cos(angle);
    outPoint.y = Math.sin(angle);

    return outPoint;
  },

  setLength<T extends PointData>(length: number, outPoint?: T): T {
    if (!outPoint) {
      outPoint = new Point() as PointData as T;
    }
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);

    outPoint.x = (this.x / magnitude) * length;
    outPoint.y = (this.y / magnitude) * length;

    return outPoint;
  },
};

Object.assign(Point.prototype, pointMixins);

export const AnglesMath = {
  constrainDistance(
    joint: PIXI.Point,
    target: PIXI.Point,
    distance: number,
    outPoint?: PIXI.Point,
  ): PIXI.Point {
    if (!outPoint) {
      outPoint = new Point();
    }
    joint.subtract(target, outPoint);
    outPoint.normalize(outPoint).multiplyScalar(distance);
    outPoint.add(joint, outPoint);

    return outPoint;
  },

  constrainAngle(curAngle: number, prevAngle: number, maxDiff: number): number {
    let diff = AnglesMath.relativeAngleDiff(prevAngle, curAngle);

    if (diff > maxDiff) return prevAngle + maxDiff;
    if (diff < -maxDiff) return prevAngle - maxDiff;
    return curAngle;
  },

  relativeAngleDiff(angle1: number, angle2: number): number {
    let diff = angle2 - angle1;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return diff;
  },
};
