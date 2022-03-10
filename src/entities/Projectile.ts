class Projectile {
  position: { x: number; y: number } | undefined;
  velocity: { x: number; y: number };
  radius: number;
  draw: Function;
  update: Function;

  constructor({ position, velocity, context }: any) {
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
