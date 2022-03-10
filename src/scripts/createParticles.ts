import Particle from "../entities/Particle";

const createParticles = ({ object, color, fades, context, particles }: any) => {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        context,
        radius: Math.random() * 3,
        color: color || "#BAA0DE",
        fades,
      })
    );
  }

  return particles;
};

export default createParticles;
