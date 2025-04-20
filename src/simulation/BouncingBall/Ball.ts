export const BALL_INITIAL_VELOCITY = 0;
export const BALL_RADIUS = 30;
export const GRAVITY = 0.3;
export const BOUNCE_DAMPING = 0.9; // Damping is the reduction in the amplitude of an oscillation as a result of energy being drained from the system to overcome frictional or other restrictive forces.

export class Ball {
  h: number;
  k: number;
  velocityX: number;
  velocityY: number;
  acceleration: number;
  radius: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  private getRandomColor() {
    return `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
  }

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.h = canvas.width / 2;
    this.k = canvas.height / 2;
    this.velocityX = BALL_INITIAL_VELOCITY;
    this.velocityY = Math.floor(Math.random() * 13) - 6;
    this.radius = BALL_RADIUS;
    this.acceleration = GRAVITY;
    this.color = this.getRandomColor();
    this.ctx = ctx;
  }

  update(canvas: HTMLCanvasElement) {
    this.h += this.velocityX;
    this.k += this.velocityY;
    this.velocityY += this.acceleration;

    if (this.k + this.radius >= canvas.height) {
      this.k = canvas.height - this.radius;
      this.velocityY = -this.velocityY * BOUNCE_DAMPING;

      if (Math.abs(this.velocityY) < 2) {
        this.velocityY = 0;
      }
    }

    if (this.k + this.radius <= 0) {
      this.k += this.radius;
      this.velocityY = Math.abs(this.velocityY);
    }

    if (this.h + this.radius >= canvas.width) {
      this.h = canvas.width - this.radius;
      this.velocityX = -this.velocityX;
    }

    if (this.k - this.radius <= 0) {
      this.k = this.radius;
      this.velocityX = Math.abs(this.velocityX);
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.h, this.k, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
