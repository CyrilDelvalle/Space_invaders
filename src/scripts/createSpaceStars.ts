import Particle from "../entities/Particle";

const createSpaceStars = (
  canvas: HTMLCanvasElement,
  particles: Particle[],
  context: CanvasRenderingContext2D
) => {
  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.2,
        },
        context,
        radius: Math.random() * 3,
        color: "white",
      })
    );
  }

  return particles;
};

export default createSpaceStars;
