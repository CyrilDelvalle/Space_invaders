import Position from "../interfaces/Position";

interface ParticleProps {
  position: Position;
  velocity: Position;
  context: CanvasRenderingContext2D;
  radius: number;
  color: string;
  fades: number;
}

class Particle {
  position: Position | undefined;
  velocity: Position;
  color: string;
  opacity: number;
  radius: number;
  fades: number;
  draw: Function;
  update: Function;

  constructor({
    position,
    velocity,
    context,
    radius,
    color,
    fades,
  }: ParticleProps) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;

    this.draw = () => {
      if (this.position) {
        context.save();
        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.radius,
          0,
          Math.PI * 2
        );
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
      }
    };

    this.update = () => {
      if (this.position) {
        // console.log(this.position);
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.fades) this.opacity -= 0.01;
      }
    };
  }
}

export default Particle;
