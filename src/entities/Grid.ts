import Position from "../interfaces/Position";
import Invader from "./Invader";

class Grid {
  position: Position;

  velocity: Position;

  invaders: Invader[];
  width: number;
  update: Function;

  constructor(
    context: CanvasRenderingContext2D | null | undefined,
    canvas: HTMLCanvasElement | null
  ) {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 3,
      y: 0,
    };

    this.invaders = [];

    const rows = Math.floor(Math.random() * 10 + 5);
    const columns = Math.floor(Math.random() * 5 + 2);
    this.width = columns * 30;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader(context, canvas, { x: x * 30, y: y * 30 })
        );
      }
    }

    this.update = () => {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.y = 0;

      if (canvas) {
        if (
          this.position.x + this.width >= canvas?.width ||
          this.position.x <= 0
        ) {
          this.velocity.x = -this.velocity.x;
          this.velocity.y = 30;
        }
      }
    };
  }
}

export default Grid;
