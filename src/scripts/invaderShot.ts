import Grid from "../entities/Grid";
import InvaderProjectile from "../entities/InvaderProjectile";

const invaderShot = (
  frames: number,
  grid: Grid,
  invaderProjectiles: InvaderProjectile[]
) => {
  if (frames % 100 === 0 && grid.invaders.length > 0) {
    grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
      invaderProjectiles
    );
  }
};

export default invaderShot;
