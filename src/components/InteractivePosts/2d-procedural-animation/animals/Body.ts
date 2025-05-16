import { Chain } from "./Chain";

import * as PIXI from "pixi.js";
import { AnglesMath } from "./Vector";

export class Body {
  bodyWidth: number[];
  spine: Chain;

  roundTail: number;
  roundHead: number;

  tempPoint: PIXI.Point = new PIXI.Point();

  direction: number = 0;

  turnSpeed: number = 4;
  targetDirection: number = 0;

  target: PIXI.Point | undefined = new PIXI.Point();

  speed: number = 100;

  container: PIXI.Container;

  graphics: PIXI.Graphics;

  constructor(
    opts: Partial<{
      origin: PIXI.Point;
      jointCount: number;
      linkSize: number;
      angleConstraint: number;
      bodyWidth: number[];
      roundTail: number;
      roundHead: number;
      container: PIXI.Container;
    }>,
  ) {
    this.container = opts.container ?? new PIXI.Container();
    this.graphics = new PIXI.Graphics();

    this.container.addChild(this.graphics);

    this.spine = new Chain(
      opts.origin ?? new PIXI.Point(0, 0),
      opts.jointCount ?? 12,
      opts.linkSize ?? 12,
      opts.angleConstraint ?? Math.PI * 2,
    );
    this.bodyWidth = opts.bodyWidth ?? [];

    this.roundTail = opts.roundTail ?? 0;
    this.roundHead = opts.roundHead ?? 30;
  }

  applyScale(scale: number) {
    this.spine.applyScale(scale);

    for (let i = 0; i < this.bodyWidth.length; i++) {
      this.bodyWidth[i] *= scale;
    }
  }

  setTarget(target: PIXI.Point | undefined): void {
    this.target = target;
  }

  update(deltaTime: number, totalTime: number) {
    this.move(deltaTime);
    this.draw();
  }

  move(deltaTime: number) {
    if (this.target) {
      this.targetDirection = this.target
        .subtract(this.spine.joints[0], this.tempPoint)
        .angle();
    }

    let diff = AnglesMath.relativeAngleDiff(
      this.direction,
      this.targetDirection,
    );

    if (Math.abs(diff) > this.turnSpeed * deltaTime) {
      this.direction += Math.sign(diff) * deltaTime * this.turnSpeed;
    } else {
      this.direction = this.targetDirection;
    }

    this.tempPoint.fromAngle(this.direction, this.tempPoint);
    this.tempPoint.setLength(this.speed * deltaTime, this.tempPoint);

    this.tempPoint.add(this.spine.joints[0], this.tempPoint);
    this.moveTo(this.tempPoint);
  }

  draw() {
    this.graphics.clear();
    this.drawBody(this.graphics);
    this.graphics.stroke({ color: 0x009900, width: 4 });
    this.graphics.fill(0);
    this.drawEye(this.graphics, 1, Math.PI / 8, 10, 5, 0x818181, false);
    this.drawEye(this.graphics, 1, -Math.PI / 8, 10, 5, 0x818181, false);
    // this.spine.debugDisplay(this.graphics, this.bodyWidth);
    // this.graphics.stroke({ color: 0xff0000, width: 1 });
  }

  moveTo(pos: PIXI.Point): void {
    this.spine.resolve(pos);
  }

  bodyWidthAt(index: number): number {
    if (!this.bodyWidth || this.bodyWidth.length <= index) {
      return 16;
    }
    return this.bodyWidth[index];
  }

  getBodyPositionX(
    i: number,
    angleOffset: number,
    lengthOffset: number,
  ): number {
    return (
      this.spine.joints[i].x +
      Math.cos(this.spine.angles[i] + angleOffset) *
        (this.bodyWidthAt(i) + lengthOffset)
    );
  }

  getBodyPositionY(
    i: number,
    angleOffset: number,
    lengthOffset: number,
  ): number {
    return (
      this.spine.joints[i].y +
      Math.sin(this.spine.angles[i] + angleOffset) *
        (this.bodyWidthAt(i) + lengthOffset)
    );
  }

  get x(): number {
    return this.spine.joints[0].x;
  }

  get y(): number {
    return this.spine.joints[0].y;
  }

