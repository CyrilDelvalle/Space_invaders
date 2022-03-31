import Position from "../interfaces/Position";

interface ProjectileProps {
  position: Position;
  velocity: Position;
  context: CanvasRenderingContext2D;
}
class Projectile {
  position: Position | undefined;
  velocity: Position;
  radius: number;
  draw: Function;
  update: Function;

  constructor({ position, velocity, context }: ProjectileProps) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;

    this.draw = () => {
      if (this.position) {
        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.radius,
          0,
          Math.PI * 2
        );
        context.fillStyle = "red";
        context.fill();
        context.closePath();
      }
    };

    this.update = () => {
      if (this.position) {
        // console.log(this.position);
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    };
  }
}

export default Projectile;
