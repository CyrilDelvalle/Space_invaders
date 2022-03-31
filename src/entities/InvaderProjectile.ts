import Position from "../interfaces/Position";

interface InvaderProjectileProps {
  position: Position;
  velocity: Position;
  context: CanvasRenderingContext2D;
}
class InvaderProjectile {
  position: Position | undefined;
  velocity: Position;
  radius: number;
  width: number;
  height: number;
  draw: Function;
  update: Function;

  constructor({ position, velocity, context }: InvaderProjectileProps) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
    this.radius = 3;

    this.draw = () => {
      context.fillStyle = "white";

      if (this.position) {
        context.fillRect(
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
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

export default InvaderProjectile;