  drawBody(
    graphics: PIXI.Graphics,
    last: number = this.spine.joints.length - 1,
  ) {
    let cpX =
      (this.getBodyPositionX(0, Math.PI / 2, 0) +
        this.getBodyPositionX(1, Math.PI / 2, 0)) /
      2;
    let cpY =
      (this.getBodyPositionY(0, Math.PI / 2, 0) +
        this.getBodyPositionY(1, Math.PI / 2, 0)) /
      2;

    graphics.moveTo(cpX, cpY);

    let points: number[] = [];

    // Right half of the body
    for (let i = 0; i < last; i++) {
      const cpX =
        (this.getBodyPositionX(i, Math.PI / 2, 0) +
          this.getBodyPositionX(i + 1, Math.PI / 2, 0)) /
        2;
      const cpY =
        (this.getBodyPositionY(i, Math.PI / 2, 0) +
          this.getBodyPositionY(i + 1, Math.PI / 2, 0)) /
        2;

      points.push(
        this.getBodyPositionX(i, Math.PI / 2, 0),
        this.getBodyPositionY(i, Math.PI / 2, 0),
        cpX,
        cpY,
      );
    }

    if (this.roundTail <= 0.001) {
      points.push(
        this.getBodyPositionX(last, Math.PI / 2, 0),
        this.getBodyPositionY(last, Math.PI / 2, 0),
        this.getBodyPositionX(last, Math.PI, 0),
        this.getBodyPositionY(last, Math.PI, 0),
      );
    } else {
      points.push(
        this.getBodyPositionX(last, (Math.PI / 4) * 3, this.roundTail),
        this.getBodyPositionY(last, (Math.PI / 4) * 3, this.roundTail),
        this.getBodyPositionX(last, Math.PI, 0),
        this.getBodyPositionY(last, Math.PI, 0),
      );

      const cpX =
        (this.getBodyPositionX(last, -Math.PI / 2, 0) +
          this.getBodyPositionX(last - 1, -Math.PI / 2, 0)) /
        2;
      const cpY =
        (this.getBodyPositionY(last, -Math.PI / 2, 0) +
          this.getBodyPositionY(last - 1, -Math.PI / 2, 0)) /
        2;
      points.push(
        this.getBodyPositionX(last, -(Math.PI / 4) * 3, this.roundTail),
        this.getBodyPositionY(last, -(Math.PI / 4) * 3, this.roundTail),
        cpX,
        cpY,
      );
    }

    // Left half of the body
    for (let i = last; i > 0; i--) {
      const cpX =
        (this.getBodyPositionX(i, -Math.PI / 2, 0) +
          this.getBodyPositionX(i - 1, -Math.PI / 2, 0)) /
        2;
      const cpY =
        (this.getBodyPositionY(i, -Math.PI / 2, 0) +
          this.getBodyPositionY(i - 1, -Math.PI / 2, 0)) /
        2;

      points.push(
        this.getBodyPositionX(i, -Math.PI / 2, 0),
        this.getBodyPositionY(i, -Math.PI / 2, 0),
        cpX,
        cpY,
      );
    }

    points.push(
      this.getBodyPositionX(0, -Math.PI / 2, 0),
      this.getBodyPositionY(0, -Math.PI / 2, 0),
      this.getBodyPositionX(0, -Math.PI / 4, 0),
      this.getBodyPositionY(0, -Math.PI / 4, 0),
    );

    points.push(
      this.getBodyPositionX(0, 0, this.roundHead),
      this.getBodyPositionY(0, 0, this.roundHead),
      this.getBodyPositionX(0, Math.PI / 4, 0),
      this.getBodyPositionY(0, Math.PI / 4, 0),
    );

    cpX =
      (this.getBodyPositionX(0, Math.PI / 2, 0) +
        this.getBodyPositionX(1, Math.PI / 2, 0)) /
      2;
    cpY =
      (this.getBodyPositionY(0, Math.PI / 2, 0) +
        this.getBodyPositionY(1, Math.PI / 2, 0)) /
      2;
    points.push(
      this.getBodyPositionX(0, Math.PI / 2, 0),
      this.getBodyPositionY(0, Math.PI / 2, 0),
      cpX,
      cpY,
    );

    for (let i = 0; i < points.length; i += 4) {
      graphics.quadraticCurveTo(
        points[i],
        points[i + 1],
        points[i + 2],
        points[i + 3],
      );
    }

    return points;
  }

  drawEye(
    graphics: PIXI.Graphics,
    jointIndex: number,
    angleOffset: number,
    lengthOffset: number,
    eyeSize: number,
    eyeColor: PIXI.ColorSource = 0xffffff,
    withPupil: boolean = true,
    pupilColor: PIXI.ColorSource = 0x000000,
    pupilSize: number = 0.5,
  ): void {
    graphics.circle(
      this.getBodyPositionX(jointIndex, angleOffset, lengthOffset),
      this.getBodyPositionY(jointIndex, angleOffset, lengthOffset),
      eyeSize / 2,
    );

    graphics.fill(eyeColor);

    if (withPupil) {
      graphics.circle(
        this.getBodyPositionX(jointIndex, angleOffset, lengthOffset),
        this.getBodyPositionY(jointIndex, angleOffset, lengthOffset),
        (eyeSize / 2) * pupilSize,
      );

      graphics.fill(pupilColor);
    }
  }
}
