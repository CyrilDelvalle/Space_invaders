import Position from "../interfaces/Position";
import InvaderProjectile from "./InvaderProjectile";

class Invader {
  position: Position | undefined;
  velocity: Position;
  width: number;
  height: number;
  draw: Function;
  update: Function;
  shoot: Function;
  image: any;

  constructor(
    context: CanvasRenderingContext2D | null | undefined,
    canvas: HTMLCanvasElement | null,
    position: { x: number; y: number }
  ) {
    this.width = 30;
    this.height = 30;

    this.velocity = {
      x: 0,
      y: 0,
    };

    if (canvas) {
      this.position = {
        x: canvas?.width / 2 - this.width / 2,
        y: canvas.height / 2,
      };
    }

    const image = new Image();
    const imgSrc = require("../assets/invader.png");
    image.src = imgSrc;
    image.onload = () => {
      const scale = 1;
      this.image = image;
      this.width = this.width * scale;
      this.height = this.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };

    this.draw = () => {
      if (this.position && context && this.image) {
        context.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
      }
    };

    this.shoot = (invaderProjectiles: any) => {
      if (this.position && context) {
        invaderProjectiles.push(
          new InvaderProjectile({
            position: {
              x: this.position?.x + this.width / 2,
              y: this.position.y + this.height,
            },
            velocity: {
              x: 0,
              y: 5,
            },
            context,
          })
        );
      }
    };

    this.update = ({ velocity }: any) => {
      if (this.position) {
        this.draw();
        this.position.x += velocity.x;
        this.position.y += velocity.y;
      }
    };
  }
}

export default Invader;
