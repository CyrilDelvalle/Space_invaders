import Grid from "../entities/Grid";
import Invader from "../entities/Invader";
import Particle from "../entities/Particle";
import Projectile from "../entities/Projectile";
import createParticles from "./createParticles";

const removeInvadersProjectiles = (
  invaderFound: Invader | undefined,
  projectileFound: Projectile | undefined,
  invader: Invader,
  score: number,
  particles: Particle[],
  context: CanvasRenderingContext2D | null | undefined,
  scoreElement: HTMLElement | null,
  grid: Grid,
  invadersIndex: number,
  projectiles: Projectile[],
  projectilesIndex: number,
  grids: Grid[],
  gridIndex: number
) => {
  if (invaderFound && projectileFound && invader.position) {
    score += 100;
    particles = createParticles({
      object: invader,
      fades: true,
      context,
      particles,
    });

    if (scoreElement) scoreElement.innerHTML = score.toString();

    grid.invaders.splice(invadersIndex, 1);
    projectiles.splice(projectilesIndex, 1);

    if (grid.invaders.length > 0) {
      const firstInvader = grid.invaders[0];
      const lastInvader = grid.invaders[grid.invaders.length - 1];

      if (lastInvader.position && firstInvader.position) {
        grid.width =
          lastInvader.position.x - firstInvader.position.x + lastInvader.width;
        grid.position.x = firstInvader.position.x;
      } else {
        grids.splice(gridIndex, 1);
      }
    }
  }
  return { score, particles };
};

export default removeInvadersProjectiles;
