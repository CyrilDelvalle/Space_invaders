class Player {
  position: { x: number; y: number } | undefined;
  velocity: { x: number; y: number };
  width: number;
  height: number;
  opacity: number;
  rotation: number;
  draw: Function;
  update: Function;
  image: any;

  constructor(
    context: CanvasRenderingContext2D | null | undefined,
    canvas: HTMLCanvasElement | null
  ) {
    this.width = 100;
    this.height = 80;

    if (canvas) {
      this.position = {
        x: canvas?.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    }

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;

    const image = new Image();
    const imgSrc = require("../assets/spaceship.png");
    image.src = imgSrc;
    image.onload = () => {
      const scale = 0.8;
      this.image = image;
      this.width = this.width * scale;
      this.height = this.height * scale;
    };

    this.draw = () => {
      if (this.position && context && this.image) {
        context?.save();
        context.globalAlpha = this.opacity;

        context?.translate(
          this.position.x + this.width / 2,
          this.position.y + this.height / 2
        );

        context?.rotate(this.rotation);

        context?.translate(
          -this.position.x - this.width / 2,
          -this.position.y - this.height / 2
        );

        context.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
      }

      context?.restore();
    };

    this.update = () => {
      if (this.position) {
        this.draw();
        this.position.x += this.velocity.x;
      }
    };
  }
}

export default Player;
