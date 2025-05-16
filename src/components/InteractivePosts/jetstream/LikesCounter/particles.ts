import * as PIXI from "pixi.js";

interface ParticleSprite extends PIXI.Sprite {
  speedX: number;
  speedY: number;
  age: number;
  maxAge: number;
  initialSize: number;
}

export type ParticleOptions = {
  x: number;
  y: number;
  size: number;
  color: PIXI.ColorSource;
  alpha: number;
  speedX: number;
  speedY: number;
  maxAge: number;
};

export default class ParticleSystem {
  private readonly maxParticles: number;
  public container: PIXI.Container;
  private readonly particles: ParticleSprite[];
  private readonly particlePool: ParticleSprite[];
  private baseTexture: PIXI.Texture | null = null;

  private loaded = false;

  constructor(texture: string, maxParticles: number = 10000) {
    this.maxParticles = maxParticles;
    this.container = new PIXI.Container();
    this.container.zIndex = 10;
    this.particles = [];
    this.particlePool = [];

    this.loadTexture(texture);
  }

  async loadTexture(url: string) {
    const texture = await PIXI.Assets.load(url);
    this.baseTexture = texture;
    this.loaded = true;
  }

  spawnParticle(opts: Partial<ParticleOptions>): ParticleSprite | null {
    if (!this.loaded) return null;
    let particle: ParticleSprite;
    if (this.particlePool.length > 0) {
      particle = this.particlePool.pop()!;
    } else if (this.particles.length < this.maxParticles) {
      particle = new PIXI.Sprite(this.baseTexture!) as ParticleSprite;
      particle.anchor.set(0.5, 0.5);
      this.container.addChild(particle);
    } else {
      return null;
    }

    particle.rotation = (Math.random() - 0.5) * 0.5;
    particle.visible = true;
    particle.x = opts.x ?? 0;
    particle.y = opts.y ?? 0;
    particle.width = particle.height = opts.size ?? 1;
    particle.tint = opts.color ?? 0xffffff;
    particle.alpha = opts.alpha ?? 1;
    particle.speedX = opts.speedX ?? 0;
    particle.speedY = opts.speedY ?? 0;
    particle.age = 0;
    particle.maxAge = opts.maxAge ?? 1;
    particle.initialSize = opts.size ?? 1;

    this.particles.push(particle);

    return particle;
  }

  removeParticle(particle: ParticleSprite): void {
    const index = this.particles.indexOf(particle);
    if (index !== -1) {
      particle.visible = false;

      this.particles.splice(index, 1);
      this.particlePool.push(particle);
    }
  }

  update(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.x += particle.speedX * deltaTime;
      particle.y += particle.speedY * deltaTime;
      particle.age += deltaTime;

      // Shrink the particle
      let lifeRatio = 1 - particle.age / particle.maxAge;
      lifeRatio = Math.min(Math.max(lifeRatio, 0), 1);
      particle.width = particle.height = particle.initialSize * lifeRatio;

      // Remove particle if it's too old or off-screen
      if (
        particle.age >= particle.maxAge ||
        particle.initialSize * lifeRatio < 4
      ) {
        this.removeParticle(particle);
      }
    }
  }
}
