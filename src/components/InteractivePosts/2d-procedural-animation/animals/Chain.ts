import * as PIXI from "pixi.js";
import { AnglesMath } from "./Vector";

export class Chain {
  joints: PIXI.Point[];
  linkSize: number;
  angles: number[];
  angleConstraint: number;

  tempPoint: PIXI.Point = new PIXI.Point();

  constructor(
    origin: PIXI.Point,
    jointCount: number,
    linkSize: number,
    angleConstraint: number = Math.PI * 2,
  ) {
    this.linkSize = linkSize;
    this.angleConstraint = angleConstraint;
    this.joints = [];
    this.angles = [];

    this.joints.push(new PIXI.Point(origin.x, origin.y));
    this.angles.push(0);

    for (let i = 1; i < jointCount; i++) {
      this.joints.push(
        new PIXI.Point(
          this.joints[i - 1].x,
          this.joints[i - 1].y + this.linkSize,
        ),
      );
      this.angles.push(0);
    }
  }

  applyScale(scale: number) {
    this.linkSize *= scale;

    for (let i = 1; i < this.joints.length; i++) {
      this.joints[i].x *= scale;
      this.joints[i].y *= scale;
    }
  }

  resolve(pos: PIXI.Point): void {
    pos.subtract(this.joints[0], this.tempPoint);

    this.angles[0] = this.tempPoint.angle();

    this.joints[0].x = pos.x;
    this.joints[0].y = pos.y;

    for (let i = 1; i < this.joints.length; i++) {
      this.joints[i - 1].subtract(this.joints[i], this.tempPoint);

      const curAngle = this.tempPoint.angle();

      this.angles[i] = AnglesMath.constrainAngle(
        curAngle,
        this.angles[i - 1],
        this.angleConstraint,
      );

      this.tempPoint.fromAngle(this.angles[i], this.tempPoint);
      this.tempPoint.multiplyScalar(this.linkSize, this.tempPoint);

      this.joints[i - 1].subtract(this.tempPoint, this.joints[i]);
    }
  }

  fabrikResolve(pos: PIXI.Point, anchor: PIXI.Point): void {
    this.joints[0] = new PIXI.Point(pos.x, pos.y);
    for (let i = 1; i < this.joints.length; i++) {
      AnglesMath.constrainDistance(
        this.joints[i],
        this.joints[i - 1],
        this.linkSize,
        this.joints[i],
      );
    }

    // Backward pass
    this.joints[this.joints.length - 1] = new PIXI.Point(anchor.x, anchor.y);
    for (let i = this.joints.length - 2; i >= 0; i--) {
      AnglesMath.constrainDistance(
        this.joints[i],
        this.joints[i + 1],
        this.linkSize,
        this.joints[i],
      );
    }
  }

  debugDisplay(graphics: PIXI.Graphics, sizes?: number[]): void {
    for (let i = 0; i < this.joints.length - 1; i++) {
      let startJoint = this.joints[i];
      let endJoint = this.joints[i + 1];
      graphics.moveTo(startJoint.x, startJoint.y);
      graphics.lineTo(endJoint.x, endJoint.y);
    }

    for (let i = 0; i < this.joints.length; i++) {
      let joint = this.joints[i];
      let size = sizes && sizes.length > i ? sizes[i] : 16;
      graphics.circle(joint.x, joint.y, size);
    }
  }
}
